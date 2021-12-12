const Discord = require('discord.js');
const db = require('quick.db');
const ms = require("parse-ms");
const randomstring = require("randomstring");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('ticket.'))return;  

    let permcheck = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`No tienes permiso para esto xd`)

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(permcheck)

    let argcheck = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription(`Elija un número del 1 al 5 para establecer un motivo`)

    if(!args[0]) return message.channel.send(argcheck)

  let permembed = new Discord.RichEmbed()
  .setColor('#e64b0e')
  .setDescription(`Error. No tengo para ejecutar el comando`)

  if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(permembed);

  if (args[0].toLowerCase() == '1') {

    let filterembed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription('Ingrese un motivo del ticket')

        if(!args[1]) return message.channel.send(filterembed)

        db.set(`${message.guild.id}-topic1`, args.join(" ").slice(2))
        
        let completeembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription(`\`${args.join(" ").slice(2)}\` Se ha establecido como motivo 1`)


        message.channel.send(completeembed)
    

} else if(args[0].toLowerCase() == '2') {

    let filterembed = new Discord.RichEmbed()
    .setColor('#e64b0e')
    .setDescription('Ingrese un motivo del ticket')

        if(!args[1]) return message.channel.send(filterembed)

        db.set(`${message.guild.id}-topic2`, args.join(" ").slice(2))
        
        let completeembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription(`\`${args.join(" ").slice(2)}\` Se ha establecido como motivo 2`)


        message.channel.send(completeembed)

    } else if(args[0].toLowerCase() == '3') {

        let filterembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription('Ingrese un motivo del ticket')
    
            if(!args[1]) return message.channel.send(filterembed)
    
            db.set(`${message.guild.id}-topic3`, args.join(" ").slice(2))
            
            let completeembed = new Discord.RichEmbed()
            .setColor('#e64b0e')
            .setDescription(`\`${args.join(" ").slice(2)}\` Se ha establecido como motivo 3`)
    
    
            message.channel.send(completeembed)

    } else if(args[0].toLowerCase() == '4') {

        let filterembed = new Discord.RichEmbed()
        .setColor('#e64b0e')
        .setDescription('Ingrese un motivo del ticket')
    
            if(!args[1]) return message.channel.send(filterembed)
    
            db.set(`${message.guild.id}-topic4`, args.join(" ").slice(2))
            
            let completeembed = new Discord.RichEmbed()
            .setColor('#e64b0e')
            .setDescription(`\`${args.join(" ").slice(2)}\` Se ha establecido como motivo 4`)
    
    
            message.channel.send(completeembed)
    
        } else if(args[0].toLowerCase() == '5') {

            let filterembed = new Discord.RichEmbed()
            .setColor('#e64b0e')
            .setDescription('Ingrese un motivo del ticket')
        
                if(!args[1]) return message.channel.send(filterembed)
        
                db.set(`${message.guild.id}-topic5`, args.join(" ").slice(2))
                
                let completeembed = new Discord.RichEmbed()
                .setColor('#e64b0e')
                .setDescription(`\`${args.join(" ").slice(2)}\` Se ha establecido como motivo 5`)
        
        
                message.channel.send(completeembed)
        
        }
}

module.exports.help = {
    name:"set",
    aliases: ["ss"]
  }