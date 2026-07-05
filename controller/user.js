const User = require("../models/user");

module.exports.registerForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.postNewUser = async (req, res) => {
  let { email, username, password } = req.body;
  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);
  console.log("registered user", registeredUser);
  try {
    await req.login(registeredUser, (err) => {
      if (err) {
        console.log(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Error logging in after registration. Please try again.");
    res.redirect("/login");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectTo = res.locals.returnTo || "/listings";
  res.redirect(redirectTo);
};

module.exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      req.flash("error", "Error logging out. Please try again.");
      return res.redirect("/listings");
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};