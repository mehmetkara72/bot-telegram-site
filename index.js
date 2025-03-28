const { Telegraf } = require('telegraf');

const API_TOKEN = "7572428051:AAHLtNWVp41UGld8c01GNW9ifgodUnA9IFk";
const GROUP_ID = -1002351219867;

const bot = new Telegraf(API_TOKEN);

// Müşteri mesajlarını gruba yönlendir
bot.on('message', async (ctx) => {
    // Eğer mesaj gruptan geliyorsa ve bir yanıt ise
    if (ctx.message.chat.id === GROUP_ID) {
        if (ctx.message.reply_to_message) {
            const originalMessage = ctx.message.reply_to_message.text;
            if (originalMessage.includes("ID:")) {
                const customerId = parseInt(originalMessage.split("ID:")[1].split("\n")[0].trim());
                try {
                    await ctx.telegram.sendMessage(customerId, ctx.message.text);
                } catch (error) {
                    console.error('Yanıt gönderilirken hata:', error);
                }
            }
        }
        return;
    }

    // Eğer mesaj müşteriden geliyorsa
    const chatId = ctx.message.chat.id;
    const username = ctx.message.from.username || 'İsimsiz Müşteri';
    const messageText = ctx.message.text;

    try {
        await ctx.telegram.sendMessage(
            GROUP_ID,
            `Müşteri ${username} (ID: ${chatId})\n\n"${messageText}"`
        );
    } catch (error) {
        console.error('Mesaj iletilirken hata:', error);
    }
});

// Bot'u başlat
bot.launch(); 