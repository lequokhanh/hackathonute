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
};
