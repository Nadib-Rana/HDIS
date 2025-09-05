import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/"); // redirect to login
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Pharmacy Inventory</h1>
      <nav className="flex flex-col space-y-3 flex-1">
        <Link
          to="/dashboard"
          className="hover:bg-gray-700 p-2 rounded transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/inventory"
          className="hover:bg-gray-700 p-2 rounded transition-colors"
        >
          Inventory
        </Link>
        <Link
          to="/sales"
          className="hover:bg-gray-700 p-2 rounded transition-colors"
        >
          Sales
        </Link>
        <Link
          to="/purchases"
          className="hover:bg-gray-700 p-2 rounded transition-colors"
        >
          Purchases
        </Link>
        <Link
          to="/reports"
          className="hover:bg-gray-700 p-2 rounded transition-colors"
        >
          Reports
        </Link>
      </nav>

      {/* Logout Button at the bottom */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded font-semibold transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
