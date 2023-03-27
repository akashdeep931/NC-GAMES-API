const express = require("express");
const { getCategories } = require("./controllers/get.controllers.js");

const app = express();

app.get("/api/categories", getCategories);

module.exports = app;
