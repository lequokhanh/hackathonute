const route = require("express").Router();
const chatgptController = require("./chatgpt.controller");

route.post("/getjob", chatgptController.getJob);

module.exports = route;
