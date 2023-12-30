const { UserModel } = require("../../models/users");

async function checkLogin(req, res, next) {
  try {
    const token = req.cookies?.authorization;
    console.log(token);
    if (!token)
      return res.render("login.ejs", {
        error: "وارد حساب کاربری خود شود!",
      });

    const user = await UserModel.findOne({ token });
    if (user) {
      req.user = user;
      return next();
    }
  } catch (error) {
    next(error);
  }
}

async function checkAccessLogin(req, res, next) {
  try {
    const token = req.cookies?.authorization;
    if (!token) return next();
    return res.redirect("/support");
  } catch (error) {
    next(error);
  }
}
module.exports = {
  checkLogin,
  checkAccessLogin
};
