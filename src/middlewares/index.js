import { userExists } from './userExists.js';

export async function Middlewares(bot) {
    await userExists(bot);
}