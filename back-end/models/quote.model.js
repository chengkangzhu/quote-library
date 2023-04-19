const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
	quote: {
		type: String,
		required: true,
	},
	quoter: {
		type: String,
		required: true,
	},
	user_id: {
		type: String,
		required: true,
	},
});

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;
