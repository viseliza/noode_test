export const Triggers = async (bot) => {
    bot.hears(/(выбор группы|группа)/gmiu, async (ctx) => {
        return ctx.reply('выбор группы')
    });
    
    bot.hears(/просмотр замен/gmiu, async (ctx) => {
        return ctx.reply('замены')
    });

    bot.on(':text', async (ctx) => {
        return ctx.reply('Я не знаю что тебе ответить')
    });
}

/*
> ctx.message

{
  message_id: 52,
  from: {
    id: 5035203749,
    is_bot: false,
    first_name: 'Владислав',
    last_name: 'Иванов',
    username: 'vladislav72018',
    language_code: 'ru'
  },
  chat: {
    id: 5035203749,
    first_name: 'Владислав',
    last_name: 'Иванов',
    username: 'vladislav72018',
    type: 'private'
  },
  date: 1694681175,
  text: '.'
}
*/