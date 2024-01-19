// fetch("http://localhost:3000/admin/signup", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     username: "shravan user",
//     password: "userShravan@123",
//   }),
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
// let array = [
//   { id: 1, name: "Status" },
//   { id: 2, name: "error" },
//   { id: 3, name: "shravan13" },
//   { id: 4, name: "vinay3tf" },
//   { id: 5, name: "console" },
//   { id: 6, name: "venkey32" },
// ];
// k=array.find(
//   (e)=>{
//     return e.id==5
//   }
// )
// console.log(k.name)