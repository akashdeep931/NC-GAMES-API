exports.incorrectPathError = (req, res) => {
  res.status(404).send({ msg: "Not Found!" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors = (err, req, res, next) => {
  res.status(400).send({ msg: "Bad Request!" });
};
