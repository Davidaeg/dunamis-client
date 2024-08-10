import { UserType } from "../users/user.types";

export const userRoutesMap: Record<UserType, string[]> = {
  [UserType.ADMIN]: ["/home", "/userstemp", "/reservation", "/personas", "/segmento", "/automovil", "/mantenimiento","/facturacion"],
  [UserType.EMPLOYEE]: ["/home", "/reservation"],
  [UserType.GUEST]: ["/home", "/login", "/about"],
};
