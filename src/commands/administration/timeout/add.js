const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const timestring = require("timestring");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("add")
		.setDescription("Timeout a member")
		.addUserOption(option =>
			option
				.setName("member")
				.setDescription("The user to ban")
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName("time")
				.setDescription("For how long should the user be timed out")
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName("reason")
				.setDescription("description")
				.setRequired(false),
		),
	permissions: ["TIMEOUT_MEMBERS"],
	async execute(interaction) {
		const user = interaction.options.getMember("member");
		if (user.communicationDisabledUntilTimestamp > Date.now()) {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription(`<@${user.id}> is already timed out until <t:${Math.round(user.communicationDisabledUntilTimestamp / 1000)}:F>`)
				.setTimestamp()
				.setFooter("Use /help to get help");

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});

			return;
		}
		const time = interaction.options.getString("time");

		let timeInSec = 0;
		try {
			timeInSec = timestring(time);
		} catch {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription(`\`${time}\` is not the correct format\nExamples:\`1h, 5m, 100s, 10d\``)
				.setTimestamp()
				.setFooter("Use /help to get help");

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});

			return;
		}

		const reason = interaction.options.getString("reason");
		try {
			await user.timeout(timeInSec * 1000, reason || "No reason specified");
		} catch (err) {
			console.log(err);
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription(`Couldn't timeout <@${user.id}>`)
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
			.setDescription(`Successfully timed out <@${user.id}> with the reason \`${reason || "No reason specified"}\` until <t:${Math.round((Date.now() + timeInSec) / 1000)}:F>`)
			.setTimestamp()
			.setFooter("Use /help to get help");

		interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};