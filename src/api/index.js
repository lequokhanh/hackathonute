const route = require("express").Router();
const chatgpt = require("./chatgpt");

route.use("/chatgpt", chatgpt);

module.exports = route;
