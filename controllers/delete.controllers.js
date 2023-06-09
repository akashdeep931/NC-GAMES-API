const {
  deleteComment,
  checkCommentExists,
} = require("../models/delete.models.js");

exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;

  Promise.all([checkCommentExists(comment_id), deleteComment(comment_id)])
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
