 //comando em slash
const Discord = require("discord.js");


console.log(`slash ticket - Online`)

module.exports = {
  name: 'ticket',
  description: 'use esse comando no chat de ticket',
  type: 'CHAT_INPUT',
  optios: [
    {
      name: 'canal',
      description: 'Canal que deseja setar o ticket',
      type: 'CANAL',
      required: false,
      }],
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      interaction.reply(`Ops... Você não possui permissão \`ADMINISTRATOR\` para utilizar este comando`)
    } else {
      const canal = interaction.options.getChannel('canal') || interaction.channel;
      if (!canal.isText()) {
        return interaction.reply({ content: '❌ Selecione um canal de texto', ephemeral: true });
      }
      let embed = new Discord.MessageEmbed()
        .setColor("ffcdbd")
        .setImage("https://cdn.discordapp.com/attachments/953939991514447942/957711149879668866/unknown-1.png")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setFooter("Aperte o botão abaixo para abrir o ticket!")
        .setTimestamp(new Date())
        .setDescription(`> :timer_nya: **Sobre:**\nAbra um **Ticket** para obter Support no servidor\n\n> :gift_gif: **Descrição:**\nPor favor seja bem claro em sua dúvida para ter um support melhor!`);

      let botao = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
          .setCustomId("t")
          .setEmoji("🥽")
          .setStyle("SECONDARY")
        );
      interaction.reply({ content: `Ticket enviado com sucesso para <#${canal.id}>` })
      canal.send({ embeds: [embed], components: [botao] }).then();
    }



  }
}