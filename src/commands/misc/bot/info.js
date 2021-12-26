const { SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("info")
		.setDescription("Get info about the bot"),
	async execute(interaction) {
		let creator = "764470169602359317";

		try {
			const user = await interaction.guild.members.fetch(creator);
			if (user) {
				creator = "<@" + creator + ">";
			}
		} catch (err) {
			creator = "VL07";
		}

		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("ℹ️ | Info")
			.setDescription("Information about the bot")
			.setTimestamp()
			.setFooter("Use /help to get help")
			.setThumbnail(interaction.client.user.displayAvatarURL())
			.addFields(
				{ name: "Name", value: interaction.client.user.username || "CatTheBot", inline: true },
				{ name: "Creator", value: `${creator}, [contributors](https://github.com/VL07/open-discord.js-bot/graphs/contributors)`, inline: true },
				{ name: "Created", value: `<t:${Math.round(interaction.client.user.createdTimestamp / 1000)}:F>`, inline: false },
				{ name: "Id", value: "" + interaction.client.user.id, inline: true },
				{ name: "Servers", value: "" + interaction.client.guilds.cache.size, inline: true },
			);
		interaction.reply({ embeds: [embed] });
	},
};