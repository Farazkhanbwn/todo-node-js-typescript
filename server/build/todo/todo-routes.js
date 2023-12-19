"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("./todo-controller");
const route = (0, express_1.Router)();
route.get("/", todo_controller_1.Home);
exports.default = route;
