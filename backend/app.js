import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import workoutRoutes from "./routes/workout.routes.js";
import exerciseRoutes from "./routes/exercise.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/workout", workoutRoutes);
app.use("/exercise", exerciseRoutes)

// server start -> nejdrive pripojit db a pak zapnout server
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");
    app.listen(5001, () => {
      console.log(`Server is running on port 5001`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

startServer();
