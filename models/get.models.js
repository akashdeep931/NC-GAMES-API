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

exports.selectReviews = () => {
  const reviewQuery = `
    SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(body) AS comment_count FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC
    `;

  return db.query(reviewQuery).then((response) => response.rows);
};
