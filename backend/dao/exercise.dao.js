import Exercise from "../models/Exercise.model.js";

export const createExercise = async (exerciseData) => {
    const exercise = new Exercise(exerciseData);
    return await exercise.save();
}

export const getAllExercises = async () => {
    return await Exercise.find();
}

export const getExerciseById = async (id) => {
    return await Exercise.findById(id);
}

export const updateExercise = async (id, exercise) => {
    return await Exercise.findByIdAndUpdate(id, exercise);
}

export const deleteExercise = async (id) => {
    return await Exercise.findByIdAndDelete(id);
}