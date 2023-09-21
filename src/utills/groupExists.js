import { Group } from '../models/index.js';
import * as fs from 'fs';

export const groupExist = async( group_name, href ) => {
    const group = await Group.findOne({
        where: { name: group_name }
    });
    
    if ( !group ) {
        await Group.create({ data: { 
            name: group_name,
            href: href
        }});
        fs.mkdir( `src/doc/${group_name}`, err => {
            if( err ) throw err;
        });
    }
}