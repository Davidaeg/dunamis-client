import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <Link to="/" className="px-4">
            Home
          </Link>
          <Link to="/about" className="px-4">
            About
          </Link>
          <Link to="/users" className="px-4">
            UsersTemp
          </Link>
          <Link to="/reservation" className="px-4">
            Reservaciones
          </Link>
        </div>
      </div>
    </nav>
  );
};
