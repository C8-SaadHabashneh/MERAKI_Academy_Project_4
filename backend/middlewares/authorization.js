// this function checks if the user has the passed permission
const authorization = (permission) => {
  return (req, res, next) => {
    if (!req.token.role.permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    } else {
      next();
    }
  };
};

module.exports = authorization;
