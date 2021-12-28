const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("remove")
		.setDescription("Timeout a member")
		.addUserOption(option =>
			option
				.setName("member")
				.setDescription("The user to remove the timeout from")
				.setRequired(true),
		),
	permissions: ["TIMEOUT_MEMBERS"],
	async execute(interaction) {
		const user = interaction.options.getMember("member");
		if (!user.communicationDisabledUntilTimestamp || user.communicationDisabledUntilTimestamp < Date.now()) {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription(`<@${user.id}> is not timed out`)
				.setTimestamp()
				.setFooter("Use /help to get help");

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});

			return;
		}

		try {
			await user.disableCommunicationUntil(Date.now(), "Removed timeout");
		} catch (err) {
			console.log(err);
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription(`Couldn't remove the timeout from <@${user.id}>`)
				.setTimestamp()
				.setFooter("Use /help to get help");

			interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
			return;
		}

		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("⏳ | Successfully Timed Out")
			.setDescription(`Successfully removed the time out from <@${user.id}>`)
			.setTimestamp()
			.setFooter("Use /help to get help");

		interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};