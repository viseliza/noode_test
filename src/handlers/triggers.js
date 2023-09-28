import { Replacement, sendFile, Schedule } from "../utills/index.js";
import { Keyboards } from "../keyboards/index.js";


export const Triggers = async ( bot ) => {
    bot.hears(/(выбор группы|группа)/gmiu, async ( ctx ) => {
        await ctx.conversation.enter( "enterGroup" )
    });

    
    bot.hears(/просмотр замен/gmiu, async ( ctx ) => {
        return ctx.reply( await Replacement.main( ctx ), { 
            reply_markup: Keyboards.inline 
        })
    });


    bot.hears(/расписание/gmiu, async ( ctx ) => {
        return ctx.reply( await Schedule.main( ctx ), {
            reply_markup: Keyboards.inline_full_days,
            parse_mode: "HTML",
        });
    });


    bot.callbackQuery( 'fullWeak', async ( ctx ) => {
        ctx.reply( await Schedule.main( ctx, false ), { parse_mode: "HTML" } );
    })


    bot.callbackQuery( 'tomorow', async ( ctx ) => {
        ctx.reply( await Replacement.main( 
            ctx.update.callback_query,
            86_400_000
        ), {  reply_markup: Keyboards.inline_tomorow });
    }) 

    bot.callbackQuery( 'downloadNow', async ( ctx ) => {
        await sendFile( ctx );
    })

    bot.callbackQuery( 'donwloadNextDay', async ( ctx ) => {
        await sendFile( ctx, 86_400_000 );
    })


    bot.on( ':text', async ( ctx ) => {
        return ctx.reply(
          'Я не знаю что тебе ответить...\n',
          'Вы можете ознакомиться с моим функционалом введя команду /help' )
    });
}