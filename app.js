import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db.js";
import {createUser, logIn} from "./Controllers/auth.js";
import { contact } from "./Controllers/contact.js";

dotenv.config()

const port = process.env.PORT || 4000;
const app = express();
connect();
const corsOptions = {
  origin: "*", // Replace with the origin of your front-end application
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies and HTTP authentication
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

/* health API to check if server is running*/

app.get("/api/health", (req, res) => {
  res.status(200);
  res.send({
    time: new Date(),
    server: "XenonStack",
    status: "Active",
  });
});

app.post("/api/auth/register",createUser)
app.post("/api/auth/login",logIn)
app.post("/api/contact",contact)

app.listen(port, () => {
    console.log(`Server is listening on url http://localhost:${port}`);
  });
