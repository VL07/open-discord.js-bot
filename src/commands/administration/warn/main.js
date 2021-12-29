const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Warn a member"),
	category: "moderation",
	permissions: ["KICK_MEMBERS"],
};