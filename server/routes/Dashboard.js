import express from "express";
import pool from "../db.js";
import Authorization from "../middleware/Authorization.js";

const route = express.Router();

route.get("/", Authorization, async (req, res) => {
  try {
    // req.user has payload now bcoz of the middle ware
    // res.json(req.user);
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

export default route;
