import fetch from 'node-fetch';
import * as fs from 'fs';
import unirest from "unirest";
import * as cheerio from 'cheerio';

export class Replacement {
    
    main() {
        
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
                    if (CheckDate(row_a.text())) {
                        result = row_a.attr('href')
                    }
                }
            });
        });
    
        return result.match('https://portal.novsu.ru/file') 
        ? result
        : await GetURL(result)
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
        .then(buffer => fs.writeFileSync('zamena.doc', buffer))
    }

    docParse() {
        
    }
}