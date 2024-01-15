var sendobj={
    method:"GET"
}
function logResponseBody(jsonBody){
    console.log(jsonBody)

}
function callbackfn(result){
    result.json().then(logResponseBody)
}
fetch("http://localhost:3000/page?counter=343", sendobj).then(callbackfn);