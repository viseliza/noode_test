import { Keyboards } from "../keyboards/index.js";
import { userExists } from "../utills/index.js";

export const Commands = (bot) => {
    bot.command("start", async (ctx) => {
        // Проверка на существование пользователя и выбор колледжа
        ctx.reply(
            `👋 Здравствуйте, ${ctx.message.chat.first_name}!\n` +
            "👨‍🏫 Я предназначен для упрощения работы с сайтом novsu.ru\n\n" +
            "🧰 На данный момент я могу:\n" +
            "📝 Просматривать существующие замены",
        { reply_markup: Keyboards.main }
        );
        
        await userExists(bot);
    });

    bot.command("help", (ctx) => {
        ctx.reply(
            'Вы можете можете нажать на кнопку выбор группы, если вы еще ее не выбрали\n' +
            'Или для того, чтобы изменить выыбранную\n\n' + 
            'Если группа выбрана, то можно посмотреть существующие замены на сегодняшний день для выбранной группы'
        )
    });
};
