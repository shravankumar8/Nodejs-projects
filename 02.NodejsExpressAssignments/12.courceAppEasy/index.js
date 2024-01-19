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
  const course = COURSES.find((c) => c.id === id);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "course updated successfully" });
  } else {
    res.status(404).json({ message: "course not found" });
  }
});
app.get("/admin/courses", adminAuthentication, (req, res) => {
  return res.send(COURSES);
});

// User routes
app.post("/user/signup", (req, res) => {
  const user = { ...req.body, purchasedCourses: [] };
  USERS.push(user);
  res.json({ message: "user created succesfully" });
  // logic to sign up user
});
function userAuthentication(req, res, next) {
  const { username, password } = req.headers;
  const user = USERS.find(
    (user) => user.username == username && user.password == password
    );
    if (user) {
    res.user=user
    next();
  } else {
    res.status(403).json({ message: "user authentication failed" });
  }
}

app.post("/users/login", userAuthentication, (req, res) => {
  res.json({ message: "user login successful" }); 
  // logic to log in user
});

app.get("/users/courses", userAuthentication, (req, res) => {
  res.json({cources:COURSES.filter(c=>c.published)})
  // logic to list all courses
});

app.post("/users/courses/:courseId", userAuthentication,(req, res) => {
  courceId=parseInt(req.params.courseId);
  console.log(courceId);
  cource=COURSES.find(c=>c.published && c.id===courceId)
  console.log(cource)
  if(cource){
    res.user.purchasedCourses.push(cource)
    res.json({message:"cource purchased successfully"})
    
  }else{
    res.status(404).json({message:"cource not found or available "})
  }



  // logic to purchase a course
});

app.get("/users/purchasedCourses",userAuthentication ,(req, res) => {
  res.json({courses:res.user.purchasedCourses})
  // logic to view purchased courses
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
