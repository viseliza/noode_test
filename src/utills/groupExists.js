import { Group } from '../models/index.js';
import * as fs from 'fs';

export const groupExist = async( group_name ) => {
    const group = await Group.findOne({
        where: { name: group_name }
    });
    
    if ( !group ) {
        await Group.create({ data: { name: group_name } });
        fs.mkdir( `src/doc/${group_name}`, err => {
            if( err ) throw err;
            console.log(`Папка '${ group_name }' успешно создана!`);
        });
    }
}