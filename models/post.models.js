const db = require("../db/connection.js");
const format = require("pg-format");

exports.insertComment = (id, newItem) => {
  const values = Object.values(newItem);
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
