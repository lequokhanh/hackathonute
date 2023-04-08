const { AppError } = require("../../common/errors/AppError");
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
	chat: async (message) => {
		try {
			const configuration = new Configuration({
				apiKey: process.env.OPENAI_API_KEY,
			});
			console.log(process.env.OPENAI_API_KEY);
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
			console.log(error);
			throw new AppError(500, error);
		}
	},
};
