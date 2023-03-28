const { response } = require("../app");
const db = require("../db/connection.js");

exports.selectCategories = () => {
  const selectCategories = `SELECT * FROM categories`;

  return db.query(selectCategories).then(({ rows }) => rows);
};

exports.selectReviewById = (id) => {
  const selectReview = `
    SELECT * FROM reviews
    WHERE review_id = $1
    `;

  return db.query(selectReview, [id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Not Found!",
      });
    }
    return rows[0];
  });
};
