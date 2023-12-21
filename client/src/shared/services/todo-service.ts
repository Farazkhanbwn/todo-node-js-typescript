import HttpClient from "./http-client";

enum TodoEndPoints {
  ADD_TODO = "/todo/add",
  GET_ALL = "/todo/getAll",
  DELETE_TODO = "/todo/delete/:id",
}

type FormDataType = Record<
  string,
  string | number | FormData | null | string[]
>;

class TodoService extends HttpClient {
  static async addTodo(body: FormDataType, token: string) {
    const { data, error } = await this.post(TodoEndPoints.ADD_TODO, body, {
      ...(token && { authorization: `Bearer ${token}` }),
    });
    return { data, error };
  }

  static async deleteTodo(id: string, token: string) {
    const { data, error } = await this.post(
      TodoEndPoints.DELETE_TODO.replace(":id", id),
      {},
      {
        ...(token && { authorization: `Bearer ${token}` }),
      }
    );
    return { data, error };
  }

  static async getAllTodo(token: string) {
    const { data, error } = await this.get(TodoEndPoints.GET_ALL, {
      ...(token && { authorization: `Bearer ${token}` }),
    });
    return { data, error };
  }
}

export default TodoService;
