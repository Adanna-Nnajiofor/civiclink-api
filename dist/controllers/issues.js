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
exports.getGovLevelByIssue = exports.getAllIssues = void 0;
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
