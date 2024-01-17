const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
function idgen(){
 var  id=Math.round(Math.random()*99999)
  for(var i=0;i<ADMINS.length;i++){
    if(ADMINS[i].id==id){
      id=Math.round(Math.random()*99999)
      
    }
  }
  return id
}
app.post('/admin/signup', (req, res) => {
  username=req.body.username;
  password=req.body.password;
  adminobj={
    id:idgen(),
    username: username,
    password: password
  }
  ADMINS.push(adminobj)
  console.log(adminobj)
  res.send(adminobj)
  // logic to sign up admin
});

app.post('/admin/login', (req, res) => {
  username = req.body.username
  password = req.body.password
  for(var i=0; i<ADMINS.length; i++) {
    if(ADMINS[i].username === username && ADMINS[i].password === password){
      res.json({message:"Logged in successfully"})
    }
  }
  // logic to log in admin
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
