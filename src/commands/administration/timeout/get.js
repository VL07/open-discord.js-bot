const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("get")
		.setDescription("Get to know if a member is timed out")
		.addUserOption(option =>
			option
				.setName("member")
				.setDescription("The user to get info about")
				.setRequired(true),
		),
	async execute(interaction) {
		const user = interaction.options.getMember("member");
		if (!user.communicationDisabledUntilTimestamp || user.communicationDisabledUntilTimestamp < Date.now()) {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("⏳ | Timeout")
				.setDescription(`<@${user.id}> is not timed out`)
				.setTimestamp()
				.setFooter("Use /help to get help");

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
		} else {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("⏳ | Timeout")
				.setDescription(`<@${user.id}> is timed out until <t:${Math.round((user.communicationDisabledUntilTimestamp) / 1000)}:F>`)
				.setTimestamp()
				.setFooter("Use /help to get help");

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
		}
	},
};