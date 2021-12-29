const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("timeout")
		.setDescription("Timeout a member"),
	category: "moderation",
	permissions: ["TIMEOUT_MEMBERS"],
};