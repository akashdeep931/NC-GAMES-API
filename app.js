const express = require("express");
const { getCategories, getReviewsById } = require("./controllers/get.controllers.js");
const { handleCustomErrors, incorrectPathError } = require("./errors/errorHandlers.js");

const app = express();

app.all("/*", incorrectPathError);

app.get("/api/categories", getCategories);

// app.get("/api/reviews/:reviews_id", getReviewsById);

// app.use(handleCustomErrors);

module.exports = app;
