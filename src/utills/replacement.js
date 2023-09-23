import fetch from 'node-fetch';
import * as fs from 'fs';
import unirest from "unirest";
import * as cheerio from 'cheerio';
import WordExtractor from 'word-extractor';
import { Group, User } from '../models/index.js';

export class Replacement {
    static async main( ctx, tomorow = 0 ) {
        const group = await Group.findOne({
            where: { id: await User.findOne({
                where: { account_id: ctx.from.id  }
            }).then( ( result ) => { return result.group } )}
        })
        
        const date = new Date(Date.now() + tomorow).toLocaleDateString( 'ru' );
        
        const path = `src/doc/${ group.name }/${ date }.doc`;
        
        const url = await Replacement.GetURL( "https://portal.novsu.ru/univer/timetable/spo/", tomorow ); 
        
        if (!url) {
            return tomorow == 0 ? "На сегодня замен нет!" : "На завтра замен нет!";
        } 
        
        if (!fs.existsSync( path )) {
            await Replacement.DownloadFile( url, path );
        }
        
        return await Replacement.docParse( group.name, path );
    }


    static async GetURL ( url, tomorow ) {
        const response = await unirest.get( url );
        const $ = cheerio.load( response.body ),
            table = $( '.viewtablewhite' );

        let result = url;
    
        table.find( 'tr' ).each(( _, row ) => {
            $(row).find( 'td' ).find( 'div' ).each(( _, cell ) => {
                let row_a = $( cell ).find( 'a' );
                if ( url == 'https://portal.novsu.ru/univer/timetable/spo/' ) { 
                    if ( row_a.text() == 'ПТК' ) {
                        result = row_a.attr( 'href' )
                    }
                } else {
                    if (Replacement.CheckDate( row_a.text(), tomorow )) {
                        result = row_a.attr( 'href' )
                    }
                }
            });
        });

        if ( url == result ) return false;
        
        return result.match( 'https://portal.novsu.ru/file' ) ? result : await Replacement.GetURL( result, tomorow )
    }
        

    static CheckDate( date, tomorow ) {
        if ( date.match(/\d\d.\d\d.\d\d\d\d/) ) {
            return date == new Date(Date.now() + tomorow).toLocaleDateString('ru') ? true : false
        } else {
            return date.toLowerCase() === `${new Date().toLocaleString('ru', { month: 'long' })} ${new Date().getFullYear()}` ? true : false
        }
    }


    static async DownloadFile( url, path ) {
        const result = fetch( url );
        return fs.writeFileSync( path, await (await result).buffer() );
    }

    static async docParse( group, path ) {
        const extractor = new WordExtractor();
        const extracted = await extractor.extract( path );
        const body = extracted.getBody().split( '\n' ).filter(function( el ) {
            return el != '';
        });
        let result = "";

        for ( let line = 5; line < body.length; line++ ) {
            let _value = body[ line ].split( '\t' );
            if ( _value[0] == group.name ) {
                result += `Группа ${_value[0]}\n№ пары ${_value[1]}\nПо расписанию ${_value[2]}\n`;
                if ( _value[3].toLowerCase() == "не будет" ) {
                    result += `${_value[3]}\n\n`;
                } else if ( [ 'дистанционное обучение', 'до' ].includes( _value[3].toLowerCase() ) ) {
                    result += `Заменена на ${ _value[3] }\n\n`;
                } else if ( _value[3] .includes( "п/г" )) {
                    result += `${ _value[3] }\n\n`;
                } else {
                    result += `Заменена на ${ _value[3] }\nАудитория ${ _value[4] }\n\n`;
                }
            }
        }

        return result == '' ? 'Замены для выбранной группы не найдены!' : result
    }
}