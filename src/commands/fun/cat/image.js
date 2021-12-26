const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("image")
		.setDescription("An image of a cat"),
	async execute(interaction) {
		fetch("https://some-random-api.ml/img/cat")
			.then(response => response.json())
			.then(data => {
				const embed = new MessageEmbed()
					.setColor("2F3136")
					.setTitle("🐈 | Cat")
					.setDescription("\u200b")
					.setTimestamp()
					.setFooter("Use /help to get help")
					.setImage(data.link);

				interaction.reply({ embeds: [embed] });
			})
			.catch(err => {
				throw err;
			});
	},
};