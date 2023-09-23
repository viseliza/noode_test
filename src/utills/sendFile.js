import { User } from "../models/index.js";
import { InputFile } from "grammy";
import * as fs from 'fs';

export const sendFile = async ( ctx, time = 0 ) => {
    const group = await User.include({
        where: ctx.from.id
    })
    const path = `src/doc/${ group.name }/${ new Date(Date.now() + time ).toLocaleDateString( 'ru' )}.doc`;

    if (fs.existsSync( path )) {
        await ctx.replyWithDocument( new InputFile( path ) );
    } else {
        time == 0 
        ? await ctx.answerCallbackQuery({
            text: "Файл с заменами на сегодня отсутствует",
        })
        : await ctx.answerCallbackQuery({
            text: "Файл с заменами на завтра отсутствует",
        });
        
    }
}