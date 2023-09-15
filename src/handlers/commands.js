import { Keyboards } from "../keyboards/index.js";
import { GetURL } from '../utills/index.js';

export const Commands = async (bot) => {
    bot.command("start", (ctx) => {
        ctx.reply(
        `👋 Здравствуйте, ${ctx.message.chat.first_name}!\n` +
            "👨‍🏫 Я предназначен для упрощения работы с сайтом novsu.ru\n\n" +
            "🧰 На данный момент я могу:\n" +
            "📝 Просматривать существующие замены",
        { reply_markup: Keyboards.main }
        );
    });

    bot.command("help", async (ctx) => {
        var url = 'https://portal.novsu.ru/univer/timetable/spo/';

        console.log(await GetURL(url))
    });
};
