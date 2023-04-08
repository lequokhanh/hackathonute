const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./src/api");
require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

const corsConfig = {
	credentials: true,
	origin: ["http://localhost:3000"],
};

app.use(cors(corsConfig));
app.use((error, req, res, next) => {
	let { statusCode, message } = error;

	statusCode = statusCode ? statusCode : 500;

	res.status(statusCode).json({
		statusCode,
		message,
	});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
