import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Authorization token is missing" });
  }

  next();
};
