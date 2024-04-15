const router = require('express').Router();
import {
  getAverageSessionHandler,
   getCountryUsersHandler,
   getGoogleCityDataHandler,
   getGoogleDataHandler,
   getNewUsersDataHandler
  } from "../controller/googleAnalytics.controller";

router.get(
  '/',

 getGoogleDataHandler
);
router.get(
  '/average',

 getAverageSessionHandler
);

router.get(
  '/city',

 getGoogleCityDataHandler
);

router.get(
  '/country',

 getCountryUsersHandler
);

router.get(
  '/newUsers',

 getNewUsersDataHandler
);

export default router;
