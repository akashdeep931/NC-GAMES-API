const {
  deleteComment,
  checkCommentExists,
} = require("../models/delete.models.js");

exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;

  Promise.all([deleteComment(comment_id), checkCommentExists(comment_id)])
    .then((data) => {
      res.status(204).send(data[0]);
    })
    .catch((err) => {
      next(err);
    });
};
