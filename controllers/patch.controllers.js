const {
  updateReviews,
  checkReviewExists,
} = require("../models/patch.models.js");

exports.patchReviews = (req, res, next) => {
  const { review_id } = req.params;
  const body = req.body;

  Promise.all([updateReviews(review_id, body), checkReviewExists(review_id)])
    .then((data) => {
      res.status(200).send({ review: data[0] });
    })
    .catch((err) => {
      next(err);
    });
};
