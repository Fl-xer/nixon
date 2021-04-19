const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    category: "Moderation",
    description: "Bans a member from the server",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const member = message.mentions.users.first();
            if (!member) {
                return message.channel.send('**Please mention a user**')
            }
            if (member) {
                message.delete()
                let reason = args.slice(2).join(' ');
                if (!reason) reason = 'None';
                if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
                const memberTarget = message.guild.members.cache.get(member.id);
                const embed1 = new MessageEmbed()
                    .setAuthor(`${member.username} was banned`, member.displayAvatarURL())
                    .setDescription(`**Reason:** ${reason}`)
                memberTarget.ban({ reason: reason });
                message.channel.send(embed1);
            }
        } catch (err) {
            return message.channel.send(`**An error occurred:** \`${err}\``)
        }
    }
}