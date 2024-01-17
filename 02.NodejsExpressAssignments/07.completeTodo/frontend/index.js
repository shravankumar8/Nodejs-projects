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
todolistelement = document.getElementById("todolist");
function displayer(todos){
    
    todos.forEach(todo =>{
        const listItem = document.createElement("li")
        listItem.textContent = `title :${todo.title} description: ${todo.description}`;
        todolistelement.append(listItem)
    })
}
function pasredResponse(data){
    console.log(data);
    displayer(data)
}
function callback(resp){
    resp.json().then(pasredResponse)
}


async function alerted(inptit, inpDes) {
  console.log("rgferf");
  await fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify({
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
    
    
    alerted(inptit, inpDes);
    
});

p = document.getElementById("displaybtn").addEventListener("click", async(event)=>{
    

      
    await fetch("http://localhost:3000/todos", {
        method: "GET"
    })
    .then(callback);
    
    
})

