const route = require("express").Router();
const chatgptController = require("./chatgpt.controller");

route.post("/getjob", chatgptController.getJob);
route.post("/chat", chatgptController.chat);
route.post("/confide", chatgptController.confide);
module.exports = route;
