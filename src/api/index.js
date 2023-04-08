const route = require("express").Router();
const chatgpt = require("./chatgpt");
const auth = require("./auth");
route.use("/chatgpt", chatgpt);
route.use("/auth", auth);
module.exports = route;
