const express = require("express");
const { getCategories } = require("./controllers/get.controllers.js");
const { handleCustomErrors } = require("./errors/errorHandlers.js");

const app = express();

app.get("/api/categories", getCategories);

app.use(handleCustomErrors);

module.exports = app;
