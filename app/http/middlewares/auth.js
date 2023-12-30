const { UserModel } = require("../../models/users");

async function checkLogin(req, res, next) {
  try {
    const token = req.cookies?.authorization;
    if (!token)
      return res.render("login.ejs", {
        error: "وارد حساب کاربری خود شود!",
      });

    const user = await UserModel.findOne({ token },{password:0,courses:0,basket:0});
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
    const user=await UserModel.findOne({ token },{password:0,courses:0,basket:0});
    if(!user) throw next();
    req.user=user;
    return res.redirect("/support");
  } catch (error) {
    next(error);
  }
}
module.exports = {
  checkLogin,
  checkAccessLogin
};
