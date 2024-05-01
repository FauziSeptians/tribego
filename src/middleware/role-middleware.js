export const RoleMiddleware = (req, res, next) => {
  const requestedPath = req.originalUrl;

  if (req.user.role == "admin" && requestedPath.includes("admin")) {
    next();
  } else {
    res.redirect("/");
  }

  next();
};
