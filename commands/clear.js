const { Client, Message, MessageEmbed, DiscordAPIError} = require('discord.js');
 
 
 
module.exports = {
 
    name: 'clear',/////// BY #!ɢᴏɴᴄᴀ#5347 //////
                  /////// BY #!ɢᴏɴᴄᴀ#5347/ ////
    aliases: ['limpar chat'],/////// BY #!ɢᴏɴᴄᴀ#5347/////
 
 
 
    run: async (client, message, args) => {
 
        let clearchannel = message.guild.channels.cache.get("949274716357685280"); //// CANAL DAS LOGS 
 
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`${message.author} **YOU DON'T HAVE PERMISSION FOR USE THIS COMMAND**`)
 
 
 
        try {
 
            let delamount = args[0];
 
            let msg_del = parseInt(delamount) + 1
 
 
 
            let incomplet = new MessageEmbed()
 
            .setTitle(`🧹 | CLEAR MESSAGES`)
 
            .setColor("RED")
 
            .setDescription(`**\n📋 | DESCRIPTION: Use this command to clear the chat.\n\n❓ | WHO I USE? USE LIKE THIS: stream!clear (messages) \n\n📜 | Exemple: stream!clear 10**`)
 
            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply({embeds: [incomplet]})
 
 
 
            if (parseInt(delamount) > 99) return message.reply('❌ | **you can only clear 1 to 99 messages!**')
 
 
 
            await message.channel.bulkDelete(parseInt(delamount) + 1, true);
 
 
 
            let clear = new MessageEmbed()
 
            .setTitle(`🧹 | CLEAR`)
 
            .setColor("WHITE")
 
            .setThumbnail(``) 
 
            .setDescription(`**> 🧹 | HAS BEEN CLEAR ${delamount} MESSAGES IN  ${message.channel}.\n\n> 🎓 | CLEAR AUTHOR: ${message.author}**`)    
 
            if (!clearchannel) {
                return message.channel.send("**:x: |I DON'T FOUND THE CLEAR LOGS CHANNEL.**");
            }
    
            clearchannel.send({ embeds: [clear] });
 
 
 
        } catch (e) {
 
            console.log(e)
 
        }
 
 
 /////// BY #!ɢᴏɴᴄᴀ#5347 /////
    }/////// BY #!ɢᴏɴᴄᴀ#5347 /////
 /////// BY #!ɢᴏɴᴄᴀ#5347 /////
 /////// BY #!ɢᴏɴᴄᴀ#5347 ///// 
 /////// BY #!ɢᴏɴᴄᴀ#5347 /////
} /////// BY #!ɢᴏɴᴄᴀ#5347 /////
/////// BY #!ɢᴏɴᴄᴀ#5347 /////
 