export const Triggers = async (bot) => {
    bot.on("message", (ctx) => ctx.reply("Got another message!"));    
}
