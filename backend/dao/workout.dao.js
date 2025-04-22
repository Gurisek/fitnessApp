import Workout from "../models/Workout.model.js";
import mongoose from "mongoose";

export const createWorkout = async (workoutData) => {
  const workout = new Workout(workoutData);
  return await workout.save();
};

export const getAllWorkouts = async () => {
  return await Workout.find().populate("exercises.exercise");
};

export const getWorkoutById = async (id) => {
  return await Workout.findById(id).populate("exercises.exercise");
};

export const updateWorkout = async (id, workout) => {
  return await Workout.findByIdAndUpdate(id, workout);
};

export const deleteWorkout = async (id) => {
  return await Workout.findByIdAndDelete(id);
};

export const updateWorkoutExercises = async (exerciseId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(exerciseId);

    await Workout.updateMany(
      {},
      {
        $pull: {
          exercises: {
            exercise: objectId,
          },
        },
      }
    );
  } catch (error) {
    console.error("Error updating workouts:", error);
    throw error;
  }
};
