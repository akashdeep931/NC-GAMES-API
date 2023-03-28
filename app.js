const express = require("express");
const {
  getCategories,
  getReviewsById,
  getReviews,
} = require("./controllers/get.controllers.js");
const {
  incorrectPathError,
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors/errorHandlers.js");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:reviews_id", getReviewsById);
app.get("/api/reviews", getReviews);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);

app.all("/*", incorrectPathError);

module.exports = app;
