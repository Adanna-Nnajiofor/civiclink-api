import { Router } from "express";
import { getAllLocations } from "../controllers/locations";

const router = Router();

router.get("/", getAllLocations);

export default router;
