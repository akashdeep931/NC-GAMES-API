const {
  insertComment,
  checkUsernameExists,
  checkReviewExists,
} = require("../models/post.models.js");

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const body = req.body;

  Promise.all([
    checkReviewExists(review_id),
    checkUsernameExists(body),
    insertComment(review_id, body),
  ])
    .then((data) => {
      res.status(201).send({ comment: data[2] });
    })
    .catch((err) => {
      next(err);
    });
};
