import express from "express";
import { connectDb } from "./src/config/dbConenction.js";
import cors from "cors";
import "dotenv/config";
import path from "path";
// *********** All-Routes *************
import auth from "./src/routes/auth.routes.js";
import user from "./src/routes/user.routes.js";
// *********** All-Routes *************

import cookieParser from "cookie-parser";
const app = express();
// Use cors middleware
app.use(cors());

const _dirname = path.resolve();

app.use(
  cors({
    // origin: "*",
    origin: process.env.URL,
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed methods
    credentials: true,
  })
);

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *********** All-Routes *************

// app.get("/", (req, res) => {
//   res.json("I'm coming from backend");
// });
app.use("/api/auth/v1", auth);
app.use("/api/user/v1", user);

// for wrong apis
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found. Please check the URL and try again.",
//   });
// });

// Error handling middleware (optional, for other server errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
});

app.use(express.static(path.join(_dirname, "frontend/dist")));
app.get("/*", function (req, res) {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
const port = process.env.PORT || 8000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDb();
});
