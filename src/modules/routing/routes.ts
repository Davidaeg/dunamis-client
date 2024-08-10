import { Home } from "../home/Home";
import { About } from "../about/About";
import { RouteType } from "./routes.types";
import { Personas } from "../personas/Personas";
import { Segmentos } from "../segmento/Segmento";
import { Automovil } from "../automovil/Automovil";
import { Reservation } from "../reservation/Reservation";


import { FaBook, FaHouse, FaPeopleLine, FaCarRear,FaAlignCenter  } from "react-icons/fa6";
import { GrHostMaintenance } from "react-icons/gr";


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
    path: "/segmento",
    name: "Segmentos",
    icon: FaAlignCenter,
    component: Segmentos,
    layout: "/",
  },
  {
    path: "/automovil",
    name: "Automoviles",
    icon: FaCarRear,
    component: Automovil,
    layout: "/",
  },
  {
    path: "/automovil",
    name: "Mantenimiento",
    icon: GrHostMaintenance,
    component: Automovil,
    layout: "/",
  },
];
