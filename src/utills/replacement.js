import fetch from 'node-fetch';
import * as fs from 'fs';
import unirest from "unirest";
import * as cheerio from 'cheerio';
import WordExtractor from 'word-extractor';

export class Replacement {

    async main() {
        const url = "https://portal.novsu.ru/univer/timetable/spo/";
        this.GetURL(url).then(result => this.DownloadFile(result));
        return this.docParse();
    }

    async GetURL (url) {
        const response = await unirest.get(url)
        const $ = cheerio.load(response.body);
        var result = "";
        const table = $('.viewtablewhite');
    
        table.find('tr').each((_, row) => {
            $(row).find('td').find('div').each((_, cell) => {
                var row_a = $(cell).find("a");
                if (url == 'https://portal.novsu.ru/univer/timetable/spo/') { 
                    if (row_a.text() == "ПТК") {
                        result = row_a.attr('href')
                    }
                } else {
                    if (this.CheckDate(row_a.text())) {
                        result = row_a.attr('href')
                    }
                }
            });
        });

        if (url == result) {
            return "На сегодня замен нет ни у одной группы!"
        }

        return result.match('https://portal.novsu.ru/file') 
        ? result
        : await this.GetURL(result)
    }
        

    CheckDate(date) {
        var year_now  = new Date().getFullYear().toString();
        var date_now = new Date().toLocaleDateString()
        var month_now_word = new Date().toLocaleString('ru', {       
            month: 'long'
        });
        
        if (date.match(/\d\d.\d\d.\d\d\d\d/)) {
            return date == `${date_now}` 
            ? true
            : false
        } else {
            return date.toLowerCase() == `${month_now_word} ${year_now}` 
            ? true 
            : false
        }
    }

    DownloadFile(url) {
        fetch(url)
        .then(res => res.buffer())
        .then(buffer => fs.writeFileSync('src/docs/zamena.doc', buffer))
    }

    async docParse() {
        const extractor = new WordExtractor();
        const extracted = await extractor.extract("src/docs/zamena.doc");
        const body = extracted.getBody().split('\n')
        .filter(function(el) {
            return el != '';
        });
        let result = "";
        const group = "1992"; // TODO: выборка из бд

        for (let line = 5; line < body.length; line++) {
            let _value = body[line].split('\t');
            if (_value[0] == group) {
                if (_value[3] == "Не будет") {
                    result += `Группа ${_value[0]}\n№ пары ${_value[1]}\nПо расписанию ${_value[2]}\n${_value[3]}\n\n`;
                } else if (_value[3] == "Дистанционное обучение") {
                    result += `Группа ${_value[0]}\n№ пары ${_value[1]}\nПо расписанию ${_value[2]}\nЗаменена на ${_value[3]}\n\n`;
                } else if (_value[3].includes("п/г")) {
                    result += `Группа ${_value[0]}\n№ пары ${_value[1]}\nПо расписанию ${_value[2]}\n${_value[3]}\n\n`;
                } else {
                    result += `Группа ${_value[0]}\n№ пары ${_value[1]}\nПо расписанию ${_value[2]}\nЗаменена на ${_value[3]}\nАудитория ${_value[4]}\n\n`;
                }
            }
        }

        return result == '' 
        ? "На сегодня замен нет"
        : result
    }
}