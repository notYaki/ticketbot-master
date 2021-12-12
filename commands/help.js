const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  


    let embed = new Discord.RichEmbed()
    .setTitle("Bunny Dates Ayuda")
    .addField("Crear Ticket [Alias: cr]", "`ticket.create`")
    .addField("Cerrar ticket [Alias: cl]", "`ticket.close [reason]`")
    .addField("Agregar un usuario al ticket [Alias: a]", "`ticket.add [usermention]`")
    .addField("Remover usuario del ticket [Alias: r]", "`ticket.remove [usermention]`")
    .addField("Informacion del ultime ticket cerrado [Alias: lt]", "`ticket.last`")
    .addField("ADMIN | Forzar cierre del ticket [Alias: fc]", "`ticket.forceclose [reason]`")
    .addField("ADMIN | Renombrar un Ticket [Alias: rn]", "`ticket.rename [name]`")
    .addField("ADMIN | Agotar el tiempo de un ticket [Alias: to]", "`ticket.timeout`")
    .addField("ADMIN | Configurar temas de tickets [Alias: s]", "`ticket.set [1 - 5] [Topic]`")
    .addField("ADMIN | Configurar el servidor [Alias: su]", "`ticket.setup`")
    .setColor("#e64b0e")
    message.channel.send(embed)




}

module.exports.help = {
  name:"help",
  aliases: ["ayuda"]
}