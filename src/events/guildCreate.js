const Guild = require("../models/guild");

module.exports = {
	name: "guildCreate",
	once: false,
	async execute(guild) {
		Guild.findOne({ "id": guild.id })
			.then((result) => {
				console.log(result);
				if (!result) {
					const guildDb = new Guild({
						id: guild.id,
					});
					guildDb.save()
						.then((saveResult) => {
							console.log(saveResult);
						})
						.catch((err) => {
							console.error(err);
						});
				}
			})
			.catch((err) => {
				console.error(err);
			});
	},
};