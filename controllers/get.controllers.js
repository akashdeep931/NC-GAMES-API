const { selectCategories } = require("../models/get.models.js");

exports.getCategories = (req, res) => {
  selectCategories().then((response) => {
    res.status(200).send(response);
  });
};
