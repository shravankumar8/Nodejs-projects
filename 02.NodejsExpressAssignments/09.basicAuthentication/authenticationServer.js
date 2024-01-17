/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */
const bodyParser = require("body-parser");
const express = require("express");
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
users = [
  {
    username: "shravan",
    email: "kumashravan5@gmail.com",
    password: 123456,
    id: 12334,
  },
];
// this function data checkers checks if the data receiver through the body matches the data in the array object
app.use("/signup",datachecker)
function datachecker(req, res, next) {
  datatocheck = req.body;
  for (var i = 0; i < users.length; i++) {
    if (req.body.username == users[i].username) {
      res.send("user name already exists");
    
      return
    } else if (req.body.email == users[i].email) {
      res.send("user email already exists please enter a different email");
      return
    }
  }
  next()
}
// function to check if user id exists or there is a need to generate another ?
function  idgenerator(){
  id = Math.round(Math.random() * 1000000);
  for (var i = 0;i<users.length;i++) {
    if(id == users[i].id) {
      id = Math.round(Math.random() * 1000000);
      return id    
  }
  return id
}}
// end of data checks returns promopts if true else next
function signuper(req, res) {
  k = req.body;

  k["id"] = idgenerator()
  
  console.log(users);
  users.push(k);

  res.send("signup succesfull");
}
app.post("/signup", signuper);
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server
app.get("/getusers", displayusers)
// function to display all users 
function displayusers(req,res) {
  res.send(users)

}
app.post("/login",login)
function login(req,res) {
  email=req.body.email
  password=req.body.password
  for(var i=0;i<users.length;i++){
    if(users[i].email==email && users[i].password==password){
      var prompt=`login succesfull welcome ${users[i].username} `
      res.send(prompt)
      console.log("email: " + users[i].username)
      return

    }
  }
  res.send("login failed");
}

app.listen(PORT, () => {
  console.log("THE SERVER IS UP! @ http://localhost:" + PORT);
});

module.exports = app;
