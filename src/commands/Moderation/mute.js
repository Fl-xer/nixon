const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')
module.exports = {
    name: 'mute',
    category: "Moderation",
    description: "Mutes a member",
    cooldown: 0,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
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
                if (!args[1]) {
                    memberTarget.roles.add(muteRole.id);
                    const embed1 = new MessageEmbed()
                        .setAuthor(`${target.username} was muted`, target.displayAvatarURL())
                        .setFooter('Time muted')
                        .setTimestamp()
                    message.channel.send(embed1);
                    return
                }

                memberTarget.roles.add(muteRole.id);
                const embed2 = new MessageEmbed()
                    .setAuthor(`${target.username} was muted`, target.displayAvatarURL())
                    .setDescription(`**Time:** ${ms(ms(args[1]))}`)
                message.channel.send(embed2);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                    const embed3 = new Discord.MessageEmbed()
                        .setAuthor(`${target.username} was unmuted`, target.displayAvatarURL())
                    message.channel.send(embed3);
                }, ms(args[1]));
            } else {
                const errorEmbed1 = new MessageEmbed()
                    .setColor('#F30B04')
                    .setDescription(`**Could not find that member. Please mention the user that you want to mute**`)
                message.channel.send(errorEmbed1);
            }
        } catch (err) {
            return message.channel.send(`**An error occurred:** \`${err}\``)
        }
    }
}