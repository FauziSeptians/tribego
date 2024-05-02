export const RoleMiddleware = (req, res, next) => {
  console.log(req.session);
  if (
    req.session?.userRole == "Admin" ||
    req.session?.userEmail == "admin@gmail.com"
  ) {
    return next();
  }

  res.redirect("/");
};
