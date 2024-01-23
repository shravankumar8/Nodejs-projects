// window.addEventListener("load", (event) => {
//   console.log("page is fully loaded");
// });
// function fetcher(method){
//     fetch("http://localhost:3000/todos/")
//     .then(response => response.json())
//     .then(data => {
//         rendertodos(data);
//     }).catch(error => console.log("error"));


// }
// 
// function rendertodos(data){
// todolistelement.innerHTML = ''
//   todos.forEach((todo) => {
//     const liElement = document.createElement("li");
//     liElement.textContent = `${todo.title} - ${todo.description}`;
//     todoListElement.appendChild(liElement);
//   });
// }


// var a=document.createElement("div")
async function deleteTodo(id){
    await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
   
    headers: {
      "Content-Type": "application/json",
    },
  }).then(()=>{
    console.log("delte done")
  });
  

}
function displayer(data) {
  d=document.getElementById("todolist");
  d
  .innerHTML = ""
  for (var i = 0; i < data.length; i++) {
    var parentElement = document.getElementById("todolist");
    var childElement = document.createElement("div");
    var grandChildElement1=document.createElement("span");
    grandChildElement1.innerHTML = data[i].title;

    var grandChildElement2= document.createElement("span");
    grandChildElement2.innerHTML = data[i].description;

    var grandChildElement3= document.createElement("button");
    grandChildElement3.innerHTML ="Delete";
    grandChildElement3.setAttribute("onclick","deleteTodo("+data[i].id+")")

    childElement.appendChild(grandChildElement1);
    childElement.appendChild(grandChildElement2);
    childElement.appendChild(grandChildElement3);
    parentElement.appendChild(childElement)
  }}
    

  // let htmlString = ""; // Initialize an empty string to accumulate HTML

  // todos.forEach((todo) => {
  //   // Concatenate the HTML string with the content for each todo
  //   htmlString += `<li>Title: ${todo.title} Description: ${todo.description}</li>`;
  // });

  // // Set the innerHTML of the todolistelement with the accumulated HTML string
  // todolistelement.innerHTML = `<ul>${htmlString}</ul>`;

function pasredResponse(data){
  //   console.log(data);
  //   var parentElement = document.getElementById("todolist");
  //   var childElement = document.createElement("div");
  //   var grandChildElement1 = document.createElement("span");
  //   grandChildElement1.innerHTML = data.title;

  //   var grandChildElement2 = document.createElement("span");
  //   grandChildElement2.innerHTML = data.description;

  //   var grandChildElement3 = document.createElement("button");
  //   grandChildElement3.innerHTML = "Delete";
  // br=document.createElement("br");
  //   childElement.appendChild(grandChildElement1);
  //   childElement.appendChild(grandChildElement2);
  //   childElement.appendChild(grandChildElement3);
  //   parentElement.appendChild(childElement);
  //   parentElement.appendChild(br);
    displayer(data)
}
function callback(resp){
    resp.json().then(pasredResponse)
}


async function alerted(inptit, inpDes) {
  
  await fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify({
      id: Date.now(),
      title: inptit,
      description: inpDes,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(callback);
}

k = document.getElementById("submitbtn").addEventListener("click", ()=>{
    inptit = document.getElementById("inpTit").value
    inpDes = document.getElementById("inpDes").value
    document.getElementById("inpTit").value=""
    document.getElementById("inpDes").value=""
    
    
    alerted(inptit, inpDes);
    
});

p = document.getElementById("displaybtn").addEventListener("click", async(event)=>{
    

      
    await fetch("http://localhost:3000/todos", {
        method: "GET"
    })
    .then(callback);
    
    
})

