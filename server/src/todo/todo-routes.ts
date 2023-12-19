import { Router } from "express";
import {
  addTodo,
  deleteTodoById,
  getAllTodo,
  getTodoById,
} from "./todo-controller";
import { todoRequestValidators } from "./todo-model";
import { validateToken } from "../../middleware/validate-token";

const route: Router = Router();

route.get("/getAll", validateToken, getAllTodo);

route.get("/get/:id", validateToken, getTodoById);

route.post("/add", validateToken, todoRequestValidators, addTodo);

route.post("/delete/:id", validateToken, deleteTodoById);

export default route;
