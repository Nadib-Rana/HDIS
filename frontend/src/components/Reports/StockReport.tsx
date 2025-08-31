import { useEffect, useState } from "react";
import axios from "axios";

interface Medicine {
  _id: string;
  name: string;
  stock: number;
}

const StockReport = () => {
  const [stockData, setStockData] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports/stock");
        setStockData(res.data);
      } catch (err) {
        setError("Failed to fetch stock data.");
        console.error("Error fetching stock data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  if (loading) return <div className="text-gray-500">Loading stock data...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  const lowStockItems = stockData.filter((item) => item.stock < 10); // Highlight items with stock < 10

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📋 Stock Report</h3>
      {stockData.length === 0 ? (
        <div className="text-gray-500">All stocks are sufficient.</div>
      ) : (
        <>
          {lowStockItems.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-4">
              <h4 className="text-sm font-medium text-red-800">
                Low Stock Alert ({lowStockItems.length} items)
              </h4>
              <ul className="list-disc ml-5 mt-2 text-sm text-red-700">
                {lowStockItems.map((item) => (
                  <li key={item._id}>
                    {item.name} - {item.stock} left
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4 text-left">Medicine</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td
                      className={`py-3 px-4 ${
                        item.stock < 10 ? "text-red-600 font-medium" : ""
                      }`}
                    >
                      {item.stock} left
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default StockReport;