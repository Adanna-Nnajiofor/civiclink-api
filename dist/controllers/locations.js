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
exports.getAllLocations = void 0;
const db_1 = require("../db");
const getAllLocations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db.query(`
    SELECT state, ARRAY_AGG(lga) as lgas
    FROM locations
    GROUP BY state
  `);
    res.status(200).json({ status: "success", data: result.rows });
});
exports.getAllLocations = getAllLocations;
