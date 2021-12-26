const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Get the bots latency"),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor("2F3136")
			.setTitle("🏓 | Ping")
			.setDescription(`Latency is \`loading...\`.\nAPI Latency is \`${Math.round(interaction.client.ws.ping)}ms\``)
			.setTimestamp()
			.setFooter("Use /help to get help");

		const message = await interaction.channel.send({ embeds: [embed], fetchReply: true });

		embed
			.setDescription(`Latency is \`${message.createdTimestamp - interaction.createdTimestamp}ms\`\nAPI Latency is \`${Math.round(interaction.client.ws.ping)}ms\``);

		await message.delete();
		await interaction.reply({ embeds: [embed] });
	},
};