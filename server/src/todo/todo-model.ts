import { check } from "express-validator";
import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  todoTask: { type: String, required: true },
  todoDescription: { type: String, required: true },
});

const Todo = model("todo", todoSchema);

export default Todo;

export const todoRequestValidators = [
  check("todoTask", "Minimum Lenght should be 5 characters").trim().isLength({
    min: 5,
  }),
  check("todoDescription", "Min length should be 8 characters")
    .trim()
    .isLength({
      min: 8,
    }),
];
