"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locations_1 = require("../controllers/locations");
const router = (0, express_1.Router)();
router.get("/", locations_1.getAllLocations);
exports.default = router;
