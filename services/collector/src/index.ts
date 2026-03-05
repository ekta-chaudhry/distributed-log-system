import express from "express";
import { v1Router } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/collector", v1Router);

app.listen(PORT, () => {
  console.log(`Collector service running on port ${PORT}`);
});
