

export type LoginResponse = {
  access_token: string;
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
