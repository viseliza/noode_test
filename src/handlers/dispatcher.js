import { Commands } from './commands.js';
import { Triggers } from './triggers.js';
import { Middlewares } from '../middlewares/index.js';

export class Dispatcher {
    static async initialize(bot) {
        await Middlewares(bot);
        await Commands(bot);
        await Triggers(bot);
    }
}
