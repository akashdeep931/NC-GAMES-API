const {
  selectCategories,
  selectReviewById,
} = require("../models/get.models.js");

exports.getCategories = (req, res) => {
  selectCategories().then((data) => {
    res.status(200).send(data);
  });
};

exports.getReviewsById = (req, res, next) => {
  const { reviews_id } = req.params;

  selectReviewById(reviews_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
