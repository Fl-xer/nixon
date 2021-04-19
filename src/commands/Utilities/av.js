const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    category: "Utilities",
    description: "Displays somebody's avatar",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        message.channel.send(
            new MessageEmbed()
                .setFooter(`${user.tag}'s avatar!`)
                .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))

        )

    }
}