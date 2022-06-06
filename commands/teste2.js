/*
Como "instalar":
1. Dentro da sua index.js definida discordModals inserindo const discordModals = require('discord-modals');
2. Coloque discordModals(client); embaixo do seu client.login | client.login(config.token). Caso contrario você vai receber o erro *ReferenceError: Cannot access 'client' before initialization
3. Coloque a parte da index na sua index OU no seu evento de interactionCreate e modalSubmit.
Se tudo tiver dado certo, vai funcionar.
*/

/*
|---------------------------------------------------------|
|=========================================================|
|                   PARTE DO COMANDO                      |
|=========================================================|
|---------------------------------------------------------|
*/

const Discord = require("discord.js")


module.exports = {
    name: "setbugs", 
    description: "", 
    aliases: [""], 
    run: async (client, message, args) => {
        

        let enviar_bug = new Discord.MessageButton().setCustomId("modals_button").setLabel("Informar").setStyle("SECONDARY").setEmoji('📍');
        let painel_bugs = new Discord.MessageActionRow().addComponents(enviar_bug)
        const embed_bugs = new Discord.MessageEmbed()
        .setAuthor(`Sistema de informar`)
        .setDescription(`📥 | Clique no botão abaixo e preencha os campos com as informações solicitadas.`)
        .setColor('PURPLE')
        message.channel.send({ embeds: [embed_bugs], components: [painel_bugs] })
        message.delete()
    }
}

/*
|---------------------------------------------------------|
|=========================================================|
|              PARTE DO EVENTO NA INDEX                   |
|=========================================================|
|---------------------------------------------------------|
*/

