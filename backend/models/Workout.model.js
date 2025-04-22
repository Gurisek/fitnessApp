import mongoose from "mongoose";
import Exercise from "./Exercise.model.js";

const WorkoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      message: "Please enter workout name",
    },
    description: {
      type: String,
      required: false,
    },
    exercises: [
      {
        exercise: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
          required: [true, "Exercise reference is required"],
        },
        sets: {
          type: Number,
          required: [true, "Please enter sets"],
        },
        reps: {
          type: Number,
          required: false,
        },
        weight: {
          type: Number,
          required: false,
        },
        duration: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

export default Workout;
