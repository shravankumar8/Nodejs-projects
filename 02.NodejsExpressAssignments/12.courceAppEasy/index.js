  const express = require("express");
  const app = express();
  const fs= require("fs");
  app.use(express.json());

  let ADMINS = [];
  let USERS = [];
  let COURSES = [];

  // Admin routes
  function idgen(){
    var id = Math.round(Math.random() * 99999);
    for (var i = 0; i < ADMINS.length; i++) {
      if (ADMINS[i].id == id) {
        id = Math.round(Math.random() * 99999);
      }
    }
    return id;
  }

  // transaction
  function callbackfn(err){
    if (err) throw err;
  if(err)console.log(err);
  }
  function writetofile(data){
    fs.appendFile("transaction.txt", data+"\n", callbackfn);

  }
  app.post("/admin/signup", (req, res) => {
    const admin =req.body
    const existinguser=ADMINS.find((a)=>a.username ===admin.username)
    if(existinguser) {
      res.status(403).json({message:" Admin already exists"})
      writetofile(admin.username+" trying to signup again ")
    }else{
      ADMINS.push(admin)
      res.status(200).json({message:" Admin created successfully"})
      writetofile(admin.username+" has successfully signed up")
      
    }
   

   
  });

  app.post("/admin/login", (req, res) => {
    if (ADMINS.length == 0) {

      res.json({
        message: "please signup first ",
      });
      return;
    }
    
    username = req.body.username;
    password = req.body.password;
    for (var i = 0; i < ADMINS.length; i++) {
      if (ADMINS[i].username === username && ADMINS[i].password === password) {
        data = username + "has login  on the site" + password+ "\n";

        fs.appendFile("transaction.txt", data, callbackfn);
        res.json({ message: "Logged in successfully" }).send();
        return;
      }
    }
    res.status(403).send({ message:"admin not found register karlon" });
    return

    // logic to log in admin
  });
  function adminvertfy(username, password) {
    for (var i = 0; i < ADMINS.length; i++) {
      if (ADMINS[i].username === username && ADMINS[i].password === password) {
        return true;
      }
    }
    return false;
  }
  function courceidgen(){
    var id = Math.round(Math.random() * 99999);
    for (var i = 0; i < COURSES.length; i++) {
      if (COURSES[i].id == id) {
        id = Math.round(Math.random() * 99999);
      }
    }
    return id;
    
  }
  app.post("/admin/courses", (req, res) => {
    let username = req.headers.username;

    let password = req.headers.password;
    if (adminvertfy(username, password)) {
      let title = req.body.title;
      let description = req.body.description;
      let price = req.body.price;
      let imagelink = req.body.link;
      let published = req.body.published;
      var id=courceidgen()
      data = username + "admin has created a cource with id " + id + "\n";
    
      fs.appendFile("transaction.txt", data, callbackfn);
      let courceobj = {
        id:id,
        username: username,
        password: password,
        title: title,
        description: description,
        price: price,
        imagelink: imagelink,
        published: published,
      };

      COURSES.push(courceobj);
      res.status(200).json(courceobj);
      return;
    } else {
      res.status(401).json({ message: "invalid admin details! not found" });
    }
    // logic to create a course
  });

  app.put("/admin/courses/:courseId", (req, res) => {
    //   const courseIndex = COURSES.findIndex((course) => course.id === courseId);
    // logic to edit a course
    username=req.headers.username
    password=req.headers.password
    
    const id = req.params.courseId;
    index = COURSES.findIndex((cource) => cource.id == id);
    let newdata=req.body;
    // function to check if username is provided
    if(!username){
      res.status(400).json({message: "Please enter a username"})
      return
    }else if(!password){
      res.status(400).json({message: "Please enter a password"})
      return
    }
    // function to check if password and username match the cource createtor 
    if(index!=-1){
      if(COURSES[index].username==username && COURSES[index].password==password){
        COURSES[index]={...COURSES[index], ...newdata}
        message={message:'the new information is updated successfully'}
      return res.status(200).send(message);

      }else{
      return res.status(401).json({message:"either username or password is incorrect"})
      }

    }
    // -1 index is returned when the provided index is not found in the courcelist ID\s
    if(index==-1){
    return res.send(404).json({error:"cource id not found"})
    }


  });

  app.get("/admin/courses", (req, res) => {
    username=req.headers.username
    password=req.headers.password

    if(!username){
   res.status(400).json({message: "Please enter a username"})
   return
 }else if(!password){
   res.status(400).json({message: "Please enter a password"})
   return
 }
    for(var i=0; i<ADMINS.length;i++){
      if(ADMINS[i].username==username&&ADMINS[i].password==password){
        let data=username+"has requested for complete cource list"
        fs.appendFile("transaction.txt", data, callbackfn);

        return res.send(COURSES)
      }
    }
    return res.send({message:"hello sir please  register as admin then request"})
    // logic to get all courses
  });

  // User routes
  function userIdGenrator(){
    id=Math.round(Math.random()*999999)
    for(var i=0;i<USERS.length;i++){
      if( USERS[i].id==id){
        id=Math.round(Math.random()*999999)
        
      }
    }
    return id
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
