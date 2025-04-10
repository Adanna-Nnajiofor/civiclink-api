"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const officials_1 = require("../controllers/officials");
const router = (0, express_1.Router)();
router.get("/", officials_1.getOfficialsByQuery);
exports.default = router;
