import {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
} from "../dao/workout.dao.js";

// Vytvori workout
export const createWorkoutController = async (req, res) => {
  const { name, description, exercises } = req.body;

  if (!name || !Array.isArray(exercises) || exercises.length === 0) {
    return res
      .status(400)
      .json({ message: "Name and at least one exercise are required." });
  }

  for (const ex of exercises) {
    if (!ex.exercise || !ex.sets || (!ex.reps && !ex.duration)) {
      return res.status(400).json({
        message: "Each exercise must have sets and reps or duration.",
      });
    }
  }

  try {
    const newWorkout = await createWorkout({ name, description, exercises });
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while saving workout." });
  }
};

// Vraci vsechny workouty
export const getAllWorkoutsController = async (_, res) => {
  try {
    const workouts = await getAllWorkouts();
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Vraci workout podle id
export const getWorkoutByIdController = async (req, res) => {
  try {
    const workout = await getWorkoutById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateWorkoutController = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await updateWorkout(id, req.body);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    const updatedWorkout = await getWorkoutById(id);
    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteWorkoutController = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await deleteWorkout(id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
