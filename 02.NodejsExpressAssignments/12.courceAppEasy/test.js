// let admins=[
//     {
//         username: 'admin',
//         password: 'password'
//     },
//     {
//         username: 'shravan',
//         password: 'Shravan@123'
//     },
//     {
//         username: 'venkey',
//         password: 'Venkey@123'
//     }
    
// ]

// username = 'shravan'
// password = 'Sh23ravan@123'
// checker(username, password);
// function checker(username, password){
//     for (var i=0; i<admins.length; i++) {
//       if (admins[i].username===username && admins[i].password===password) {
//         console.log("alright loginkaron")
//         return
//       }
//     }
//     console.log("alright not logged")
// }
let obj = {
  name: "shravam",
  age: "124",
  loc: "hyderabad",
};

let ob1 = {
  name: "venkey",
};

obj = { ...obj, ...ob1 };

console.log(obj);

