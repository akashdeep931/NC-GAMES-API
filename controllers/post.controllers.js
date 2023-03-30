const { insertComment } = require("../models/post.models.js");

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const body = req.body;

  insertComment(review_id, body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
