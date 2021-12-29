const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Kick a member")
		.addUserOption(option =>
			option
				.setName("member")
				.setDescription("The user to kick")
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName("reason")
				.setDescription("description")
				.setRequired(false),
		),
	permissions: ["KICK_MEMBERS"],
	async execute(interaction) {
		const user = interaction.options.getMember("member");
		if (!user.kickable) {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription(`Couldn't kick \`${user.user.username}\``)
				.setTimestamp()
				.setFooter("Use /help to get help");

			interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
			return;
		}
		const reason = interaction.options.getString("reason");

		await user.kick({ reason: reason || "No reason specified" });

		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("🔨 | Successfully Kicked")
			.setDescription(`Successfully kicked \`${user.user.username}\` with the reason \`${reason || "No reason specified"}\``)
			.setTimestamp()
			.setFooter("Use /help to get help");

		interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};