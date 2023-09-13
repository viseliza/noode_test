import { Keyboard } from "grammy";

export class Keyboards {
    static keyboard = new Keyboard()
        .text("👥 Выбор группы").row()
        .text("🗓 Просмотр замен").row()
        .resized();
}