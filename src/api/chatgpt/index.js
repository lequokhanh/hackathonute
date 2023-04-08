const route = require("express").Router();
const chatgptController = require("./chatgpt.controller");
const { verifyToken } = require("../../middlewares/verifyToken");
const { verifyTokenRequire } = require("../../middlewares/verifyTokenRequire");
route.post("/getjob", chatgptController.getJob);
route.post("/getjobdetail", chatgptController.getJobDetail);
route.post("/chat", verifyToken, chatgptController.chat);
route.post("/confide", verifyToken, chatgptController.confide);
route.post("/solve", verifyToken, chatgptController.solve);
route.post("/question", chatgptController.getQuestionRelated);
route.get(
	"/conservation/:category",
	verifyTokenRequire,
	chatgptController.getConservation
);
module.exports = route;
