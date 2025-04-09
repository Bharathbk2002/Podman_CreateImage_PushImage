var http = require('http');

http.createServer(function(req, res) {
    res.write("Hello, world!");
    res.end();
}).listen(4000, function() {
    console.log("Server is running on http://localhost:4000");
});
