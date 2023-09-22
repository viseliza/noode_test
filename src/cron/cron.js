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
    schedule.scheduleJob('* * * 28 8 *', async () => { await Tasks.recycleTrash(); });

    schedule.scheduleJob('* * * 28 8 *', async () => { await Tasks.insertGroups(); });
}
