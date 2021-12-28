const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("timeout")
		.setDescription("Timeout a member"),
	permissions: ["TIMEOUT_MEMBERS"],
};