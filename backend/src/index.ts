import "dotenv/config";
import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

// Import routes
import auth from "./routes/auth";
import users from "./routes/users";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;

// middlewares
app.use((req, res, next) => {
  console.log(req.path);
  next();
});
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Online.");
});
app.use("/auth", auth);
app.use("/users", users);

// handle errors
app.use(errorHandler);

// run the server
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
