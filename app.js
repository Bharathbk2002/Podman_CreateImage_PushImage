var http = require('http');

const server = http.createServer(function(req, res) {
    res.write("Hello, world!");
    res.end();
}).listen(4000, function() {
    console.log("Server is running on http://localhost:4000");
});

module.exports=server;
