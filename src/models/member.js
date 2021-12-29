const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	guild: {
		type: String,
		required: true,
	},
	warns: {
		type: Number,
		required: true,
	},
});

const Member = mongoose.model("member", MemberSchema);
module.exports = Member;