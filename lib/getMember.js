const Member = require("../src/models/member");

module.exports = async (member) => {
	try {
		const result = await Member.findOne({ id: member.id, guild: member.guild.id });

		console.log("res", result);
		if (!result) {
			console.log("adding member");
			const memberDb = new Member({
				id: member.id,
				guild: member.guild.id,
				warns: result ? result.warns : 0,
			});
			try {
				await memberDb.save();
				return memberDb;
			} catch (err) {
				console.error(err);
			}
		}
		return result;
	} catch (err) {
		console.error(err);
	}
};