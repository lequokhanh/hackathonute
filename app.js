const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./src/api");
const mongoose = require("mongoose");

require("dotenv").config();
const logger = require("morgan");

const port = process.env.PORT || 5000;
app.use(cors({
	credentials: true,
	origin: ["http://localhost:3000"],
}));
app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
const corsConfig = {
	credentials: true,
	origin: ["http://localhost:3000"],
};

const DB = process.env.DATABASE.replace(
	"<USERNAME>",
	process.env.DATABASE_USERNAME
)
	.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
	.replace("<DB_NAME>", process.env.DATABASE_NAME);
mongoose
	.connect(DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("DB connection successful!"))
	.catch((err) => console.log(err));
app.use(cors(corsConfig));
app.use("/api", api);
=======
>>>>>>> a534e77ad955a936231739da7557702299e05a06
app.use((error, req, res, next) => {
	let { statusCode, message } = error;

	statusCode = statusCode ? statusCode : 500;

	res.status(statusCode).json({
		statusCode,
		message,
	});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
