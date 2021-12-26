const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("Delete the latest messages in this channel")
		.addIntegerOption(option =>
			option
				.setName("amount")
				.setDescription("The amount of messages you want to delete")
				.setRequired(true),
		),
	permissions: ["MANAGE_MESSAGES"],
	async execute(interaction) {
		const amount = interaction.options.getInteger("amount");

		if (amount > 100) {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription("The maximum amount of messages you can delete at once is `100`")
				.setTimestamp()
				.setFooter("Use /help to get help");

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
			return;
		}

		const { size } = await interaction.channel.bulkDelete(amount, true);

		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("🗑 | Successfully Purged Messages")
			.setDescription(`Successfully deleted \`${size}\` messages`)
			.setTimestamp()
			.setFooter("Use /help to get help");

		interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};