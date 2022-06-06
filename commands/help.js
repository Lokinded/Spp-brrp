const { MessageEmbed, MessageButton, MessageActionRow, MessageCollector } = require('discord.js');



module.exports = {
    name: "help",
    description: '(Help) - Veja minha lista de Comandos',
    
run: async(client, message, args) => {
 

    const button21 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("categoria_utilidades")
                .setStyle("PRIMARY")
                .setLabel("Moderação")
                .setDisabled(false),
                new MessageButton()
                .setCustomId("categoria_diversão")
                .setStyle("PRIMARY")
                .setLabel("Diversão")
                .setDisabled(false),
                new MessageButton()
                .setCustomId("categoria_moderação")
                .setStyle("PRIMARY")
                .setLabel("Utilidades")
                .setDisabled(false),
                new MessageButton()
                .setCustomId("fechar")
                .setStyle("DANGER")
                .setLabel("Fechar Painel")
                .setDisabled(false)
                )
               
    const Painel = new MessageEmbed()
        .setTitle(`Painel de Comandos | ${client.user.username}`)
        .setDescription(`:wave: Olá ${message.author} Veja alguns links importantes abaixo:\n\n> [Entre no Brazil Roleplay](https://discord.gg/brrp)\n\n> Utilize os botões abaixo para visualizar meus comandos.`)
        .setColor(`#00ff00`)
        .setThumbnail(message.guild.iconURL())
        .setFooter(`ID ${message.guild.id}`, message.guild.iconURL())
    const m = await message.channel.send({ embeds: [Painel], components: [button21]})

    const iFilter = i => i.user.id === message.author.id;
    
    const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

        collector.on('collect', async(i) => {
            i.deferUpdate()
            switch (i.customId) {
                case `categoria_utilidades`:
                    m.edit({
                        embeds: [
                            
                            new MessageEmbed()
                                .setTitle(` Moderação | ${client.user.username}`)
                                .setDescription(
                                                `> Olá Aqui esta meus comandos da categoria \`Moderação\`.\n` +
                                                `**Lista De Comandos Abaixo:**\n\n` +
                                                `!setar,!avisodm,!plist,pboni,!anunciar.` +
                                                ``)
                                .setColor(`#00ff00`)
                                .setThumbnail(message.guild.iconURL())
                                .setTimestamp()
                                .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
                        ]
                    })
                  break;
                case `categoria_moderação`:
                    m.edit({
                        embeds: [
                            new MessageEmbed()
                                .setTitle(` Utilidades | ${client.user.username}`)
                                .setDescription(
                                                `> Olá Aqui esta meus comandos da categoria \`Utilidades\`.\n` +
                                                `**Lista De Comandos Abaixo:**\n\n` +
                                                `!boni,!sugerir,rboni.` +
                                                
                                                 ``)
                                .setColor(`#00ff00`)
                                .setThumbnail(message.guild.iconURL())
                                .setTimestamp()
                                .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
                        ]
                    })
                    break;
                    case `categoria_diversão`:
                    m.edit({
                        embeds: [
                            new MessageEmbed()
                                .setTitle(` Diversão | ${client.user.username}`)
                                .setDescription(
                                                `> Olá Aqui esta meus comandos da categoria \`Diversão\`.\n` +
                                                `**Lista De Comandos Abaixo:**\n\n` +
                                                `Nenhum comando Disponivel` +
                                                 ``)
                                .setColor(`#00ff00`)
                                .setThumbnail(message.guild.iconURL())
                                .setTimestamp()
                                .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
                        ]
                    })
                  break;
                case `fechar`:
                   setTimeout(() => m.delete(), 100)
                
            }
        })

    }
}
