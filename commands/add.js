const Discord = require('discord.js');
const db = require('quick.db');
const rs = require('randomstring');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  

    let notallowed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`Necesita el rol de ** STAFF ** para agregar usuarios a TICKETS`)

    if(!message.member.roles.find(r => r.name == 'Admin')) return message.channel.send(notallowed)

    let user = message.mentions.members.first()

  let channelsend = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setTitle(`Miembro agregado`)
  .setDescription(`${message.author} Ha Agregado a ${message.mentions.members.first()} A este  Ticket`)

  let categorysend = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setDescription(`Este servidor no ha sido configurado | Póngase en contacto con el propietario del servidor`)



    

    message.channel.overwritePermissions(user.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false})
      message.channel.send(channelsend)

    
    }  
module.exports.help = {
    name:"add",
    aliases: ["a"]
  }