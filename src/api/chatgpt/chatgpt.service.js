const { AppError } = require("../../common/errors/AppError");
const axios = require("axios");
const openAI = axios.create({
	baseURL: "https://api.openai.com/v1/",
});
module.exports = {
	getJob: async (body) => {
		try {
			const prePromptText =
				"liệt kê 5 tên nghề nghiệp (chỉ liệt kê tên nghề nghiệp, mỗi tên nghề nghiệp đặt trong 2 dấu @, không mô tả nghề nghiệp) với các yêu cầu sau:";
			const completion = await openAI.post(
				"/chat/completions",
				{
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
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
				}
			);

			console.log(completion);
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
	chat: async (message) => {
		try {
			const completion = await openAI.post(
				"/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "user",
							content: message,
						},
					],
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
				}
			);
			// console.log(completion);
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
	confide: async (message) => {
		try {
			const completion = await openAI.post(
				"/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "user",
							content:
								message +
								"hãy cho tôi lời khuyên dưới góc độ là 1 chuyên gia tâm lý",
						},
					],
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
				}
			);
			// console.log(completion);
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
