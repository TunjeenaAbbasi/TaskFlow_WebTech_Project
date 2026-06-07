// // 
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import taskRoutes from "./routes/taskRoutes";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors({
//   origin: "http://localhost:5173"
// }));

// app.use(express.json());
// app.use("/tasks", taskRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import taskRoutes from "./routes/taskRoutes.js"; // Fixed: Added .js extension

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors({
//   origin: "http://localhost:5173"
// }));

// app.use(express.json());
// app.use("/tasks", taskRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});