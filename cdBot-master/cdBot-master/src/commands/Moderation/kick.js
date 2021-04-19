const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    category: "Moderation",
    description: "Kicks a member from the server",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const target = message.mentions.users.first();
            if (!target) {
                return message.channel.send('**Please mention a member**')
            }
            if (target) {
                message.delete()
                const memberTarget = message.guild.members.cache.get(target.id);
                const reason = args.slice(1).join(' ') || "No reason provided";
                const embed1 = new MessageEmbed()
                    .setAuthor(`${target.username} was kicked`, target.displayAvatarURL())
                    .setDescription(`**Reason:** ${reason}`)

                memberTarget.kick();
                message.channel.send(embed1);

            }
        } catch (err) {
            return message.channel.send(`**An error occurred:** \`${err}\``)
        }
    }
}