import { Home } from "../home/Home";
import { About } from "../about/About";
import { RouteType } from "./routes.types";
import { Personas } from "../personas/Personas";
import { Users } from "../users/Users";

import { Reservation } from "../reservation/Reservation";
import { FaBook, FaHouse, FaPeopleLine, FaUsersGear } from "react-icons/fa6";

export const appRoutes: RouteType[] = [
  {
    path: "/home",
    name: "Inicio",
    component: Home,
    icon: FaHouse,
    layout: "/",
  },
  {
    path: "/about",
    name: "Sobre Nosotros",
    component: About,
    layout: "/",
  },
  {
    path: "/reservation",
    name: "Reservación",
    component: Reservation,
    icon: FaBook,
    layout: "/",
  },
  {
    path: "/personas",
    name: "Personas",
    component: Personas,
    icon: FaPeopleLine,
    layout: "/",
  },
  {
    path: "/userstemp",
    name: "Usuarios",
    icon: FaUsersGear,
    component: Users,
    layout: "/",
  },
];
