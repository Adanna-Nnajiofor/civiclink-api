import { Router } from "express";
import {
  getAllIssues,
  getGovLevelByIssue,
  createIssue,
} from "../controllers/issues";

const router = Router();

router.get("/", getAllIssues);
router.get("/:id/government-level", getGovLevelByIssue);
router.post("/", createIssue);  

export default router;
