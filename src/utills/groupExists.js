import { Group } from '../models/index.js';
import * as fs from 'fs';

export const groupExist = async( group_name, a_href ) => {
    const group = await Group.findOne({
        where: { name: group_name }
    });
    
    if ( !group ) {
        await Group.create({ data: { 
            name: group_name,
            href: a_href
        }});
        fs.mkdir( `src/doc/${ group_name }`, err => {
            if( err ) throw err;
        });
        fs.mkdir( `src/xlsx/${ group_name }`, err => {
            if( err ) throw err;
        });
    }
}