import { Group } from '../models/index.js';
import * as fs from 'fs';

export class CheckGroup {
    async groupExist(group_name) {
        const group = await Group.findOne({
            where: { name: group_name }
        });
    
        if (!group) await Group.create({ data: { name: group_name } });
    } 

    addGroupFolder(group_name) {
        fs.mkdir(group_name, err => {
            if( err ) throw err;
            console.log('Папка успешно создана!');
        });
    }
}