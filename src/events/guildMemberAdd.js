const Member = require("../models/member");

module.exports = {
	name: "guildMemberAdd",
	once: false,
	async execute(member) {
		console.log("member added");
		Member.findOne({ id: member.id })
			.then((result) => {
				const memberDb = new Member({
					id: member.id,
					guild: member.guild.id,
					warns: result ? result.warns : 0,
				});
				memberDb.save(function(err) {
					if (err) console.error(err); return ;
				});
			})
			.catch((err) => {
				console.error(err);
			});
	},
};