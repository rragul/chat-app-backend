const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://rragul.github.io/",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        console.log(`user with id ${socket.id} joined room ${data}`);
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        io.to(data.room).emit("receive_message", data);
        socket.off("receive_message", (data) => {
            console.log(data);
        });
    });
    socket.on("disconnect", () => {
        console.log("users disconnected", socket.id);
    });



})

server.listen(5000, () => {
    console.log("server start..");
})