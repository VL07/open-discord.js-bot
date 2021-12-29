const Guild = require("../models/guild");

module.exports = {
	name: "guildCreate",
	once: false,
	async execute(guild) {
		try {
			const result = await Guild.findOne({ "id": guild.id });
			if (!result) {
				const guildDb = new Guild({
					id: guild.id,
				});
				try {
					await guildDb.save();
				} catch (err) {
					console.error(err);
				}
			}
		} catch (err) {
			console.error(err);
		}
	},
};