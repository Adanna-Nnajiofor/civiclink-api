import express from "express";
import cors from "cors";
import issueRoutes from "./routes/issues";
import officialRoutes from "./routes/officials";
import locationRoutes from "./routes/locations";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1/officials", officialRoutes);
app.use("/api/v1/locations", locationRoutes);

export default app;
