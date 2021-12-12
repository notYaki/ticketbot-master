const Discord = require('discord.js');
const db = require('quick.db');
const date = require('date-and-time')
const hastebin = require('hastebin')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  

  let channel = message.channel;

  let whoopsembed = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setDescription(`El Ticket ya está cerrado`)

  if(channel.parent == message.guild.channels.find(c => c.name == "Tickets cerrados" && c.type == "category")) return message.channel.send(whoopsembed)

    let ticketcount = db.fetch(`${message.guild.id}-ticketcount`)
  let ticketchannel = db.fetch(`${message.guild.id}_${message.author.id}-channelID`)

  let reason = args.join(" ");

  if(!reason) reason = 'Ninguna proporcionada'

  db.set(`${message.guild.id}_${message.author.id}-closeticketreason`, reason)

  let reasonfetch = db.fetch(`${message.guild.id}_${message.author.id}-closeticketreason`)

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
          contentType: 'ext/plain',
          server: 'https://hastebin.com'

      })
      .then(data => {
          console.log(`Creada en: ${data}`);
          
          db.set(`${message.guild.id}_${user.id}-transcript`, data)
          
          let authorsend = new Discord.RichEmbed()
          .setColor('#e64b0e')
          .setDescription(`[Message Transcript](${data}) Of Your Ticket In ${message.guild.name}`)

          let closedticket = new Discord.RichEmbed()
          .setColor('#e64b0e')
          .setDescription(`Ticket cerrado y trasladado a Tickets cerrados. Este ticket se eliminará en 120 segundos \n\n[Ticket Transcript](${data}) O ejecuta \`ticket.last\` Para obtener información adicional`)


    let channeldelete = message.guild.channels.get(ticketchannel)
    let category = message.guild.channels.find(c => c.name == "Tickets cerrados" && c.type == "category")

    if(category) channeldelete.setParent(category.id) 


    let logchannelembed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setTitle(`Ticket Cerrado`)
    .setDescription(`Cerrado por: ${message.author}\nTicket Numero: \`${ticketcount}\`\nCerrar Razon: \`${reasonfetch}\`\nTranscript: [Here](${data})`)

    let logchannel = message.guild.channels.find(cl => cl.name == "ticket-logs" && cl.type == "text")
    logchannel.send(logchannelembed)  
    message.channel.send(closedticket)

        setTimeout(() => {
          channeldelete.delete()
        }, 120);

      })
})
}     
module.exports.help = {
    name:"close",
    aliases: ["cr"]
  }