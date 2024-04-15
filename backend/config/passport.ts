const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

passport.use(
  new FacebookStrategy(
    {
      //options
      clientID: "938808197938919",
      clientSecret: "55f5681b4a118e0390dd6e5768b457fa",
      callbackURL: "https://backend.expertbusiness/api/auth/facebook/callback",
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      console.log("passport.js on success oauth login");
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  console.log(user)
  done(null, user);
});
