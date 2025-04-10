"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const issues_1 = require("../controllers/issues");
const router = (0, express_1.Router)();
router.get("/", issues_1.getAllIssues);
router.get("/:id/government-level", issues_1.getGovLevelByIssue);
router.post("/", issues_1.createIssue);
exports.default = router;
