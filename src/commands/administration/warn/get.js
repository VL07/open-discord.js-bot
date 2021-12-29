const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const getMember = require("../../../../lib/getMember");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("get")
		.setDescription("Get how many warns a member has")
		.addUserOption(option =>
			option
				.setName("member")
				.setDescription("The user to warn")
				.setRequired(true),
		),
	permissions: ["KICK_MEMBERS"],
	async execute(interaction) {
		const member = interaction.options.getMember("member");

		const memberDb = await getMember(member);

		console.log("result", memberDb)

		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("⚠️ | Successfully Got Warnings")
			.setDescription(`<@${member.user.id}> has \`${memberDb.warns}\` Warnings`)
			.setTimestamp()
			.setFooter("Use /help to get help");

		await interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};