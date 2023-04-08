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
			const DTO = await chatgptService.chat(req.body, userID);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	confide: async (req, res, next) => {
		try {
			const userID = req.user._id;
			const DTO = await chatgptService.confide(req.body, userID);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	solve: async (req, res, next) => {
		try {
			const { question, subject } = req.body;
			const DTO = await chatgptService.solve(req.body, userID);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	getQuestionRelated: async (req, res, next) => {
		try {
			const { question, subject } = req.body;
			const DTO = await chatgptService.getQuestionRelated(req.body);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	getConservation: async (req, res, next) => {
		try {
			const userID = req.user._id;
			const DTO = await chatgptService.getConservation(userID);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
};
