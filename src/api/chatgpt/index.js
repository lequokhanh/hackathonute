const route = require("express").Router();
const chatgptController = require("./chatgpt.controller");

route.post("/chat", chatgptController.chat);

module.exports = route;
