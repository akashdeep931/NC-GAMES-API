const express = require("express");
const {
  getCategories,
  getReviewsById,
  getReviews,
  getCommentsById,
} = require("./controllers/get.controllers.js");
const { postComment } = require("./controllers/post.controllers.js");
const {
  incorrectPathError,
  handleCustomErrors,
  handlePsqlErrors,
} = require("./errors/errorHandlers.js");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:reviews_id", getReviewsById);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id/comments", getCommentsById);

app.post("/api/reviews/:review_id/comments", postComment);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.all("/*", incorrectPathError);

module.exports = app;
