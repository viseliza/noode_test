import 'dotenv/config'
import { Bot } from 'grammy';
import { Keyboard } from './keyboards';

const bot = new Bot(process.env.API_TOKEN);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running.", { reply_markup: Keyboard.home_keyboard }));

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
