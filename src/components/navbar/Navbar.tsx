import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../modules/auth/Authentication.context";
import { appRoutes } from "../../modules/routing/routes";

export const Navbar = () => {
  const { user } = useContext(AuthenticationContext);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white flex">
          {appRoutes
            .filter((route) => user?.routes.includes(route.path))
            .map((route) => (
              <Link
                to={`${user?.rootPath}${route.path}`}
                className="flex items-center px-4"
              >
                {route.icon && <route.icon className="h-6 w-6 mr-2" />}
                <span>{route.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};
