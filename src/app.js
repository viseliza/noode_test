import dotenv from 'dotenv'
import { Bot } from 'grammy';
import { Dispatcher } from './handlers/index.js';
import { CronStart } from './cron/index.js';
dotenv.config()

const bot = new Bot(process.env.API_TOKEN);

await Dispatcher.initialize(bot);

CronStart();
bot.start();
