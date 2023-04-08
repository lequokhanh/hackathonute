const { AppError } = require("../../common/errors/AppError");
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
	chat: async (message) => {
		try {
			const configuration = new Configuration({
				apiKey: "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",
			});
			const openai = new OpenAIApi(configuration);
			const completion = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: message }],
			});
			const completion_text = completion.data.choices[0].message.content;
			return {
				statusCode: 200,
				message: "Get message completed",
				data: completion_text,
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},
};
