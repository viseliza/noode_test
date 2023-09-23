import { InlineKeyboard, Keyboard } from "grammy";

export class Keyboards {
    static time = "0";

    static main = new Keyboard()
        .text( "👥 Выбор группы" )
        .text( "🗓 Просмотр замен" )
        .text( "🗓 Расписание" )
        .resized();

    static inline = new InlineKeyboard()
    .text( "Скачать файл", "downloadNow" )
    .text( "На завтра", "tomorow" );

    static inline_tomorow = new InlineKeyboard()
    .text( "Скачать файл", "donwloadNextDay" );
}