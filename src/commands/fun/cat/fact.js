const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("fact")
		.setDescription("Facts about cats"),
	async execute(interaction) {
		fetch("https://some-random-api.ml/facts/cat")
			.then(response => response.json())
			.then(data => {
				const embed = new MessageEmbed()
					.setColor("2F3136")
					.setTitle("🐈 | Cat")
					.setDescription(data.fact)
					.setTimestamp()
					.setFooter("Use /help to get help");

				interaction.reply({ embeds: [embed] });
			})
			.catch(err => {
				throw err;
			});
	},
};