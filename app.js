const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const api = require("./src/api");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add the API as a child of the main app.
app.use("/api", api);
// Start the app.
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
