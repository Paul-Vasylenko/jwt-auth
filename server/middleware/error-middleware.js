const ApiError = require("../exceptions/api-errors");

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ ...err, message: err.message });
  }
  return res.status(500).json({ message: "Unhandled error" });
};
