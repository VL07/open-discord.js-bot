const mongoose = require("mongoose");

const connect = (key) => {
	mongoose
		.connect(key, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connected to db");
		})
		.catch((err) => {
			console.error(err);
		});
};
exports.connect = connect;