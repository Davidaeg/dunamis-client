import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../modules/auth/Authentication.context";
import { appRoutes } from "../../modules/routing/routes";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const Navbar = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white flex space-x-4">
          {appRoutes
            .filter(
              (route) =>
                user?.routes.includes(route.path) &&
                !["/personas", "/segmento", "/automovil"].includes(route.path)
            )
            .map((route) => (
              <Link
                key={route.path}
                to={`${user?.rootPath}${route.path}`}
                className="flex items-center px-4"
              >
                {route.icon && <route.icon className="h-6 w-6 mr-2" />}
                <span>{route.name}</span>
              </Link>
            ))}

          <div className="relative">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="text-white flex items-center px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
                  Mantenimiento
                  <ChevronDownIcon
                    className="h-5 w-5 ml-2"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 mt-2 w-full max-w-[200px] origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`${user?.rootPath}/personas`}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Personas
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`${user?.rootPath}/segmento`}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Segmento
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`${user?.rootPath}/automovil`}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Automóviles
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};
