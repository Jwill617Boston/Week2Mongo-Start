const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

// .use() impliments Strategy
// LocalStrategy() arg1= verify callback(); checked against Local User names + passwords
// authenticate() checks User

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ^^^ needs to be used on passport
