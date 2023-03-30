const db = require("../db/connection.js");

exports.checkReviewExists = (id) => {
  return db
    .query(
      `
      SELECT * FROM reviews
      WHERE review_id = $1
      `,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not Found!",
        });
      }

      return rows;
    });
};

exports.updateReviews = (id, changedItem) => {
  const { inc_votes: newVote } = changedItem;
  const updateVotes = `
      UPDATE reviews
      SET votes = votes + $1
      WHERE review_id = $2
      RETURNING *
      `;

  return db.query(updateVotes, [newVote, id]).then(({ rows }) => {
    return rows[0];
  });
};
