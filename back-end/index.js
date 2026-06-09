require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

let dbPassword;

//  If running on Render (secret file exists)
if (process.env.RENDER) {
  try {
    dbPassword = fs.readFileSync(
      "/etc/secrets/DB_PASSWORD",
      "utf8"
    ).trim();
  } catch (error) {
    console.error("Could not read secret file:", error);
  }
} else {
  //  If running locally
  dbPassword = process.env.DB_PASSWORD;
}

//  DATABASE CONNECTION
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: dbPassword,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/accommodations", async (req, res) => {
  const result = await pool.query("SELECT * FROM accommodations");
  res.json(result.rows);
});

app.get("/car-rentals", async (req, res) => {
  const result = await pool.query("SELECT * FROM car_rentals");
  res.json(result.rows);
});

app.get("/tours", async (req, res) => {
  const result = await pool.query("SELECT * FROM tour_operators");
  res.json(result.rows);
});

app.post("/signup", async (req, res) => {
  const { name, email, password, firstName, lastName, country, dob } = req.body;

  try {
    console.log("SIGNUP DATA:", req.body);  

    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.json({ error: "User already exists" });
    }

    const result = await pool.query(
      `INSERT INTO users 
      (name, email, password, first_name, last_name, country, dob) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [name, email, password, firstName, lastName, country, dob]
    );

    console.log("INSERT SUCCESS:", result.rows[0]); 

    res.json({
      message: "Signup successful",
      user: result.rows[0]
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err); 
    res.status(500).json({ error: "Server error during signup" });
  }
});

app.put("/update-profile", async (req, res) => {
  const { id, firstName, lastName, name, email, country, dob, password } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Build the SET clause dynamically so we only update what was sent
    const fields  = [];
    const values  = [];
    let   idx     = 1;

    if (firstName !== undefined) { fields.push(`first_name = $${idx++}`);  values.push(firstName); }
    if (lastName  !== undefined) { fields.push(`last_name  = $${idx++}`);  values.push(lastName);  }
    if (name      !== undefined) { fields.push(`name       = $${idx++}`);  values.push(name);      }
    if (email     !== undefined) { fields.push(`email      = $${idx++}`);  values.push(email);     }
    if (country   !== undefined) { fields.push(`country    = $${idx++}`);  values.push(country);   }
    if (dob       !== undefined) { fields.push(`dob        = $${idx++}`);  values.push(dob);       }

    // Only update password if the client sent a non-empty new one
    if (password && password.trim()) {
      fields.push(`password = $${idx++}`);
      values.push(password.trim());
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id); // last param = WHERE id = $N

    const query = `
      UPDATE users
      SET    ${fields.join(", ")}
      WHERE  id = $${idx}
      RETURNING
        id,
        name,
        email,
        first_name  AS "firstName",
        last_name   AS "lastName",
        country,
        dob,
        created_at
    `;

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: result.rows[0] });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: "Server error while updating profile" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/admin-signup", async (req, res) => {
  const { name, email, password, department, secretKey } = req.body;

  const validKey = process.env.ADMIN_SECRET_KEY || "VANUATU_ADMIN_2026";

  if (secretKey !== validKey) {
    return res.status(403).json({ error: "Invalid secret key" });
  }

  try {
    const existing = await pool.query(
      "SELECT * FROM managers WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.json({ error: "Manager account already exists" });
    }

    const result = await pool.query(
      `INSERT INTO managers (name, email, password, department)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, department`,
      [name, email, password, department]
    );

    res.json({ manager: result.rows[0] });

  } catch (err) {
    console.error("ADMIN SIGNUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM managers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ error: "Manager account not found" });
    }

    const manager = result.rows[0];

    if (manager.password !== password) {
      return res.json({ error: "Incorrect password" });
    }

    const { password: _pw, ...safeManager } = manager;
    res.json({ manager: safeManager });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error during admin login" });
  }
});

app.get("/admin/users", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email,
       country, dob, created_at
       FROM users`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.delete("/admin/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete error" });
  }
});

app.delete("/admin/accommodations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM accommodations WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    res.json({ message: "Accommodation deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete error" });
  }
});

app.delete("/admin/car-rentals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM car_rentals WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Car rental not found" });
    }

    res.json({ message: "Car rental deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete error" });
  }
});

app.delete("/admin/tours/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tour_operators WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tour operator not found" });
    }

    res.json({ message: "Tour operator deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT 
        id,
        name,
        email,
        password,
        first_name AS "firstName",
        last_name AS "lastName",
        country,
        dob
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({
        error: "Account not found or has been deleted"
      });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.json({ error: "Incorrect password" });
    }

    const { password: _pw, ...safeUser } = user;

    res.json({ user: safeUser });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});