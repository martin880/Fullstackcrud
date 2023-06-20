import express from "express";
import cors from "cors";
import UserRoutes from "./src/routes/UserRoutes.js";

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());
app.use(UserRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));