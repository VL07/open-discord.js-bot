const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Warn a member"),
	permissions: ["KICK_MEMBERS"],
};