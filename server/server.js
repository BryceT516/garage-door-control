var port = '4000'
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
          }
});

io.on("connection", client => {
    console.log("connection made!");
})




httpServer.listen(port);