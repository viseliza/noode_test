import { Tasks } from './tasks.js';
import schedule from 'node-schedule';

/**
 *      *    *    *    *    *    *
 *      ┬    ┬    ┬    ┬    ┬    ┬
 *      │    │    │    │    │    │
 *      │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 *      │    │    │    │    └───── month (1 - 12)
 *      │    │    │    └────────── day of month (1 - 31)
 *      │    │    └─────────────── hour (0 - 23)
 *      │    └──────────────────── minute (0 - 59)
 *      └───────────────────────── second (0 - 59, OPTIONAL)
 */

export function CronStart() {
    schedule.scheduleJob('* * * * * *', async () => { await Tasks.clearDir(); });
}
