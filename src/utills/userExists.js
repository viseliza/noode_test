import { User } from '../models/index.js';

export const userExists = async (bot) => {
    bot.use(async (ctx) => {
        const fromUser = ctx.message.from;
        
        if (fromUser.is_bot) return;
    
        const user = await User.findOne({
            where: { account_id: fromUser.id }
        });

        if (!user) await User.create({ data: { account_id: fromUser.id } });
    }); 
}
