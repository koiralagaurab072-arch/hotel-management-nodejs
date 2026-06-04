const passport = require('passport');
const person = require('./modules/person');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (user_name, password, done) => {
  try {
    console.log("login attemt by :", user_name);
    const user = await person.findOne({ username: user_name });
    if (!user) {
      return done(null, false, { message: "username not found" });

    }
    const ispassword = await user.comparePassword(password);
    if (ispassword) {
      return done(null, user);
    } else {
      return done(null, false, { message: "incorrect password" });
    }
  } catch (err) {
    return done(err);
  }
}));

module.exports=passport;