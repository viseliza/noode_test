import { Keyboards } from '../keyboards/index.js';

export const Commands = async (bot) => {
    bot.command("start", (ctx) => ctx.reply("Welcome! Up and running.", { reply_markup: Keyboards.keyboard }));
}
