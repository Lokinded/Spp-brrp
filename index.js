const db = require("quick.db")
const { Modal, TextInputComponent, showModal } = require('discord-modals'); 

const discordModals = require('discord-modals');

const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);


const ping = require("kettraworld-ping") 

// caso queira criar um webserver
ping.webserver(3000);

ping.ping("https://Ssp-1.lokinded.repl.co")  ;


console.log("NodeJS Version: " + process.version);
const Discord = require("discord.js"); 
const config = require("./config.json"); 
const client = new Discord.Client({intents: 32767});



client.once('ready', async () => {

    console.log("✅ - Estou online!")

})

client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});
client.on("messageCreate", (message) => {

    if (message.channel.id === "965313041686229022") { // Coloque o ID do canal de texto

        let emoji_certo = "✅" // Coloque seu emoji
        let emoji_errado = "❌" // Coloque seu emoji

        message.react(emoji_certo).catch(e => {})
        message.react(emoji_errado).catch(e => {})

    } else { return; }
})

  
//Mudança de status
client.on("ready", () => {
    let activities = [
        '🔨 \n Desenvolvindo Por Lokzin.'
    ];
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
     type: "STREAMING", url: "https://www.twitch.tv/edu"
      }), 5000); 
  client.user
      .setStatus("dnd")
}); 

  

client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "t") {
            if (interaction.guild.channels.cache.find(c => c.name === `🎫-${interaction.user.id}`)) {
                let c = interaction.guild.channels.cache.find(c => c.name === `🎫-${interaction.user.id}`);
                interaction.reply({ content: `Você já possui um ticket aberto em ${c}.`, ephemeral: true })
            } else {
                interaction.guild.channels.create(`🎫-${interaction.user.id}`, {
                    type: "GUILD_TEXT",
                    //parent: "",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                        }
                    ]
                }).then(c => {

                    interaction.reply({ content: `Olá, seu ticket foi aberto em ${c}.`, ephemeral: true })

                    let embed = new Discord.MessageEmbed()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`Olá \`${interaction.user.username}\`, boas vindas ao seu ticket.\nAgurade alguns instantes para receber o suporte.\n\nFeche seu ticket com \`🔒\`.`);

                    let botao = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setCustomId("tf")
                        .setEmoji("🔒")
                        .setStyle("SECONDARY")
                    );

                    c.send({ embeds: [embed], components: [botao] }).then(msg => msg.pin())
                })
            }
        } else if (interaction.customId === "tf") {
            interaction.reply(`\\🔒 Olá ${interaction.user}, este ticket será fechado em \`5 segundos\`...`).then(() => {
                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000)
            })
        }
    }
});

  
//Bota isso na index, by ferinha, editado por victor


//
    
  


const guild = '875857943365570630'; // ID do servidor onde esta o canal.
const channel = '970167457304170496'; // Canal onde sera enviada a mensagem com o conteudo coletado.

client.on('interactionCreate', interaction => {
	if (interaction.customId.startsWith('modals_button')) {

    
    
		let textinput_comando = new TextInputComponent()
			.setCustomId('textinput-comando_bug')
			.setLabel('O que e GTA RP?')
			.setStyle('LONG')
			.setMinLength(10)
			.setMaxLength(100)
			.setPlaceholder('Explique Oque e Roleplay')
			.setRequired(false) // Nao e obrigatorio
		let textinput_descricao = new TextInputComponent()
			.setCustomId('textinput-descricao_bug')
			.setLabel('Oque e metagaming?')
			.setStyle('LONG')
			.setMinLength(10)
			.setMaxLength(100)
			.setPlaceholder('Explique Oque E metagaming')
			.setRequired(true) // Obrigatorio
		let textinput_print = new TextInputComponent()
			.setCustomId('textinput-print_bug')
			.setLabel('Oque e Powergaming?')
			.setStyle('LONG')
			.setMinLength(10)
			.setMaxLength(100)
			.setPlaceholder('Explique Oque e Powergaming?')
			.setRequired(false) // Nao e obrigatorio
		let textinput_extras = new TextInputComponent()
			.setCustomId('textinput-extras_bug')
			.setLabel('Oque E RDM?')
			.setStyle('LONG')
			.setMinLength(10)
			.setMaxLength(120)
			.setPlaceholder('Explique Oque e RDM')
			.setRequired(false) // Nao e obrigatorio
		let textinput_ser_notificado = new TextInputComponent()
			.setCustomId('textinput-ser_notificado_bug')
			.setLabel('Oque e Vdm?')
			.setStyle('LONG')
			.setMinLength(20)
			.setMaxLength(200)
			.setPlaceholder('Explique E cite 3 Vdms')
			.setRequired(false) // Nao e obrigatorio

		const modal = new Modal()
			.setCustomId('modal-reportbugs')
			.setTitle('Sistema De Whitelist')
			.addComponents([textinput_comando, textinput_descricao, textinput_print, textinput_extras, textinput_ser_notificado]);

		showModal(modal, {
			client: client,
			interaction: interaction
		});
	}
})
client.on('modalSubmit', async (modal) => {
	if (modal.customId === 'modal-reportbugs') {
		const comando = modal.getTextInputValue('textinput-comando_bug');
		const descricao = modal.getTextInputValue('textinput-descricao_bug');
		const print = modal.getTextInputValue('textinput-print_bug');
		const extras = modal.getTextInputValue('textinput-extras_bug');
		const ser_notificado = modal.getTextInputValue('textinput-ser_notificado_bug');
    

		const canal = client.guilds.cache.get(guild).channels.cache.get(channel);
    let user = modal.user
let racao = await db.fetch(`racao_${user.id}`);
    let acao = await db.fetch(`acao_${user.id}`);
      
  db.add(`racao_${user.id}`,1);
  db.add(`acao_${user.id}`,1);
		const embed_1 = new Discord.MessageEmbed()
			.setAuthor(`🛡️ | Novo wl Registrado:`)
			.setDescription(`
 > 🧑‍✈️| Usuario: ${modal.user} 

>  | Oque E Gta Rp? : ${comando}

>  | Oque E Metagaming?: ${descricao}

>  |Oque E Powergaming? : ${print}
 
>  |Oque e VMD? ${extras}
`)
    
			.setTimestamp()
			.setColor("GREEN")
.setThumbnail(modal.user.displayAvatarURL({ dynamic: true })) 
		
			.setColor("DARK_PURPLE")
    const botaowl = new Discord.MessageButton().setCustomId("botao_wl").setLabel("Aceitar").setStyle("SUCCESS").setEmoji("✅")
    let botwl = new Discord.MessageActionRow().addComponents(botaowl)
    
	canal.send({ embeds: [embed_1], components: [botwl] })
    modal.reply({ content: `Obrigado por Enviar Sua Whitelist!`, ephemeral: true }); 
	}
})

/*
client.on('interactionCreate', interaction => {

    let cargos = interaction.guild.roles.cache.get("970167370918285362");
    let cargol = interaction.guild.roles.cache.get("970167371748749362")
  
  
    if (interaction.isButton()) {

      try {
        if (interaction.customId.startsWith("botao_wl")) {
            
  
            if (interaction.user.roles.cache.get(cargo.id)) {
                interaction.reply({ content: `\\❌ Você já está com wl no servidor.`, ephemeral: true })
  
            } else {
            interaction.user.roles.add(cargos)
            interaction.user.roles.remove(cargol)
            interaction.reply({ content: `\\✅ Usuário Aceito.`, ephemeral: true })
  
            
            } catch (er) { console.log(er) }
        } else {}
  
    }
  
  }) 
*/

client.on("guildMemberAdd", async (member) => { 

       let guild = await client.guilds.cache.get("875857943365570630");//ID Do servidor!
       let channel = await client.channels.cache.get("970167442057863178");//ID do Canal!
       let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "thumbsupnaruto");
       let emoji2 = await member.guild.emojis.cache.find(emoji => emoji.name === "pepenarutorun");
       if (guild.id != member.guild.id) {
       return console.log(`Alguém entrou no servidor ${guild.name}`);
       } else {
       let embed = await new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setDescription(`${member.user} use o chat para conversar e lembre-se **sem comandos** por aqui. Respeite cada canal para não ser levado a banimento permanente. Se divirta muito com todos ${emoji2}.`)
         
       channel.send({embeds: [embed]});

         
       const guild = member.guild
       const embed2 = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`
Bem-vindo(a) ao servidor \`${guild.name}\`

\`\`\`fix\n ――――――――――――― Lua Nova Roleplay ――――――――――――― \`\`\`

\`\`\`md\n# Leia O CHAT <#970167478720290856>.
# [LOGS] Cuidando de ${client.users.cache.size} membros.
# [LOGS] Administrando ${client.channels.cache.size} canais. \`\`\`

\`\`\`fix\n ――――――――――――― Yumi ――――――――――――― \`\`\`

\`\`\`md\n# [LOGS] ${client.user.tag}
# [LOGS] ${client.user.id}
# [LOGS] ${client.user.username}
# [LOGS] ${client.user.presence.status} \`\`\`
 `)
           .setTimestamp()
           .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
           .setFooter(member.user.tag, member.user.displayAvatarURL())
         
       member.user.send({embeds: [embed2]}).catch(e => console.log(`Dm bloqueada`))
       }
      });  


//vamos?
client.login(process.env.token); 
discordModals(client); 