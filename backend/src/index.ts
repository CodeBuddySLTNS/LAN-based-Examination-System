import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

// Import routes
import auth from "./routes/auth";
import users from "./routes/users";

const port = 5000;
const app = express();

// middlewares
app.use((req, res, next) => {
  console.log(req.path);
  next();
})
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
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
