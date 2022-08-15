import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import { router } from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);
app.use((err, req, res, next) => res.json({ message: err.message }));

app.listen(PORT);
console.log("Server on port", PORT);
