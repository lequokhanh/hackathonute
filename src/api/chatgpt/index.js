const route = require("express").Router();
const chatgptController = require("./chatgptController");

route.post("/chat", chatgptController.chat);

module.exports = route;
