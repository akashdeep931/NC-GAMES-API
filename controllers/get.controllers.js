const {
  selectCategories,
  selectReviewById,
  selectReviews,
  selectComentsById,
  checkReviewExists,
  selectUsers,
  checkCategoryExists,
  fetchAPIs,
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
      res.status(200).send({ review: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const { category, sort_by, order } = req.query;

  Promise.all([
    selectReviews(category, sort_by, order),
    checkCategoryExists(category),
  ])
    .then((data) => {
      res
        .status(200)
        .send({ reviews: data[0].length === 0 ? data[1] : data[0] });
    })
    .catch((err) => {
      next(err);
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

exports.getAllAPIs = (req, res) => {
  fetchAPIs().then((data) => {
    res.status(200).send({ endpoints: data });
  });
};
