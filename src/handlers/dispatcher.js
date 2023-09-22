import { Middlewares } from '../middlewares/index.js';
import { Commands } from './commands.js';
import { Triggers } from './triggers.js';

export class Dispatcher {
    static async initialize(bot) {
        await Commands(bot);
        await Triggers(bot);
    }
}
