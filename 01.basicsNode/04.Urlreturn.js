var http = require("http");
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "test/plain" });
    if (req.url == "/123") {
      res.write("gfbyuruyrg");
    }
    res.end();
  })
  .listen(8080);
