const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const historySchema = new Schema({
	messages: [
		{
			role: {
				type: String,
				enum: ["user", "assistant"],
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		enum: ["confide", "solve", "general"],
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("History", historySchema);
