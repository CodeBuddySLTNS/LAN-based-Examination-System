const dotenv = require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketConnection = require("./socket.io/connection");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// middlewares
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(require("./middlewares/authenticate"));

// routes
app.get("/", (req, res) => {
  res.json({ status: "online" });
});
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/subjects", require("./routes/subjects"));
app.use("/questions", require("./routes/questions"));
app.use("/exams", require("./routes/exams"));

// handle errors
app.use(require("./middlewares/errorHandler"));

// socket connection
socketConnection(server);

// run the server
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
