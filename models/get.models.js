const { response } = require("../app");
const db = require("../db/connection.js");

exports.selectCategories = () => {
  const selectCategories = `SELECT * FROM categories`;

  return db.query(selectCategories).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({
        status: 404,
        msg: `Not Found!`,
      });
    }
    return rows;
  });
};
