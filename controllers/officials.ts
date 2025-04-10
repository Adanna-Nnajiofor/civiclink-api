import { RequestHandler } from "express";
import { db } from "../db";

export const getOfficialsByQuery: RequestHandler = async (req, res) => {
  const { state, lga, issue } = req.query;

  if (!state || !lga || !issue) {
    res.status(400).json({
      status: "error",
      message: "Missing required query parameters: state, lga, issue",
    });
    return;
  }

  try {
    const result = await db.query(
      `
      SELECT o.id, o.name, o.role, o.phone, o.email, o.address, o.location_id, o.issue_id
      FROM officials o
      JOIN locations l ON o.location_id = l.id
      JOIN issues i ON o.issue_id = i.id
      WHERE l.state = $1 AND l.lga = $2 AND i.name = $3
      `,
      [state, lga, issue]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        status: "error",
        message: "No matching official found for your location.",
      });
      return;
    }

    res.status(200).json({ status: "success", data: result.rows });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "An unknown error occurred",
      });
    }
  }
};
