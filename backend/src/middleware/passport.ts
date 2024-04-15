
// const express = require('express');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;


// const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID|| "7718410028190696";
// const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET||"4e38426f0bfeae0f5217359e87bf1058";
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       callbackURL: '/auth/facebook/callback',
//     },
//     function (accessToken:any, refreshToken:any, profile:any, done:any) {
//       console.log('passport.js on success oauth login');
//       console.log(profile);
//       done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user:any, done:any) => {
//   done(null, user);
// });
// passport.deserializeUser((user:any, done:any) => {
//   done(null, user);
// });