const chatgptService = require("./chatgpt.service");

module.exports = {
	getJob: async (req, res, next) => {
		try {
			const DTO = await chatgptService.getJob(req.body);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	chat: async (req, res, next) => {
		try {
			const message = req.body.message;
			const DTO = await chatgptService.chat(message);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	confide: async (req, res, next) => {
		try {
			const message = req.body.message;
			const DTO = await chatgptService.confide(message);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
};
