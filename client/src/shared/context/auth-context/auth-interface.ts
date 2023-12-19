export interface AuthInterface {
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (
    name: string,
    email: string,
    gender: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  getAuthToken: () => string;
  authValue: string;
  authErrors: Record<string, string>;
}

export const authStateDefaultValues: AuthInterface = {
  isAuthenticated: false,
  loading: true,
  signUp: async (
    name: string,
    email: string,
    gender: string,
    password: string
  ) => {},
  login: async (email: string, password: string) => {},
  getAuthToken: () => "",
  authValue: "",
  authErrors: {},
};
