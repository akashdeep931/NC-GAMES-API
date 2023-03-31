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

exports.selectReviews = (categ, sort, order) => {
  const sort_by = sort || "created_at";
  const ordered = order || "DESC";

  let reviewQuery = `
    SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(body) AS comment_count FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
    `;
  const category = [];

  if (categ) {
    reviewQuery += ` WHERE category = $1`;
    category.push(categ);
  }

  reviewQuery += ` GROUP BY reviews.review_id ORDER BY reviews.${sort_by} ${ordered}`;

  return db.query(reviewQuery, category).then((response) => response.rows);
};

exports.checkCategoryExists = (categ) => {
  if (categ) {
    return db
      .query(
        `
    SELECT * FROM categories
    WHERE slug = $1
    `,
        [categ]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Not Found!",
          });
        }

        return [];
      });
  }
};

exports.selectComentsById = (id) => {
  const commentQuery = `
    SELECT * FROM comments
    WHERE review_id = $1
    ORDER BY created_at DESC
    `;

  return db.query(commentQuery, [id]).then(({ rows }) => {
    return rows;
  });
};

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

      return [];
    });
};

exports.selectUsers = () => {
  return db
    .query(
      `
  SELECT * FROM users
  `
    )
    .then(({ rows }) => rows);
};
