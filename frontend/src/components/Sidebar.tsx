// components/Sidebar.tsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col space-y-3">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/inventory" className="hover:bg-gray-700 p-2 rounded">Inventory</Link>
        <Link to="/sales" className="hover:bg-gray-700 p-2 rounded">Sales</Link>
        <Link to="/purchases" className="hover:bg-gray-700 p-2 rounded">Purchases</Link>
        <Link to="/reports" className="hover:bg-gray-700 p-2 rounded">Reports</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
