export interface PersonaDB {
  idPersona: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: string;
  numeroTelefono: string;
  numeroCelular: string;
  email: string;
}

export type Person = {
  rootPath: string;
  routes: string[];
  username: string;
  id: number;
  personType: PersonType;
  defaultRoute?: string;
};

export enum PersonType {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  GUEST = "guest",
}

export type LoginForm = {
  username: string;
  password: string;
};