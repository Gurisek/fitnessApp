import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter exercise name"],
  },
  description: {
    type: String,
    required: [true, "Please enter exercise description"],
  },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

export default Exercise;
