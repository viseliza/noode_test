import unirest from "unirest";
import * as cheerio from 'cheerio';
import { CheckDate } from "./index.js";

export const GetURL = async (url) => {
    const response = await unirest.get(url)
    const $ = cheerio.load(response.body);
    var result = "";
    const table = $('.viewtablewhite');

    table.find('tr').each((_, row) => {
        $(row).find('td').find('div').each(async (_, cell) => {
            if (url == 'https://portal.novsu.ru/univer/timetable/spo/') { 
                if ($(cell).find("a").text() == "ПТК") {
                    result = $(cell).find("a").attr('href')
                }
            } else {
                const z = CheckDate(url, $(cell).find("a").text())
                if (z) {
                    console.log(await z)
                    console.log($(cell).find("a").text())
                    result = $(cell).find("a").attr('href')
                }
            }
        });
    });

    return result.match('https://portal.novsu.ru/file') 
    ? result
    : await GetURL(result)
}
    
