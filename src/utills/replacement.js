import fetch from 'node-fetch';
import * as fs from 'fs';
import unirest from "unirest";
import * as cheerio from 'cheerio';
import WordExtractor from 'word-extractor';

export class Replacement {

    static async main() {
        const url = "https://portal.novsu.ru/univer/timetable/spo/";
        Replacement.DownloadFile( await Replacement.GetURL(url) );
        return await Replacement.docParse();
    }

    static async GetURL (url) {
        const response = await unirest.get(url);
        const $ = cheerio.load(response.body),
            table = $('.viewtablewhite');

        let result = "";
    
        table.find('tr').each((_, row) => {
            $(row).find('td').find('div').each((_, cell) => {
                var row_a = $(cell).find("a");
                if (url == 'https://portal.novsu.ru/univer/timetable/spo/') { 
                    if (row_a.text() == "ПТК") {
                        result = row_a.attr('href')
                    }
                } else {
                    if (Replacement.CheckDate(row_a.text())) {
                        result = row_a.attr('href')
                    }
                }
            });
        });
        
        if (url == result) {
            return "На сегодня замен нет ни у одной группы!"
        }

        return result.match('https://portal.novsu.ru/file') ? result : await Replacement.GetURL(result)
    }
        

    static CheckDate(date) {
        const now = new Date();
        
        return date.match(/\d\d.\d\d.\d\d\d\d/) ?
            date === now.toLocaleDateString('ru') :
            date.toLowerCase() === `${now.toLocaleString('ru', { month: 'long' })} ${now.getFullYear()}`;
    }

    static DownloadFile(url) {
        fetch(url)
        .then(res => res.buffer())
        .then(buffer => fs.writeFileSync('src/doc_data/zamena.doc', buffer))
    }

    static async docParse() {
        const extractor = new WordExtractor();
        const extracted = await extractor.extract("src/doc_data/zamena.doc");
        const body = extracted.getBody().split('\n').filter(function(el) {
            return el != '';
        });

        let result = "";
        const group = "1992"; // TODO: выборка из бд

        for (let line = 5; line < body.length; line++) {
            let _value = body[line].split('\t');
            if (_value[0] == group) {
                result += `Группа ${_value[0]}\n№ пары ${_value[1]}\nПо расписанию ${_value[2]}\n`;
                if (_value[3].toLowerCase() == "не будет") {
                    result += `${_value[3]}\n\n`;
                } else if (['дистанционное обучение', 'до'].includes(_value[3].toLowerCase())) {
                    result += `Заменена на ${_value[3]}\n\n`;
                } else if (_value[3].includes("п/г")) {
                    result += `${_value[3]}\n\n`;
                } else {
                    result += `Заменена на ${_value[3]}\nАудитория ${_value[4]}\n\n`;
                }
            }
        }

        return result == '' ? 'На сегодня замен нет' : result
    }
}