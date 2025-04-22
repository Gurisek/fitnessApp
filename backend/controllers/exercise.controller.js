import {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../dao/exercise.dao.js";
import { updateWorkoutExercises } from "../dao/workout.dao.js"; // Import function to update workouts

// Vytvori exercise
export const createExerciseController = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Name, description and type are required." });
  }

  try {
    const newExercise = await createExercise({
      name,
      description,
    });
    res.status(201).json(newExercise);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while saving exercise." });
  }
};

// Vraci vsechny exercises
export const getAllExercisesController = async (req, res) => {
  try {
    const exercises = await getAllExercises();
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Vraci exercise podle id
export const getExerciseByIdController = async (req, res) => {
  try {
    const exercise = await getExerciseById(req.params.id);
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// upravi exercise podle id
export const updateExerciseController = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await updateExercise(id, req.body);
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });

    const updatedExercise = await getExerciseById(id);
    res.json(updatedExercise);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// smazani exercise podle id
export const deleteExerciseController = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await deleteExercise(id);
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });

    // Remove the exercise ID from related workouts
    await updateWorkoutExercises(id);

    res.status(200).json({ message: "Exercise deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
