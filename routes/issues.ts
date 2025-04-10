import { Router } from "express";
import { getAllIssues, getGovLevelByIssue } from "../controllers/issues";

const router = Router();

router.get("/", getAllIssues);
router.get("/:id/government-level", getGovLevelByIssue);

export default router;
