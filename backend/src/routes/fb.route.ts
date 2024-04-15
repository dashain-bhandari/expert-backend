// const router = require('express').Router();
// const passport=require('passport')
// const Client_URL = `https://demo.expertbusiness.com.np/profile`;

// router.get(
//   '/login/failed',

//   (req:any, res:any) => {
//     res.status(401).json({
//       success: false,
//       message: 'failure',
//     });
//   }
// );

// router.get(
//   '/login/success',

//   (req:any, res:any) => {
//     if (req.user) {
//       res.status(200).json({
//         success: true,
//         message: 'success',
//         user: req.user,
//         //cookies:req.cookies
//       });
//     }
//   }
// );

// router.get(
//   '/logout',

//   (req:any, res:any) => {
//     req.logout();
//     res.redirect(Client_URL);
//   }
// );


// // ! for facebook, when user clicks login with fb

// router.get(
//   '/facebook',
//   passport.authenticate('facebook', { scope: ['public_profile','email'] })
// );

// // router.get(
// //   '/facebook',
// //   (req:any,res:any)=>{
// // return res.json({msg:"routes working"})
// //   }
// // );

// router.get(
//   '/facebook/callback',
//   // passport.authenticate('facebook', {
//   //   successRedirect: Client_URL,
//   //   failureRedirect: '/login/failed',
//   // })
// (req:any,res:any)=>{
// return res.json({msg:"hiii"})
// }
 
// );

// export default router;


import express from "express";

import { fbLogInHandler } from "../controller/fb.controller";
import { requireAdmin } from "../middleware/requireAdmin";
import { requireSuperAdmin } from "../middleware/requireSuperAdmin";

const router = express.Router();

  router.post('/',fbLogInHandler);

  export default router;