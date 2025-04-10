"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIssue = exports.getGovLevelByIssue = exports.getAllIssues = void 0;
const db_1 = require("../db");
// Get all issues
const getAllIssues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM issues");
        res.status(200).json({ status: "success", data: result.rows });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ status: "error", message: error.message });
        }
        else {
            res
                .status(500)
                .json({ status: "error", message: "An unknown error occurred" });
        }
    }
});
exports.getAllIssues = getAllIssues;
// Get government level by issue ID
const getGovLevelByIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield db_1.db.query(`SELECT i.name AS issue, g.name AS government_level
       FROM issues i
       JOIN government_levels g ON i.gov_level_id = g.id
       WHERE i.id = $1`, [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ status: "error", message: "Issue not found" });
            return;
        }
        res.status(200).json({ status: "success", data: result.rows[0] });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ status: "error", message: error.message });
        }
        else {
            res
                .status(500)
                .json({ status: "error", message: "An unknown error occurred" });
        }
    }
});
exports.getGovLevelByIssue = getGovLevelByIssue;
// Post a new issue
const createIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield db_1.db.query("INSERT INTO issues (name, gov_level_id) VALUES ($1, $2) RETURNING *", [name, gov_level_id]);
        // Log the result of the insert operation
        console.log("Insert Result:", result);
        // Respond with the created issue data
        res.status(201).json({
            status: "success",
            data: result.rows[0], // Return the newly created issue
        });
    }
    catch (error) {
        // Log the error that occurred during the insert
        console.error("Error during database insert:", error);
        // Respond with a 500 error if something goes wrong
        if (error instanceof Error) {
            res.status(500).json({ status: "error", message: error.message });
        }
        else {
            res
                .status(500)
                .json({ status: "error", message: "An unknown error occurred" });
        }
    }
});
exports.createIssue = createIssue;
