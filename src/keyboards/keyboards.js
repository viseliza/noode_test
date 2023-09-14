import { Keyboard } from "grammy";

export class Keyboards {
    static main = new Keyboard()
        .text("👥 Выбор группы").row()
        .text("🗓 Просмотр замен").row()
        .resized();
}