const chatgptService = require("./chatgpt.service");

module.exports = {
	chat: async (req, res, next) => {
		try {
			const { message } = req.body;
			const DTO = await chatgptService.chat(message);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
};
