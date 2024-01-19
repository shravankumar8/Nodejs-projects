const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
function idgen() {
  var id = Math.round(Math.random() * 99999);
  for (var i = 0; i < ADMINS.length; i++) {
    if (ADMINS[i].id == id) {
      id = Math.round(Math.random() * 99999);
    }
  }
  return id;
}

// transaction
function callbackfn(err) {
  if (err) throw err;
  if (err) console.log(err);
}
function writetofile(data) {
  fs.appendFile("transaction.txt", data + "\n", callbackfn);
}

function adminAuthentication(req, res, next) {
  const { username, password } = req.headers;
  admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    writetofile(req.headers.username + " has successfully authenticated");
    next();
  } else {
    writetofile(req.headers.username + "failed authentication");

    res.status(403).json({ message: "Admin authentication failed" });
  }
}
app.post("/admin/signup", (req, res) => {
  const admin = req.body;
  const existinguser = ADMINS.find((a) => a.username === admin.username);
  if (existinguser) {
    res.status(403).json({ message: " Admin already exists" });
    writetofile(admin.username + " trying to signup again ");
  } else {
    ADMINS.push(admin);
    res.status(200).json({ message: " Admin created successfully" });
    writetofile(admin.username + " has successfully signed up");
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  res.json({ message: "Login successful" });
  writetofile(req.headers.username + " has successfully logged in");
});
app.post("/admin/courses", adminAuthentication, (req, res) => {
  // logic to create a course
  let course = req.body;
  course.id = Date.now();
  COURSES.push(course);
  writetofile(
    req.headers.username + " has successfully created course " + course.id
  );
  res.json({ message: " cource created succesfully ", courseId: course.id });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  //   const courseIndex = COURSES.findIndex((course) => course.id === courseId);
  // logic to edit a course
  const id = parseInt(req.params.courseId);
  const course=COURSES.find(c=>c.id===id)
  if(course){
    Object.assign(course,req.body);
    res.json({message:"course updated successfully"})
  }else{
    res.status(404).json({message:"course not found"})
  }
})
app.get("/admin/courses", (req, res) => {
  username = req.headers.username;
  password = req.headers.password;

  if (!username) {
    res.status(400).json({ message: "Please enter a username" });
    return;
  } else if (!password) {
    res.status(400).json({ message: "Please enter a password" });
    return;
  }
  for (var i = 0; i < ADMINS.length; i++) {
    if (ADMINS[i].username == username && ADMINS[i].password == password) {
      let data = username + "has requested for complete cource list";
      fs.appendFile("transaction.txt", data, callbackfn);

      return res.send(COURSES);
    }
  }
  return res.send({
    message: "hello sir please  register as admin then request",
  });
  // logic to get all courses
});

// User routes
function userIdGenrator() {
  id = Math.round(Math.random() * 999999);
  for (var i = 0; i < USERS.length; i++) {
    if (USERS[i].id == id) {
      id = Math.round(Math.random() * 999999);
    }
  }
  return id;
}
app.post("/user/signup", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let userobj = {
    username: username,
    id: userIdGenrator(),
    password: password,
  };
  USERS.push(userobj);
  res.status(200).json({ message: "success user saved", userobj: userobj });
  // logic to sign up user
});

app.post("/users/login", (req, res) => {
  // logic to log in user
});

app.get("/users/courses", (req, res) => {
  // logic to list all courses
});

app.post("/users/courses/:courseId", (req, res) => {
  // logic to purchase a course
});

app.get("/users/purchasedCourses", (req, res) => {
  // logic to view purchased courses
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
