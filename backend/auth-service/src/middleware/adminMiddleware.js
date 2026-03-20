const { createError } = require("./errorHandler");

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(createError(403, "Akses ditolak. Hanya admin yang diperbolehkan."));
  }
};

module.exports = adminMiddleware;
