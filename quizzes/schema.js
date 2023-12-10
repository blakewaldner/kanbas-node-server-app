import mongoose from "mongoose";
const questionScehma = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: ["MULTIPLE-CHOICE", "TRUE-FALSE", "FILL-BLANK"],
    default: "MULTIPLE-CHOICE"
  },
  question: String,
  points: Number,
  options: [String],
  correctAnswer: String,
  possibleAnswers: [String],
});
const quizSchema = new mongoose.Schema({
  title: String, 
  description: String,
  points: Number,
  shuffleAnswers: Boolean,
  timed: Boolean,
  published: Boolean,
  timeLimit: Number,
  dueDate: String,
  availableFrom: String,
  availableUntil: String,
  questions: [questionScehma]
},
  { collection: "quizzes" });
export default quizSchema;