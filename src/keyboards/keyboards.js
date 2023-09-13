import { Keyboard } from "grammy";

export class Keyboards {
    static keyboard = new Keyboard()
        .text("Yes, they certainly are").row()
        .text("I'm not quite sure").row()
        .text("No. 😈")
        .resized();
}