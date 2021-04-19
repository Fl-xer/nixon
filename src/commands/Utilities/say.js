const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    category: "Utilities",
    description: "Has the bot say something",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const errorEmbed1 = new MessageEmbed()
        .setColor('#F30B04')
        .setDescription(`**You are not allowed to mention** \`@everyone\` **or** \`@here\``)

        const errorEmbed2 = new MessageEmbed()
        .setColor('#F30B04')
        .setDescription(`**Please provide something to say!**`)

        if (message.content.includes("@everyone") || (message.content.includes("@here")))  return message.channel.send(errorEmbed1);
        if(!message.member.permissions.has('SEND_MESSAGES')) return;
        if (!args[0]) return message.channel.send(errorEmbed2);
        message.delete();
            msg = args.slice(0).join(" ");
            message.channel.send(msg)

        }
    }