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

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports/stock");
        setStockData(res.data);
      } catch (err) {
        console.error("Error fetching stock data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  if (loading) return <p>Loading stock data...</p>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Stock Report</h2>
      {stockData.length === 0 ? (
        <p>All stocks are sufficient.</p>
      ) : (
        <ul className="list-disc ml-5">
          {stockData.map((item) => (
            <li key={item._id}>
              {item.name} - {item.stock} left
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockReport;
