import { RequestHandler } from "express";
import { db } from "../db";

// Get all issues
export const getAllIssues: RequestHandler = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM issues");
    res.status(200).json({ status: "success", data: result.rows });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ status: "error", message: error.message });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "An unknown error occurred" });
    }
  }
};

// Get government level by issue ID
export const getGovLevelByIssue: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      `SELECT i.name AS issue, g.name AS government_level
       FROM issues i
       JOIN government_levels g ON i.gov_level_id = g.id
       WHERE i.id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ status: "error", message: "Issue not found" });
      return;
    }

    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ status: "error", message: error.message });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "An unknown error occurred" });
    }
  }
};
