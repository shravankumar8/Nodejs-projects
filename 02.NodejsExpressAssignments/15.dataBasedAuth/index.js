const express = require("express");
const app = express();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// define mongoose schemas


let mongoosekey ="mongodb+srv://kumashravan5:8Piz3bZ9jNpMkAJq@cluster0.t8zf1dw.mongodb.net/";

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
try {
  ADMINS = JSON.parse(fs.readFileSync("admins.json", "utf8"));
  USERS = JSON.parse(fs.readFileSync("users.json", "utf8"));
  COURSES = JSON.parse(fs.readFileSync("courses.json", "utf8"));
} catch (error) {
  // If an error occurs during reading, initialize the variables as empty arrays
  ADMINS = [];
  USERS = [];
  COURSES = [];
}
console.log(ADMINS);


// Admin routes


// transaction
function callbackfn(err) {
  if (err) throw err;
  if (err) console.log(err);
}
function writetofile(data) {
  fs.appendFile("transaction.txt", data + "\n", callbackfn);
}
var jwtKeyAdmin = "provenworksAdmin";
function generateJwt(user) {
  const payload = { username: user.username };
  return (token = jwt.sign(payload, jwtKeyAdmin, { expiresIn: "1h" }));
}

function adminAuthentication(req, res, next) {
  const { username, password } = req.headers;
  admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    req.admin = admin;
    writetofile(req.headers.username + " has successfully authenticated");
    next();
  } else {
    writetofile(req.headers.username + "failed authentication");

    res.status(403).json({ message: "Admin authentication failed" });
  }
}
function authenticateJwtAdmin(req, res, next) {
  authHeader = req.headers.authorization;

  if (authHeader) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, jwtKeyAdmin, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "unable to verify user" });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}
app.post("/admin/signup", (req, res) => {
  const admin = req.body;
  const existinguser = ADMINS.find((a) => a.username === admin.username);
  if (existinguser) {
    res.status(403).json({ message: " Admin already exists" });
  } else {
    ADMINS.push(admin);
     fs.writeFileSync("admins.json", JSON.stringify(ADMINS));
    let token = generateJwt(admin);
    res.status(200).json({ message: " Admin created successfully", token });
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
    
  let token = generateJwt(req.admin);
  res.json({ message: "Login successful", token });
  writetofile(req.headers.username + " has successfully logged in");
});
app.post("/admin/courses", authenticateJwtAdmin, (req, res) => {
  // logic to create a course
  let course = req.body;
  course.id = Date.now();
  COURSES.push(course);
  fs.writeFileSync("courses.json", JSON.stringify(COURSES));
  writetofile(
    req.user.username + " has successfully created course " + course.id
  );
  res.json({ message: " cource created succesfully ", courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwtAdmin, (req, res) => {
  //   const courseIndex = COURSES.findIndex((course) => course.id === courseId);
  // logic to edit a course
  const id = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === id);
  if (course) {
    Object.assign(course, req.body);
     fs.writeFileSync("courses.json", JSON.stringify(COURSES));
    res.json({ message: "course updated successfully" });
  } else {
    res.status(404).json({ message: "course not found" });
  }
});
app.get("/admin/courses", authenticateJwtAdmin, (req, res) => {
  return res.send(COURSES);
});

// User routes
jwtKeyUser = "provenworksUser";
function generateJwtuser(user) {
  payload = { username: user.username };
  return (token = jwt.sign(payload, jwtKeyUser, { expiresIn: "1h" }));
}
app.post("/user/signup", (req, res) => {
  const user = { ...req.body, purchasedCourses: [] };
  //   console.log(user,user.username)
  token = generateJwtuser(user);
  USERS.push(user);
   fs.writeFileSync("users.json", JSON.stringify(USERS));
  res.json({ message: "user created succesfully", token });
  // logic to sign up user
});
function userAuthentication(req, res, next) {
  const { username, password } = req.body;
  const user = USERS.find(
    (user) => user.username == username && user.password == password
  );
  if (user) {
    res.user = user;
    next();
  } else {
    res.status(403).json({ message: "user authentication failed" });
  }
}
function authenticateJwtUser(req, res, next) {
  let jwtHeader = req.headers.authorization;
  let token = jwtHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, jwtKeyUser, (err, user) => {
      if (err) {
        res.status(403).json({ message: "unauthorized details not found" });
      } else {
        res.user = user;
        // console.log(user)
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
}

app.post("/users/login", userAuthentication, (req, res) => {
  // console.log(res.user)
  token = generateJwtuser(res.user);
  res.json({ message: "user login successful", token });
  // logic to log in user
});

app.get("/users/courses", authenticateJwtUser, (req, res) => {
  res.json({ cources: COURSES.filter((c) => c.published) });
  // logic to list all courses
});

app.post("/users/courses/:courseId", authenticateJwtUser, (req, res) => {
  courceId = parseInt(req.params.courseId);
  //   console.log(courceId);
  cource = COURSES.find((c) => c.published && c.id === courceId);
  //   console.log(cource);
  if (cource) {
    userpurchase = USERS.find((u) => u.username === res.user.username);
    userpurchase.purchasedCourses.push(cource);
    fs.writeFileSync("users.json", JSON.stringify(USERS));
    console.log(userpurchase);
    res.json({ message: "cource purchased successfully" });
  } else {
    res.status(404).json({ message: "cource not found or available " });
  }

  // logic to purchase a course
});

app.get("/users/purchasedCourses", authenticateJwtUser, (req, res) => {
  userpurchase = USERS.find((u) => u.username === res.user.username);

  res.json({ courses: userpurchase.purchasedCourses });
  // logic to view purchased courses
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
