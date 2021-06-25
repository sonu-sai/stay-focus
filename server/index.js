import express from "express";
import cors from "cors";
import JwtAuth from "./routes/JwtAuth.js";
import dotenv from "dotenv";
import Dashboard from "./routes/Dashboard.js";

dotenv.config();
const app = express();
// use cors  we have to use middle ware
app.use(express.json());
app.use(cors());

//Routes Reg and Login
app.use("/auth", JwtAuth);

app.use("/dashboard", Dashboard);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`app is listening on ${port}`);
});
