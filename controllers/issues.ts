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

// Post a new issue
export const createIssue: RequestHandler = async (req, res) => {
  // Log the incoming request body for debugging purposes
  console.log("Request Body:", req.body);

  // Destructure the necessary fields from the request body
  const { name, gov_level_id } = req.body;

  // Basic input validation
  if (!name || !gov_level_id) {
    res
      .status(400)
      .json({ status: "error", message: "Missing required fields" });
    return; // End execution if validation fails
  }

  try {
    // Log the values before inserting them into the database
    console.log("Inserting into database with values:", { name, gov_level_id });

    // Insert the new issue into the database and return the created row
    const result = await db.query(
      "INSERT INTO issues (name, gov_level_id) VALUES ($1, $2) RETURNING *",
      [name, gov_level_id]
    );

    // Log the result of the insert operation
    console.log("Insert Result:", result);

    // Respond with the created issue data
    res.status(201).json({
      status: "success",
      data: result.rows[0], // Return the newly created issue
    });
  } catch (error: unknown) {
    // Log the error that occurred during the insert
    console.error("Error during database insert:", error);

    // Respond with a 500 error if something goes wrong
    if (error instanceof Error) {
      res.status(500).json({ status: "error", message: error.message });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "An unknown error occurred" });
    }
  }
};
