const { AppError } = require("../../common/errors/AppError");
const axios = require("axios");
const historyModel = require("../../models/historyModel");
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
	chat: async ({ message, id }, userID) => {
		try {
			let messages = [];
			if (id) {
				const history = await historyModel.findById(id);
				messages = history.messages;
			}
			messages.push({
				role: "user",
				content: message,
			});
			const completion = await openAI.post(
				"/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages,
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
			if (userID) {
				let history;
				if (!completion_text)
					throw new AppError(
						500,
						"OpenAI API error, please try again"
					);
				else {
					if (!id)
						history = historyModel.create({
							message: [
								{
									role: "user",
									content: message,
								},
								{
									role: "assistant",
									content: completion_text,
								},
							],
							category: "chat",
							user: userID,
						});
					else {
						history = await historyModel.findByIdAndUpdate(
							id,
							{
								$push: {
									message: [
										{
											role: "user",
											content: message,
										},
										{
											role: "assistant",
											content: completion_text,
										},
									],
								},
							},
							{ new: true }
						);
					}
				}
				return {
					statusCode: 200,
					message: "Get message completed",
					data: completion_text,
					id: history._id,
				};
			}
			return {
				statusCode: 200,
				message: "Get message completed",
				data: completion_text,
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},
	confide: async ({ message, id }, userID) => {
		try {
			let messages = [];
			if (id) {
				const history = await historyModel.findById(id);
				messages = history.messages;
			}
			messages.push({
				role: "user",
				content:
					message +
					"hãy cho tôi lời khuyên dưới góc độ là 1 chuyên gia tâm lý",
			});
			const completion = await openAI.post(
				"/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
				}
			);
			const completion_text = completion.data.choices[0].message.content;
			if (userID) {
				let history;
				if (!completion_text)
					throw new AppError(
						500,
						"OpenAI API error, please try again"
					);
				else {
					if (!id)
						history = historyModel.create({
							messages: [
								{
									role: "user",
									content: message,
								},
								{
									role: "assistant",
									content: completion_text,
								},
							],
							user: userID,
						});
					else {
						history = await historyModel.findByIdAndUpdate(
							id,
							{
								$push: {
									messages: [
										{
											role: "user",
											content: message,
										},
										{
											role: "assistant",
											content: completion_text,
										},
									],
								},
							},
							{ new: true }
						);
					}
				}
				return {
					statusCode: 200,
					message: "Get message completed",
					data: completion_text,
					id: history._id,
				};
			}
			return {
				statusCode: 200,
				message: "Get message completed",
				data: completion_text,
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},
	solve: async ({ question, subject, id }, userID) => {
		try {
			let messages = [];
			if (id) {
				const history = await historyModel.findById(id);
				messages = history.messages;
			}
			messages.push({
				role: "user",
				content:
					"Cho tôi cách làm và các lý thuyết liên quan đến câu hỏi sau: " +
					question +
					"trong môn học: " +
					subject,
			});
			const completion = await openAI.post(
				"/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
				}
			);
			const completion_text = completion.data.choices[0].message.content;
			if (userID) {
				let history;
				if (!completion_text)
					throw new AppError(
						500,
						"OpenAI API error, please try again"
					);
				else {
					if (!id)
						history = historyModel.create({
							messages: [
								{
									role: "user",
									content: question,
								},
								{
									role: "assistant",
									content: completion_text,
								},
							],
							category: "solve",
							user: userID,
						});
					else {
						history = await historyModel.findByIdAndUpdate(
							id,
							{
								$push: {
									messages: [
										{
											role: "user",
											content: question + "||" + subject,
										},
										{
											role: "assistant",
											content: completion_text,
										},
									],
								},
							},
							{ new: true }
						);
					}
				}
				return {
					statusCode: 200,
					message: "Get message completed",
					data: completion_text,
					id: history._id,
				};
			}
			return {
				statusCode: 200,
				message: "Get message completed",
				data: completion_text,
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},
	getQuestionRelated: async ({ question, subject }) => {
		try {
			const completion = await openAI.post(
				"/chat/completions",
				{
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "user",
							content:
								"Cho tôi các bài tập có cùng dạng với câu sau:" +
								question +
								"trong môn học: " +
								subject,
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
	getConservation: async (id) => {
		try {
			const history = await historyModel.findById(id);
			return {
				statusCode: 200,
				message: "Get message completed",
				data: history.messages,
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},
	getConservationByCategory: async (category, id) => {
		try {
			const history = await historyModel.findById(id);
			const messages = history.messages.filter(
				(message) => message.role === category
			);
			return {
				statusCode: 200,
				message: "Get message completed",
				data: messages,
			};
		} catch (error) {
			throw new AppError(500, error.message);
		}
	},
};
