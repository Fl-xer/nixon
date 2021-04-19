const { Client, Message, MessageEmbed } = require('discord.js');
const giveawayClient = require('../../client');

module.exports = {
    name: 'reroll',
    category: "Giveaway",
    description: "Reroll a giveaway winner.",
    cooldown: 0,
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply("You don't have perms");

        if(!args[0]) return message.reply("Please provide the message id from the giveaway");

        giveawayClient.reroll(args[0]);
    }
}