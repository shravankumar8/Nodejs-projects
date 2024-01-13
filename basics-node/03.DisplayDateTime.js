const http =require("http");
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'application/json'})
    res.write("the date and time no is "+Date())
}).listen(8080)

/*use createServer( )method to create http server
http.createServer()this function runs when someone triees to access the 
end point
res.writeHead("data")this function write the headers for HTTP */