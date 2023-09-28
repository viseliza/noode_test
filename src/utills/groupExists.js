import { Group } from '../models/index.js';

export const groupExist = async( group_name, a_href ) => {
    const group = await Group.findOne({
        where: { name: group_name }
    });
    
    if ( !group ) {
        await Group.create({ 
            data: { 
                name: group_name,
                href: a_href
            }
        });
    }
}