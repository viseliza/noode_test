import { Replacement } from "../utills/index.js";
import { Keyboards } from "../keyboards/index.js";

export const Triggers = async ( bot ) => {
    bot.hears(/(выбор группы|группа)/gmiu, async ( ctx ) => {
        await ctx.conversation.enter( "enterGroup" )
    });


    
    bot.hears(/просмотр замен/gmiu, async ( ctx ) => {
        return ctx.reply(await Replacement.main( ctx ))
    });


    bot.callbackQuery( "tomorow", async ( ctx ) => {
        ctx.reply(await Replacement.main( 
            ctx.update.callback_query
        ), { 
            reply_markup: Keyboards.inline_tomorow 
        });
    })


    bot.on(':text', async ( ctx ) => {
        return ctx.reply(
          'Я не знаю что тебе ответить...\n',
          'Вы можете ознакомиться с моим функционалом введя команду /help')
    });
}