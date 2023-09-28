import xlsx from 'node-xlsx';
import * as fs from 'fs';
import { Replacement } from '../utills/replacement.js';
import { User } from '../models/index.js';

export class Schedule {
    static async main( ctx, is_now = true ) {
        const group = await User.include({
            where: ctx.from.id
        })
        const file_name = group.href.split( '/' )[ 7 ].slice( 0, -15 );
        const path = `src/xlsx/${ file_name }.xlsx`;
        
        if (!fs.existsSync( path )) await Replacement.downloadFile( group.href, path );

        const workSheetsFromFile = xlsx.parse( path, (name, data) => { return data} );
        const data = workSheetsFromFile[0].data;
        
        return Schedule.parseExcel( data, group.name, is_now );
    }

    static parseExcel( data, group, is_now ) {  
        // Колонка с заменами группы
        let column = 0;

        // Список всех дней недели
        const days_array = [
            'понедельник', 
            'вторник', 
            'среда', 
            'четверг', 
            'пятница', 
            'суббота'
        ]

        // Итоговое расписание для выбранной группы
        let result = "";

        // Перебирает группы из файла
        for ( let el of data[ 6 ] ) {
            if ( el != undefined && String(el).includes(group) ) {
                break;
            }
            column += 1;
        }

        return is_now ? Schedule.getOnlyNow( data, days_array, column ) : Schedule.getFullWeak( data, days_array, column )
    }


    static getOnlyNow( data, days_array, column ) {
        let result = '';

        for (let row = 7; row < Object.keys(data).length - 1; row++) {
            let day_of_the_weak = data[ row ][ column - 2 ];

            if ( day_of_the_weak != undefined && day_of_the_weak.toLowerCase().trim() == days_array[ new Date().getDay() - 1 ] ) { 
                let today = true;
                result += `\n<b>${ day_of_the_weak }</b>\n`;
                while(today) {
                    row++;
                    let time = data[ row ][ column - 1 ];
                    let replacement = data[ row ][ column ];

                    if ( replacement == undefined && time == undefined ) continue;
                    if ( replacement == undefined ) replacement = 'Пары не будет';
                    if ( time == undefined ) {
                        result += '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n';
                        time = data [row - 1][ column - 1];
                    } else {
                        result += '——————————————————————\n';
                    }
                    if ( replacement.includes("_")) replacement = 'Пары не будет';

                    time == "8.30-10.10" ? result += `08.30-10.10 | ${ replacement }\n` : result += `${ time } | ${ replacement }\n`
                
                    if ( data[ row + 1 ][ column - 2 ] != undefined && data[ row + 1 ][ column - 2 ].toLowerCase().trim() == days_array[ new Date().getDay() ] ) 
                    today = false;
                }

                break;
            }
        }
        return result;
    }


    static getFullWeak( data, days_array, column ) {
        let result = '';
        
        for (let row = 7; row < Object.keys(data).length - 1; row++) {
            let time = data[ row ][ column - 1 ];
            let replacement = data[ row ][ column ];
            let day_of_the_weak = data[ row ][ column - 2 ];

            if ( day_of_the_weak != undefined && days_array.includes( day_of_the_weak.toLowerCase().trim() ) ) {
                result += `\n<b>${ day_of_the_weak }</b>\n`;
            } 
            if ( replacement == undefined && time == undefined ) continue;
            if ( replacement == undefined ) replacement = 'Пары не будет';
            if ( time == undefined ) {
                result += '- - - - - - - - - - - - - - - - - - - - - - - -\n';
                time = data [row - 1][ column - 1];
            } else {
                result += '———————————————————\n'
            }
            if ( replacement.includes("_")) replacement = 'Пары не будет';


            time == "8.30-10.10" ? result += `08.30-10.10 | ${ replacement }\n` : result += `${ time } | ${ replacement }\n`
            
        }

        return result;
    }
}