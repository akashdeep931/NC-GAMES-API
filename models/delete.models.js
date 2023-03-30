const db = require("../db/connection.js");

exports.deleteComment = (id) => {
  return db
    .query(
      `
    DELETE FROM comments
    WHERE comment_id = $1
    `,
      [id]
    )
    .then((response) => {
      return response.rows;
    });
};

exports.checkCommentExists = (id) => {
  return db
    .query(
      `
          SELECT * FROM comments
          WHERE comment_id = $1
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
