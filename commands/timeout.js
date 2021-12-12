const Discord = require('discord.js');
const db = require('quick.db');
const date = require('date-and-time')
const hastebin = require('hastebin')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  

    let notallowed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Need The **Admin** Role To Start Ticket Timeouts`)

    if(!message.member.roles.find(r => r.name == 'Admin')) return message.channel.send(notallowed)

  let cancelembed = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setDescription(`Timeout Stopped`)

  let input = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setDescription(`Tiempo de espera iniciado\n\nEste ticket se cerrará en 15 minutos si nadie reacciona a este mensaje`)

  let msg = await message.channel.send(input)
  await msg.react("✅")

  bot.on('messageReactionAdd', (messageReaction, user) => {
    if(user.bot) return;
  })
  
  let user = db.fetch(`${message.guild.id}_${message.author.id}-ticketopener`)

  message.channel.fetchMessages()
  .then(messages => {
    let text = "";

  for (let [key, value] of messages) {
        const now = new Date();
      let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;

      text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
  }

  hastebin.createPaste(text, {
          raw: true,
          contentType: 'text/plain',
          server: 'https://hastebin.com'

      })
      .then(data => {
          console.log(`Creada en: ${data}`);
          
          db.set(`${message.guild.id}_${user.id}-transcript`, data)
  
  let ticketcount = db.fetch(`${message.guild.id}-ticketcount`)
  let ticketchannel = db.fetch(`${message.guild.id}_${message.author.id}-channelID`)

  let channeldelete = message.guild.channels.get(ticketchannel)
    let category = message.guild.channels.find(c => c.name == "Tickets cerrados" && c.type == "category")

    let closedticket = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`Ticket Cerrado y Movido a Tickets cerrados. Este ticket se eliminará en 120\n\n[Ticket Transcript](${data}) O Ejecuta \`ticket.last\` Para info adicional`)

    let logchannelembed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setTitle(`Ticket Cerrado`)
    .setDescription(`Cerrado por: ${message.author}\nTicket Numero: \`${ticketcount}\`\nRazon del cierre : \`Timeout\`\nTranscript: [Here](${data})`)

    let logchannel = message.guild.channels.find(cl => cl.name == "ticket-logs" && cl.type == "text")

  const filter = (reaction, user) => ['✅'].includes(reaction.emoji.name) && !user.bot;

  msg.awaitReactions(filter, {
    max: 1,
    time: 180
  }).then(collected => {
    const reaction = collected.first();
    switch (reaction.emoji.name) {
      case '✅':
        msg.delete()
      return message.channel.send(cancelembed)
    }
  }).catch(collected => {
    if(category) channeldelete.setParent(category.id)
    logchannel.send(logchannelembed)  
    message.channel.send(closedticket)
    msg.delete()
    setTimeout(() => {
      channeldelete.delete()
    }, 120);
     
  })
  }
      )}
  )}

module.exports.help = {
    name:"timeout",
    aliases: ["to"]
  }