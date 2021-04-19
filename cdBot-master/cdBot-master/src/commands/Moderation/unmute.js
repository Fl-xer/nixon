const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    category: "Moderation",
    description: "Unmutes a member",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
        const errorEmbed = new MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Please specify the user**`)
        try {
            const target = message.mentions.users.first();
            if (target) {

                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                if (!muteRole) {
                    const errorEmbed = new MessageEmbed()
                        .setColor('#F30B04')
                        .setDescription(`**No mute role found. I just created one for you called** \`Muted\`. **(Please rerun this command once you are ready)**`)
                    muteRole = await message.guild.roles.create({
                        data: {
                            name: "Muted",
                            color: "#49515a",
                            permissions: []
                        }
                    });

                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muteRole, {
                            SEND_MESSAGES: false,
                            MANAGE_MESSAGES: false,
                            READ_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                    return message.channel.send(errorEmbed)
                }
                let memberTarget = message.guild.members.cache.get(target.id);
                message.delete()
                memberTarget.roles.remove(muteRole.id);

                const embed3 = new MessageEmbed()
                    .setAuthor(`${target.username} was unmuted`, target.displayAvatarURL())
                message.channel.send(embed3);
            } else {
                message.channel.send(errorEmbed);
            }
        } catch (err) {
            return message.channel.send(`**An error occurred:** \`${err}\``)
        }
    }
}