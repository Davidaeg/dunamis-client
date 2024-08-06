export interface UserDb {
  idUsuario: number;
  nombreUsuario: string;
  contrasenna: string;
  idRol: string;
  idPersona: number;
}

export type User = {
  rootPath: string;
  routes: string[];
  username: string;
  id: number;
  userType: UserType;
  defaultRoute?: string;
};

export enum UserType {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  GUEST = "guest",
}

export type LoginForm = {
  username: string;
  password: string;
};
