const Discord = require('discord.js');
const db = require('quick.db');
const rs = require('randomstring');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  

    let permcheck = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`No tienes permiso para ejecutar el comando `)

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(permcheck)

    let setupcheck2 = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`Este servidor ya ha sido configurado`)


  message.guild.createRole({
    name: 'Admin',
    color: 'BLUE',
    permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']
  })
    .then(role => console.log(`Se creó un nuevo rol con nombre ${role.name} y color ${role.color}`))
    .catch(console.error)

    let categorycreate = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setTitle(`El server fue configurado con EXITO`)
    .setDescription(`Admin Role: **Admin** | Categoría de Tickets abiertos: **Tickets** | Categoría de Tickets cerrados: **Tickets cerrados**`)

    var name = `Tickets`;
    message.guild.createChannel(name, { type: "category" })

    var name = `Tickets cerrados`;
    message.guild.createChannel(name, { type: "category" }).then(
      (chan2) => {
        chan2.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
          'SEND_MESSAGES': false
        }
        )})

    message.channel.send(categorycreate)

    var name = `ticket-logs`;
    message.guild.createChannel(name, { type: "text" }).then(
      (chan) => {
      chan.overwritePermissions(message.guild.roles.find('name', '@everyone'), {
         'VIEW_CHANNEL': false
      })
      chan.overwritePermissions(message.guild.roles.find('name', 'Admin'), {
          'VIEW_CHANNEL': true
      })
        let category = message.guild.channels.find(c => c.name == "Tickets" && c.type == "category");
  
      chan.setParent(category.id)
      chan.setTopic('Canal de registros de tickets para el bot')

      
    })
}
module.exports.help = {
    name:"setup",
    aliases: ["su"]
  }