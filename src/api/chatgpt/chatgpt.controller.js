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
			let userID;
			if (!req.user) userID = null;
			else userID = req.user._id;
			const message = req.body.message;
			const DTO = await chatgptService.chat(req.body, userID);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	confide: async (req, res, next) => {
		try {
			let userID;
			if (!req.user) userID = null;
			else userID = req.user._id;
			const DTO = await chatgptService.confide(req.body, userID);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
	solve: async (req, res, next) => {
		try {
			let userID;
			if (!req.user) userID = null;
			else userID = req.user._id;
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
			const category = req.params.category;
			const userID = req.user._id;
			const DTO = category
				? await chatgptService.getConservationByCategory(
						category,
						userID
				  )
				: await chatgptService.getConservation(userID);
			res.status(DTO.statusCode).send(DTO);
		} catch (error) {
			next(error);
		}
	},
};
