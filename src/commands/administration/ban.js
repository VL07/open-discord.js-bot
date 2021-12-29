const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a member")
		.addUserOption(option =>
			option
				.setName("member")
				.setDescription("The user to ban")
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName("reason")
				.setDescription("description")
				.setRequired(false),
		),
	category: "moderation",
	permissions: ["BAN_MEMBERS"],
	async execute(interaction) {
		const user = interaction.options.getMember("member");
		if (!user.bannable) {
			const embed = new MessageEmbed()
				.setColor("2F3136")
				.setTitle("❌ | Error")
				.setDescription(`Couldn't ban \`${user.user.username}\``)
				.setTimestamp()
				.setFooter("Use /help to get help");

			interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
			return;
		}
		const reason = interaction.options.getString("reason");

		await user.ban({ reason: reason || "No reason specified" });

		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("🔨 | Successfully Banned")
			.setDescription(`Successfully banned \`${user.user.username}\` with the reason \`${reason || "No reason specified"}\``)
			.setTimestamp()
			.setFooter("Use /help to get help");

		interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};