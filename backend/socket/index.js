import { Server} from "socket.io";
import express from "express";
import { createServer } from "http";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", ["http://localhost:5173/"]],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

io.on('connection', (socket)=>{
    console.log(`The socket id is ${socket.id}`)

    socket.on()
})
const port = process.env.PORT

server.listen(port, ()=>{
    console.log(`socket server running on port ${port}`)
})