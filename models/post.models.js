const db = require("../db/connection.js");
const format = require("pg-format");

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

exports.checkUsernameExists = (newItem) => {
  if (newItem.hasOwnProperty("username") && newItem.hasOwnProperty("body")) {
    const { username } = newItem;

    return db
      .query(
        `
              SELECT * FROM users
              WHERE username = $1
              `,
        [username]
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
  }
};

exports.insertComment = (id, newItem) => {
  const body = { ...newItem };

  for (let prop in body) {
    if (prop !== "username" && prop !== "body") {
      delete body[prop];
    }
  }

  const values = Object.values(body);
  values.unshift(id);

  const insertItem = format(
    `
              INSERT INTO comments
              (review_id, author, body)
              VALUES
              %L
              RETURNING *
              `,
    [values]
  );

  return db.query(insertItem).then(({ rows }) => rows[0]);
};
