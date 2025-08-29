// components/Dashboard.tsx
import type{ ReactNode } from "react";
import {  useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gray-800 text-gray-100 flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold ${
              isOpen ? "block" : "hidden"
            } md:block`}
          >
            Admin
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            ☰
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <LayoutDashboard className="w-5 h-5" />
                {isOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <Package className="w-5 h-5" />
                {isOpen && <span className="ml-3">Inventory</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/purchases"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <ShoppingCart className="w-5 h-5" />
                {isOpen && <span className="ml-3">Purchases</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <BarChart3 className="w-5 h-5" />
                {isOpen && <span className="ml-3">Reports</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Dashboard;
