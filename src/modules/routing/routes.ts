import { Home } from "../home/Home";
import { About } from "../about/About";
import { RouteType } from "./routes.types";
import { Personas } from "../personas/Personas";
import { Users } from "../users/Users";

import homeIcon from "../../assets/homeIcon.svg";
import PersonIcon from "../../assets/manage_accounts.svg";

export const appRoutes: RouteType[] = [
  {
    path: "/home",
    name: "Inicio",
    component: Home,
    icon: homeIcon,
    layout: "/",
  },
  {
    path: "/about",
    name: "Sobre Nosotros",
    component: About,
    layout: "/",
  },
  {
    path: "/personas",
    name: "Personas",
    component: Personas,
    icon: PersonIcon,
    layout: "/",
  },
  {
    path: "/userstemp",
    name: "Usuarios",
    icon: "pi pi-user",
    component: Users,
    layout: "/",
  },
];
