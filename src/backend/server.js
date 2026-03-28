const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lovely_MSR",
  database: "campus_connect"
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// 🔥 TEST API
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


// 🔥 REGISTER API
app.post("/register", (req, res) => {
  const { role } = req.body;

  let query = "";
  let values = [];

  console.log("📥 Register Data:", req.body);

  // 🟢 STUDENT
  if (role === "Student") {
    const { name, roll, branch, year, email, phone, password } = req.body;

    query = `
      INSERT INTO student (name, roll, branch, year, email, phone, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    values = [name, roll, branch, year, email, phone, password];
  }

  // 🟣 ALUMNI
  else if (role === "Alumni") {
    const { name, branch, year, company, job_role, email, phone, password } = req.body;

    query = `
      INSERT INTO alumni (name, branch, passout_year, company, job_role, email, phone, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    values = [name, branch, year, company, job_role, email, phone, password];
  }

  // 🟡 ORGANIZER
  else if (role === "Organization") {
    const { name, roll, club_name, branch, year, email, phone, password } = req.body;

    query = `
      INSERT INTO organizer (name, roll, club_name, branch, year, email, phone, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    values = [name, roll, club_name, branch, year, email, phone, password];
  }

  // 🔴 ADMIN
  else if (role === "Admin") {
    const { name, staff_id, department, admin_role, email, phone, password } = req.body;

    query = `
      INSERT INTO admin (name, staff_id, department, admin_role, email, phone, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    values = [name, staff_id, department, admin_role, email, phone, password];
  }

  else {
    return res.status(400).json({ message: "Invalid role ❌" });
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.log("❌ Register Error:", err);
      return res.status(500).json({ message: "Error inserting data ❌" });
    }

    res.json({ success: true, message: "User Registered Successfully 🎉" });
  });
});


// 🔥 LOGIN API
app.post("/login", (req, res) => {
  const { role, rollNo, email, password, clubName } = req.body;

  let query = "";
  let values = [];

  console.log("📥 Login Data:", req.body);

  // 🟢 STUDENT
  if (role === "Student") {
    query = "SELECT * FROM student WHERE roll=? AND password=?";
    values = [rollNo, password];
  }

  // 🟣 ALUMNI
  else if (role === "Alumni") {
    query = "SELECT * FROM alumni WHERE email=? AND password=?";
    values = [email, password];
  }

  // 🟡 ORGANIZER
  else if (role === "Organization") {
    query = "SELECT * FROM organizer WHERE roll=? AND club_name=? AND password=?";
    values = [rollNo, clubName, password];
  }

  // 🔴 ADMIN
  else if (role === "Admin") {
    query = "SELECT * FROM admin WHERE email=? AND password=?";
    values = [email, password];
  }

  else {
    return res.status(400).json({ message: "Invalid role ❌" });
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.log("❌ Login Error:", err);
      return res.status(500).json({ message: "Server Error ❌" });
    }

    console.log("🔍 DB Result:", result);

    if (result.length > 0) {
      res.json({
        success: true,
        user: result[0],
        role: role
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials ❌"
      });
    }
  });
});


// 🔥 START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
// SEND MESSAGE
app.post("/send-message", (req, res) => {
  const { sender, message, group } = req.body;

  const sql = "INSERT INTO messages (sender, message, group_name) VALUES (?, ?, ?)";

  db.query(sql, [sender, message, group], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error");
    }
    res.json({ success: true });
  });
});

// GET MESSAGES
app.get("/messages/:group", (req, res) => {
  const group = req.params.group;

  const sql = "SELECT * FROM messages WHERE group_name=? ORDER BY timestamp ASC";

  db.query(sql, [group], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});