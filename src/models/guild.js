const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
});

const Guild = mongoose.model("guild", guildSchema);
module.exports = Guild;