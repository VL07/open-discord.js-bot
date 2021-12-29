const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const getMember = require("../../../../lib/getMember");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("set")
		.setDescription("Warn a member")
		.addUserOption(option =>
			option
				.setName("member")
				.setDescription("The user to set warnings to")
				.setRequired(true),
		)
		.addIntegerOption(option =>
			option
				.setName("warnings")
				.setDescription("How many warnings the user should have")
				.setRequired(true),
		),
	permissions: ["KICK_MEMBERS"],
	async execute(interaction) {
		const member = interaction.options.getMember("member");

		const memberDb = await getMember(member);

		const warnings = interaction.options.getInteger("warnings");

		memberDb.warns = warnings;

		if (warnings < 0) {
			memberDb.warns = 0;
		}

		try {
			await memberDb.save();
		} catch (err) {
			console.error(err);
			throw "error";
		}

		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("⚠️ | Successfully Warned")
			.setDescription(`Successfully set <@${member.user.id}> warnings, so the user now has \`${memberDb.warns}\` warnings`)
			.setTimestamp()
			.setFooter("Use /help to get help");

		await interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};