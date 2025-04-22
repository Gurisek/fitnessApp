import express from "express";
import {
  createWorkoutController,
  getAllWorkoutsController,
  getWorkoutByIdController,
  updateWorkoutController,
  deleteWorkoutController,
} from "../controllers/workout.controller.js";

const router = express.Router();

router.post("/create", createWorkoutController);
router.get("/", getAllWorkoutsController);
router.get("/:id", getWorkoutByIdController);
router.put("/:id", updateWorkoutController);
router.delete("/:id", deleteWorkoutController);

export default router;
