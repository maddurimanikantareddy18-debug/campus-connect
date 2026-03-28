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
  password: "lovely_MSR", // 👈 YOUR PASSWORD
  database: "campus_connect"
});

db.connect((err) => {
  if (err) {
    console.log("Database Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// 🔥 TEST API
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


// 🔥 REGISTER API
app.post("/register", (req, res) => {
  const { role, name, email, password, roll, branch, year, phone, staff_id, department, club_name } = req.body;

  let query = "";
  let values = [];

  if (role === "Student") {
    query = "INSERT INTO student (name, roll, branch, year, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    values = [name, roll, branch, year, email, phone, password];
  }

  else if (role === "Admin") {
    query = "INSERT INTO admin (name, staff_id, department, role, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    values = [name, staff_id, department, role, email, phone, password];
  }

  else if (role === "Alumni") {
    query = "INSERT INTO alumni (name, branch, passout_year, company, job_role, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    values = [name, branch, year, req.body.company, req.body.job_role, email, phone, password];
  }

  else if (role === "Organization") {
    query = "INSERT INTO organizer (name, roll, club_name, role, year, email, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    values = [name, roll, club_name, role, year, email, phone, password];
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting data");
    }
    res.send("User Registered Successfully 🎉");
  });
});


// 🔥 START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
// 🔥 REGISTER API
app.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    role,
    roll,
    branch,
    year,
    phone
  } = req.body;

  const sql = `
    INSERT INTO student (name, email, password, roll, branch, year, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, password, roll, branch, year, phone],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving data" });
      }

      res.json({ message: "User Registered Successfully 🎉" });
    }
  );
});
// 🔥 LOGIN API
app.post("/login", (req, res) => {
  const { role, roll, email, password, club } = req.body;

  let query = "";

  if (role === "Student") {
    query = `SELECT * FROM student WHERE roll='${roll}' AND password='${password}'`;
  }

  else if (role === "Organization") {
    query = `SELECT * FROM organizer WHERE roll='${roll}' AND club_name='${club}' AND password='${password}'`;
  }

  else if (role === "Admin") {
    query = `SELECT * FROM admin WHERE email='${email}' AND password='${password}'`;
  }

  else if (role === "Alumni") {
    query = `SELECT * FROM alumni WHERE email='${email}' AND password='${password}'`;
  }

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length > 0) {
      res.json({ success: true, user: result[0], role });
    } else {
      res.json({ success: false, message: "Invalid Credentials ❌" });
    }
  });
});