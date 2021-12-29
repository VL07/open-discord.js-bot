const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("I'm a robot cat"),
	category: "fun",
	async execute(interaction) {
		interaction.reply("Cat");
	},
};