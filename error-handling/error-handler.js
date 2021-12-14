const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.status && err.message) res.status(err.status).json(err.message);

  res.status(500).json('Server error, please try again later');
};

module.exports = errorHandler;