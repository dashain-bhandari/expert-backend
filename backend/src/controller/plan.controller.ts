import { NextFunction, Request, Response } from "express";
import { CreatePlanInput, UpdatePlanInput } from "../schema/plan.schema";
import { createPlan, deletePlan, findAllPlan, findAndUpdatePlan, findPlan } from "../service/plan.service";
import AppError from "../utils/appError";
var colors = require("colors");

export async function createPlanHandler(req: Request<{}, {}, CreatePlanInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const plan = await createPlan(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: plan,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updatePlanHandler(req: Request<UpdatePlanInput["params"]>, res: Response, next: NextFunction) {
  try {
    const planId = req.params.planId;
    const updatedPlan= await findAndUpdatePlan({ planId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedPlan,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getPlanHandler(req: Request<UpdatePlanInput["params"]>, res: Response, next: NextFunction) {
  try {
    const planId = req.params.planId;
    const plan = await findPlan({ planId });

    if (!plan) {
      next(new AppError("plan does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: plan,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deletePlanHandler(req: Request<UpdatePlanInput["params"]>, res: Response, next: NextFunction) {
  try {
    const planId = req.params.planId;
    const plan = await findPlan({ planId });

    if (!plan) {
      next(new AppError("Plan does not exist", 404));
    }

    await deletePlan({ planId });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllPlanHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const plans = await findAllPlan();
    return res.json({
      status: "success",
      msg: "Get all plan success",
      data: plans,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
