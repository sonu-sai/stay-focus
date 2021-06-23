import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "stay_focus_login",
});

export default pool;
