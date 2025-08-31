// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import SalesPage from "./pages/SalesPage";
import PurchasesPage from "./pages/PurchasesPage";
import ReportsPage from "./pages/ReportsPage";
import InventoryPage from "./pages/InventoryPage";


function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar navigation */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 bg-gray-50 min-h-screen p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
