import unirest from "unirest";
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { groupExist, clear } from "../utills/index.js";

export class Tasks {
    // Раз в неделю по воскресеньям
    static async deleteTrash() {
        const path = `src/doc/`;
        const folders = fs.readdirSync( path );

        for ( let folder of folders ) {
            clear( folder );
        }
    }

    // Раз в пол года
    static async insertGroups() {
        let url = "https://portal.novsu.ru/univer/timetable/spo/";
        const response = await unirest.get( url );
        const $ = cheerio.load( response.body ),
            col = $( '.block_content.content:first' );
        
        col.find( 'tr' ).each(( _, row ) => {
            $( row ).find( 'td' ).find( 'a' ).each( async ( _, cell ) => {
                await groupExist( $( cell ).text(), `https://portal.novsu.ru${$( cell ).attr( 'href' )}`);
            })
        })   
    }
}
