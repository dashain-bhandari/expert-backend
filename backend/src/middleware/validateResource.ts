import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
   
    next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      console.log(req.body)
      return res.status(400).json({
        status: "fail",
        error: err.errors,
      });
    }
    next(err);
  }
};
