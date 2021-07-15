import express from "express";
import cors from "cors";
import JwtAuth from "./routes/JwtAuth.js";
import dotenv from "dotenv";
import Dashboard from "./routes/Dashboard.js";
import path from "path";

const __dirname = path.resolve();
dotenv.config();
const app = express();
// use cors  we have to use middle ware
app.use(express.json());
app.use(cors());

// we use production build here so we now serve the directory here
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
//Routes Reg and Login
app.use("/auth", JwtAuth);

app.use("/dashboard", Dashboard);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
