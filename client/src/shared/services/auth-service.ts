import HttpClient from "./http-client";

enum AuthEndPoints {
  LOGIN = "/user/login",
  SINGUP = "/user/signUp",
  VALIDATE_USER = "/user/validate-status",
}

class AuthService extends HttpClient {
  static async login(body: Record<string, string>) {
    const { data, error } = await this.post(AuthEndPoints.LOGIN, body);
    return { data, error };
  }

  static async signUp(body: Record<string, string>) {
    const { data, error } = await this.post(AuthEndPoints.SINGUP, body);
    console.log("data ", data, "error", error);
    return { data, error };
  }

  static async validateUser(token: string) {
    const { data, error } = await this.post(AuthEndPoints.VALIDATE_USER, {
      ...(token && { authorization: `Bearer ${token}` }),
    });
    return { data, error };
  }
}

export default AuthService;
