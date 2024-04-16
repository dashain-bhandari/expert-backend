import { fbLogInHandler, getAccessTokenFromCode, getFacebookUserData } from "../controller/fb.controller";
import cors from "cors"
const router = require('express').Router();
const passport=require('passport')
const Client_URL = `https://expert-vercel.vercel.app/profile`;

router.use(cors());
router.get(
  '/login/failed',

  (req:any, res:any) => {
    res.status(401).json({
      success: false,
      message: 'failure',
    });
  }
);

router.get(
  '/login/success',

  (req:any, res:any) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: 'success',
        user: req.user,
        //cookies:req.cookies
      });
    }
  }
);

router.get(
  '/logout',

  (req:any, res:any) => {
    req.logout();
    res.redirect(Client_URL);
  }
);


router.post(
  '/facebook/login',
  fbLogInHandler
);


router.get(
  '/facebook/token/:code',
  getAccessTokenFromCode

);


router.get(
  '/facebook/data/:access_token',
  getFacebookUserData

);


router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: Client_URL,
    failureRedirect: '/login/failed',
  })

 
);

export default router;


