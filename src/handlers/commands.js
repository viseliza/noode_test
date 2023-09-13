import { Keyboards } from '../keyboards/index.js';

export const Commands = async (bot) => {
    bot.command("start", (ctx) => {
        ctx.reply(
        `👋 Здравствуйте, ${ ctx.message.chat.first_name }!\n` + 
        '👨‍🏫 Я предназначен для упрощения работы с сайтом novsu.ru\n\n' + 
        '🧰 На данный момент я могу:\n' + 
        '📝 Просматривать существующие замены', 
        { reply_markup: Keyboards.keyboard }
        )});
}
