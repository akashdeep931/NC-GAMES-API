const {
  selectCategories,
  selectReviewById,
  selectReviews,
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

exports.getReviews = (req, res, next) => {
  selectReviews().then((data) => {
    res.status(200).send({ reviews: data });
  });
};
