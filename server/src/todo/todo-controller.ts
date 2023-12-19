import { Request, Response } from "express";
import Todo from "./todo-model";
import { generateErrorObjectExpressValidator } from "../utils";

export const getAllTodo = async (_: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.find({}).select("-__v").lean();
    res.status(200).json({ error: null, data: todo });
  } catch (error) {
    res.status(404).json({ error, data: null });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const { todoTask, todoDescription } = req.body;

  const { errors, hasErrors } = generateErrorObjectExpressValidator(req);
  if (hasErrors) {
    return res.status(404).json({ data: null, error: errors });
  }

  try {
    const todo = new Todo({
      todoTask,
      todoDescription,
    });

    await todo.save();
    return res.status(200).json({ error: null, data: todo });
  } catch (error) {
    res.status(404).json({ data: null, error: "External Server Error" });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  const id = req.params?.id;

  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: id });
    res.json({
      error: null,
      data: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({ data: null, error: "External Server Error" });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  const id = req.params?.id;

  try {
    const todo = await Todo.findById(id).select("-__v").lean();

    if (!todo) {
      return res.status(404).json({ data: null, error: "No such user found" });
    }

    return res.status(200).json({ error: null, data: todo });
  } catch (error) {
    res.status(404).json({ data: null, error: "External Server Error" });
  }
};
