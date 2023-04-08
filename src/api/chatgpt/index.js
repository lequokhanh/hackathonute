const route = require("express").Router();
const chatgptController = require("./chatgpt.controller");
const { verifyToken } = require("../../middlewares/verifyToken");

route.post("/getjob", chatgptController.getJob);
route.post("/chat", verifyToken, chatgptController.chat);
route.post("/confide", verifyToken, chatgptController.confide);
route.post("/solve", verifyToken, chatgptController.solve);
route.post("/question", chatgptController.getQuestionRelated);
module.exports = route;
