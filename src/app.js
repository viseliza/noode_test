import { 
  conversations, 
  createConversation 
} from '@grammyjs/conversations';
import { Bot, session  } from 'grammy';
import { Dispatcher } from './handlers/index.js';
import { CronStart } from './cron/index.js';
import { enterGroup } from "./utills/index.js";
import dotenv from 'dotenv'
dotenv.config()

const bot = new Bot( process.env.API_TOKEN );

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.use( createConversation( enterGroup ) );

await Dispatcher.initialize( bot );

CronStart();
bot.start();
