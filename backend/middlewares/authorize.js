const authorize =
  (roles = []) =>
  (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Forbidden, user role not found" });
    }

    const userRole = req.user.role;

    if (roles.length === 0 || roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };

module.exports = authorize;
