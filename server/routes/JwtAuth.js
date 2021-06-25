import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import JwtGenerator from "../utils/JwtGenerator.js";
import ValidInfo from "../middleware/ValidInfo.js";
import Authorization from "../middleware/Authorization.js";

const router = express.Router();

//registering
router.post("/register", ValidInfo, async (req, res) => {
  try {
    //1. Destructure the req of the body
    const { name, email, password } = req.body;

    //2. chech the user exist (if then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("user already exist");
    }

    //3. Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter the user in to DB
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password)  VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5. Gen JWT token
    const token = JwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//login route
router.post("/login", ValidInfo, async (req, res) => {
  try {
    //1. Destructure
    const { email, password } = req.body;

    //2. Check if user doesnt exist (if not throw err)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid credential");
    }
    //3. Check if incomming password is the same the database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid credential");
    }

    //4. Give jwt token
    const token = JwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server error");
  }
});

router.get("/is-verify", Authorization, async (req, res) => {
  try {
    res.status(201).json(true);
  } catch (err) {
    console.error(err, message);
    res.status(500).send("Server Error");
  }
});

export default router;
