const Discord = require('discord.js');
const db = require('quick.db');
const rs = require('randomstring');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  

    let notallowed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`Necesita el rol de ** Administrador ** para eliminar usuarios de los tickets`)

    if(!message.member.roles.find(r => r.name == 'Admin')) return message.channel.send(notallowed)

  let channelsend = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setTitle(`Usuario removido`)
  .setDescription(`${message.author} Ha Removido ${message.mentions.members.first()} De Este Ticket`)

  let categorysend = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setDescription(`Este servidor no ha sido configurado | Póngase en contacto con el propietario del servidor`)



    

    message.channel.overwritePermissions(user, {'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'MENTION_EVERYONE': false})
      message.channel.send(channelsend)

    
    }  
module.exports.help = {
    name:"remove",
    aliases: ["rrr"]
  }