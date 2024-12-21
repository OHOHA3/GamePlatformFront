

export type LoginResponse = {
  accessToken: string;
};

export type  UserDetailsResponse = {
  id: number;
  username: string;
  email: "user" | "hr" | "admin";
}

export type LoginInfo = {
  login: string;
  password: string;
}
