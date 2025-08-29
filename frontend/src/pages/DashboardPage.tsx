// pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/Dashboard";

interface Medicine {
  _id: string;
  name: string;
  stock: number;
}

const DashboardPage = () => {
  const [lowStock, setLowStock] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/reports/stock?threshold=5"
        );
        setLowStock(res.data);
      } catch (err) {
        console.error("Error fetching low stock:", err);
      }
    };

    fetchLowStock();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="font-semibold mb-2">Low Stock Alerts</h3>
          {lowStock.length === 0 ? (
            <p>No low stock items</p>
          ) : (
            <ul className="list-disc ml-5">
              {lowStock.map((m) => (
                <li key={m._id}>
                  {m.name} - {m.stock} left
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
