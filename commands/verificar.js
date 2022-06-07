const {
    MessageActionRow,
    MessageEmbed,
    MessageSelectMenu
} = require('discord.js');
const Discord = require("discord.js")


module.exports = {
    namem: 'verificar',
    aliases: ["verificar"],
    run: async(client, message, args) => {

        const chat = client.channels.cache.get('970167514300551258');

        const row = new Discord.MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('1')
            .setPlaceholder('Menu Verificação')
            .addOptions([{
                label: 'Aceitar',
                description: 'Aceitar Membro',
                emoji: '✔',
                value: '1',
            },
                {
                    label: 'Recusar',
                    description: 'Recusar Membro',
                    emoji: '❌',
                    value: '2',
                },
            ]));

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui a permissão de \`Administrador\` para poder utilziar este comando.`)
        } else {

            let embed_2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${message.author} Qual Sua Gamertag?`);

            let embed_3 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${message.author} Qual Sua Social Club?`);

            message.reply({
                embeds: [embed_2]
            }).then(m_2 => {

                let coletor_2 = message.channel.createMessageCollector({
                    filter: mm => mm.author.id == message.author.id, max: 1
                });

                coletor_2.on("collect", (palavra_2) => {
                    let titulo = palavra_2.content;
                    message.reply({
                        embeds: [embed_3]
                    }).then(m_3 => {

                        let coletor_3 = message.channel.createMessageCollector({
                            filter: mm => mm.author.id == message.author.id, max: 1
                        });

                        coletor_3.on("collect", (palavra_3) => {

                            let desc = palavra_3.content;

                            message.reply(`Sua Verificação Foi Enviada com sucesso!.`).then(m => {
                                chat.send({
                                    embeds: [
                                        new Discord.MessageEmbed()
                                        .setColor("RANDOM")
                                        .setTimestamp(new Date)
                                        .setThumbnail(message.guild.iconURL({
                                            dynamic: true
                                        }))
                                        .setFooter(message.guild.name, message.guild.iconURL({
                                            dynamic: true
                                        }))
                                        .setAuthor(message.guild.name, message.guild.iconURL({
                                            dynamic: true
                                        }))
                                        .setTitle(`Verificação Social Club`)
                                        .setDescription(`> Registro De ${message.author}
                                            > Gamertag:${titulo}
                                            > Social Club: ${desc}`)], components: [row]
                                }).then(msg => {

                                    const filtro = (interaction) =>

                                    interaction.isSelectMenu()

                                    const coletor = msg.createMessageComponentCollector({
                                        filtro
                                    });

                                    coletor.on('collect', async (collected) => {

                                        let ticket = collected.values[0];

                                        collected.deferUpdate()

                                        if (ticket === '1') {
  msg.edit({content: `${message.author} foi aprovado!`);         
 const aprovado = client.channels.cache.get('970167509233860708');  
      aprovado.send(`${message.author} Você  Foi Aprovado`)
  
                                        };

                                        if (ticket === '2') {
                 msg.edit({content: `${message.author} foi reprovado!`);         
           const reprovado = client.channels.cache.get('970167511985320017');
    reprovado.send(`${message.author} Você  Foi reprovado!`)
                                        };

                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    }
}