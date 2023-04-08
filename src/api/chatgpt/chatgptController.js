const chatgptService = require("./chatgptService");

module.exports = {
	chat: async (req, res, next) => {
		try {
			const message = req.query.message;
			const DTO = chatgptService.chat(message);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
};
