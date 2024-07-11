import { IconType } from "react-icons";

export type RouteType = {
  path: string;
  name: string;
  icon?: IconType;
  component: () => React.JSX.Element;
  layout: string;
  upgrade?: boolean;
};
