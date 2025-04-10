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
exports.getOfficialsByQuery = void 0;
const db_1 = require("../db");
const getOfficialsByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state, lga, issue } = req.query;
    if (!state || !lga || !issue) {
        res.status(400).json({
            status: "error",
            message: "Missing required query parameters: state, lga, issue",
        });
        return;
    }
    try {
        const result = yield db_1.db.query(`
      SELECT o.id, o.name, o.role, o.phone, o.email, o.address, o.location_id, o.issue_id
      FROM officials o
      JOIN locations l ON o.location_id = l.id
      JOIN issues i ON o.issue_id = i.id
      WHERE l.state = $1 AND l.lga = $2 AND i.name = $3
      `, [state, lga, issue]);
        if (result.rowCount === 0) {
            res.status(404).json({
                status: "error",
                message: "No matching official found for your location.",
            });
            return;
        }
        res.status(200).json({ status: "success", data: result.rows });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "An unknown error occurred",
            });
        }
    }
});
exports.getOfficialsByQuery = getOfficialsByQuery;
