
const propertyId = "432509632";

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "../backend/src/utils/googleAnalytics.json";

const { BetaAnalyticsDataClient } = require("@google-analytics/data");


const analyticsDataClient = new BetaAnalyticsDataClient();
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { any } from "zod";
var colors = require("colors");

interface ReportRow {
  pageTitle: string;
  totalPageViews: number;
}

async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2024-03-01",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "pagePath",
      },
     
    ],
    metrics: [
      {
        name: "totalUsers",
      },
    ],
    // Add a filter expression to filter by page title
    //filtersExpression: 'pagePath == "admin-dashboard/"', // Replace "Your Page Title" with the actual title of the page
  });

  const formattedData: ReportRow[] = [];

  console.log("Report result:");
  response.rows.forEach((row: any) => {
    const rowData: ReportRow = {
      pageTitle: row.dimensionValues[0]?.value,
     
      totalPageViews: parseInt(row.metricValues[0]?.value),
    };
    console.log(rowData);
    formattedData.push(rowData);
  });

  return formattedData;
}

export async function getGoogleDataHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await runReport();
    return res.json({
      status: "success",
      msg: "Get success",
      data: data,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


async function runReportForAverageSession() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today",
      },
    ],
    // dimensions: [
    //   {
    //     name: "pagePath",
    //   },
     
    // ],
    metrics: [
      {
        name: "averageSessionDuration",
      },
    ],
    // Add a filter expression to filter by page title
    //filtersExpression: 'pagePath == "admin-dashboard/"', // Replace "Your Page Title" with the actual title of the page
  });

  // const formattedData: ReportRow[] = [];

  console.log("Report result:");
  response.rows.forEach((row: any) => {
   
    console.log(row.metricValues[0].value)
    
  });

  return response.rows[0].metricValues[0].value
}

export async function getAverageSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await runReportForAverageSession();
    
    return res.json({
      status: "success",
      msg: "Get success",
      data: data,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


interface ReportCityRow {
  City: string;
  Users: number;
}

async function runCityReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "city",
      },
     
    ],
    metrics: [
      {
        name: "totalUsers",
      },
    ],
    // Add a filter expression to filter by page title
    //filtersExpression: 'pagePath == "admin-dashboard/"', // Replace "Your Page Title" with the actual title of the page
  });

  const formattedCityData: ReportCityRow[] = [];

  console.log("Report result:");
  response.rows.forEach((row: any) => {
    const rowData: ReportCityRow = {
      City: row.dimensionValues[0]?.value,
     
      Users: parseInt(row.metricValues[0]?.value),
    };
    console.log(rowData);
    formattedCityData.push(rowData);
  });

  return formattedCityData;
}

export async function getGoogleCityDataHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await runCityReport();
    return res.json({
      status: "success",
      msg: "Get success",
      data: data,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}



async function runCountryReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "country",
      },
     
    ],
    metrics: [
      {
        name: "totalUsers",
      },
    ],
    // Add a filter expression to filter by page title
    //filtersExpression: 'pagePath == "admin-dashboard/"', // Replace "Your Page Title" with the actual title of the page
  });

  // const formattedData: ReportRow[] = [];
  const formattedCityData: ReportCityRow[] = [];
  console.log("Report result:");
  response.rows.forEach((row: any) => {
   
    const rowData: ReportCityRow = {
      City: row.dimensionValues[0]?.value,
     
      Users: parseInt(row.metricValues[0]?.value),
    };
    console.log(rowData);
    formattedCityData.push(rowData);
    
  });

  return formattedCityData
}

export async function getCountryUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await runCountryReport();
    
    return res.json({
      status: "success",
      msg: "Get success",
      data: data,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


async function runNewUsersReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today",
      },
    ],
   
    metrics: [
      {
        name: "newUsers",
      },
    ],

    //filtersExpression: 'pagePath == "admin-dashboard/"', // Replace "Your Page Title" with the actual title of the page
  });


  return response?.rows[0]?.metricValues[0]?.value;
  


 
}

export async function getNewUsersDataHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await runNewUsersReport();
    return res.json({
      status: "success",
      msg: "Get success",
      data: data,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
