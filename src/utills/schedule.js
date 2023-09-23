import xlsx from 'node-xlsx';
import * as fs from 'fs';
import { Replacement } from '../utills/replacement.js';
import { User } from '../models/index.js';

export class Schedule {
    static async main( ctx ) {
        const group = await User.include({
            where: ctx.from.id
        })
        const path = `src/xlsx/${group.name}.xlsx`;
        
        await Replacement.downloadFile( group.href, path );
        
        const workSheetsFromFile = xlsx.parse(`src/xlsx/${group.name}.xlsx`, (name, data) => { return data} );
        const data = workSheetsFromFile[0].data;
        
        
        return Schedule.parseExcel( data, group.name );
    }

    static parseExcel( data, group ) {  
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
            if ( el != undefined && el == group ) {
                break;
            }
            column += 1;
        }

        for (let row = 7; row < Object.keys(data).length; row++) {
            let time = data[ row ][ column - 1 ];
            let replacement = data[ row ][ column ];
            if ( data[ row ][ column - 2 ] != undefined && days_array.includes( data[ row ][ column - 2 ].toLowerCase().trim() ) ) {
                result += `\n${ data[ row ][ column - 2 ] }\n`
            } 
            if ( replacement == undefined && time == undefined ) continue;
            if ( replacement == undefined ) replacement = 'Пары не будет';
            if ( time == undefined ) {
                result += '------------------------------------------------------\n';
                time = data [row - 1][ column - 1];
            } 
            if ( replacement.includes("_")) replacement = 'Пары не будет';


            time == "8.30-10.10" ? result += `08.30-10.10 | ${ replacement }\n` : result += `${ time } | ${ replacement }\n`
            
        }

        return result;
    }
}