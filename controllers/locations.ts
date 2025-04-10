import { Request, Response } from "express";
import { db } from "../db";

export const getAllLocations = async (_req: Request, res: Response) => {
  const result = await db.query(`
    SELECT state, ARRAY_AGG(lga) as lgas
    FROM locations
    GROUP BY state
  `);

  res.status(200).json({ status: "success", data: result.rows });
};
