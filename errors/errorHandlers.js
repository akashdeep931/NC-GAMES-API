exports.incorrectPathError = (req, res) => {
  res.status(404).send({ msg: "Not Found!" });
};

// exports.handleCustomErrors = (err, req, res, next) => {
//   res.status(404).send({ msg: "Not Found!" });
// };
