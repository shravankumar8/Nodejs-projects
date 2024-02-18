const express=require("express")
const app=express()
require ("dotenv").config();
const PORT=process.env.PORT;
const DBURL=process.env.DBURL;
const cors = require("cors");
const mongoose=require("mongoose")
mongoose.connect(DBURL)
const todoSchema = new mongoose.Schema({
  todo: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
});
const Todos=mongoose.model("Todos",todoSchema)
app.use(cors())
app.post("/todo", async(req,res)=>{
	let todo=req.headers.todo;
	let description=req.headers.description
	const  newTodo=new Todos({
	todo:todo,
	description:description})
	try {
		await newTodo.save()
		
	} catch (error) {
		 res.send(error)
	return;
	}

	res.send("succes saving shit")
	
})


app.get("/todo",async (req,res)=>{
 let alltodos=await Todos.find({})
res.json(alltodos);
})
app.listen(PORT,()=>{
	console.log("listening on port"+PORT)
})
