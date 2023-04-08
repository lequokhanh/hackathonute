const { AppError } = require("../../common/errors/AppError");
const { Configuration, OpenAIApi } = require("openai");
module.exports = {
	getJob: async (body) => {
		try {
			const configuration = new Configuration({
				apiKey: process.env.OPENAI_API_KEY,
			});
			const openai = new OpenAIApi(configuration);
			const prePromptText =
				"liệt kê 5 tên nghề nghiệp (chỉ liệt kê tên nghề nghiệp, mỗi tên nghề nghiệp đặt trong 2 dấu @, không mô tả nghề nghiệp) với các yêu cầu sau:";
			const completion = await openai.createCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content:
							prePromptText +
							JSON.stringify(body)
								.replace("{", "")
								.replace("}", "")
								.replace('"', ""),
					},
				],
			});
			console.log(completion);
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
	chat: async (message) => {
		try {
			const configuration = new Configuration({
				apiKey: process.env.OPENAI_API_KEY,
			});
			const openai = new OpenAIApi(configuration);
			const completion = await openai.createCompletion({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: message }],
			});
			console.log(completion);
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
