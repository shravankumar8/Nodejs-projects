const express = require("express");
const app = express();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(express.json());
// define mongoose schemas
// admins schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  Price: Number,
  imageLink: String,
  published: Boolean,
});
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
mongoose.connect(
  "mongodb+srv://kumashravan5:8Piz3bZ9jNpMkAJq@cluster0.t8zf1dw.mongodb.net/"
);

// Admin routes

var jwtKeyAdmin = "provenworksAdmin";
function generateJwt(username) {
  const payload = { username};
  return (token = jwt.sign(payload, jwtKeyAdmin, { expiresIn: "1h" }));
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
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: " Admin already exists" });
  } else {
    const newAdmin = new Admin({ username: username, password: password });
    await newAdmin.save();
    let token = generateJwt(username);
    res.status(200).json({ message: " Admin created successfully", token });
  }
});

app.post("/admin/login", adminAuthentication,async (req, res) => {
  const { username, password } = req.headers;
  admin = await Admin.findOne({ username: username, password: password });
  if (admin) {
    let token = generateJwt(username);
    res.json({ message: "Login successful", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});
app.post("/admin/courses", authenticateJwtAdmin,async (req, res) => {
  // logic to create a course
  const course = new Course(req.body)
  await course.save() 
  res.json({ message: " cource created succesfully ", courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwtAdmin,async (req, res) => {
  // logic to edit a course
const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
if (course) {
    res.json({ message: "course updated successfully" });
  } else {
    res.status(404).json({ message: "course not found" });
  }
})


app.get("/admin/courses", authenticateJwtAdmin,async (req, res) => {
  const courses= await Course.find({})
  return res.json({courses});
});

// User routes
jwtKeyUser = "provenworksUser";
function generateJwtuser(username) {
  payload = { username };
  return (token = jwt.sign(payload, jwtKeyUser, { expiresIn: "1h" }));
}
// logic to sign up user
app.post("/user/signup",async (req, res) => {
  const {username, password} = req.body;
  const user=await User.findOne({ username: username,})
if(user){
  res.json({message:"useer already exists",})
  
}else{
  newuser=User({username,password})
  await newuser.save()
  token=generateJwtuser(username);
  res.json({ message: "user created succesfully", token });

}

});
function  (req, res, next) {
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
