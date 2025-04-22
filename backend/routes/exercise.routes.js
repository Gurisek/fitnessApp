import express from "express";
import {
  createExerciseController,
  getAllExercisesController,
  getExerciseByIdController,
  updateExerciseController,
  deleteExerciseController,
} from "../controllers/exercise.controller.js";

const router = express.Router();

router.post("/create", createExerciseController);
router.get("/", getAllExercisesController);
router.get("/:id", getExerciseByIdController);
router.put("/:id", updateExerciseController);
router.delete("/:id", deleteExerciseController);

export default router;
