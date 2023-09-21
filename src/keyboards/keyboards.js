import { Keyboard } from "grammy";

export class Keyboards {
    static main = new Keyboard()
        .text("👥 Выбор группы").row()
        .text("🗓 Просмотр замен").row()
        .resized();

    // Мусор ебанный, потому что у других колледжей ваще нет замен
    static select_collage = new Keyboard()
    .text("ПТК").row()
    .text("ГЭК").row()
    .text("МК").row()
    .resized();
}