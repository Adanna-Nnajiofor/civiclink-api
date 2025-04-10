import { Router } from "express";
import { getOfficialsByQuery } from "../controllers/officials";

const router = Router();

router.get("/", getOfficialsByQuery);

export default router;
