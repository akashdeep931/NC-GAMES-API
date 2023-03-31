const {
  selectCategories,
  selectReviewById,
  selectReviews,
  selectComentsById,
  checkReviewExists,
  selectUsers,
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

exports.getReviews = (req, res) => {
  selectReviews().then((data) => {
    res.status(200).send({ reviews: data });
  });
};

exports.getCommentsById = (req, res, next) => {
  const { review_id } = req.params;

  Promise.all([selectComentsById(review_id), checkReviewExists(review_id)])
    .then((data) => {
      res
        .status(200)
        .send({ comments: data[0].length === 0 ? data[1] : data[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res) => {
  selectUsers().then((data) => {
    res.status(200).send({ users: data });
  });
};
