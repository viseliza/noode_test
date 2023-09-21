import { Group, User } from "../models/index.js";
import { Keyboards } from "../keyboards/index.js";

export const enterGroup = async (conversation, ctx) => {
    await ctx.reply("Введите номер группы", { reply_markup: { remove_keyboard: true } });
    const { message } = await conversation.wait();

    const group = await Group.findOne({
        where: { name: message.text }
    });

    await User.update({
        where: { account_id: message.from.id },
        data: {
            group: group.id
        }}
    )

    return !group ? await ctx.reply("Вы ввели несуществующую группу!", { reply_markup: Keyboards.main }) 
    : await ctx.reply('Номер группы успешно сохранен!', { reply_markup: Keyboards.main });
}