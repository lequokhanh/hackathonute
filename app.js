const express = require("express");
const app = express();
const port = 3000;
const api = require("./src/api");

// Add the API as a child of the main app.
app.use("/api", api);

// Start the app.
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
