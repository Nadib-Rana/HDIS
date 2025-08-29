import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LabelList,
} from "recharts";

interface Sale {
  date: string;
  totalSales: number;
}

const SalesReport = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports/sales");
        const sorted = res.data.sort(
          (a: Sale, b: Sale) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setSalesData(sorted);
      } catch (err) {
        console.error("Error fetching sales data:", err);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Progress Sales Dashboard
      </h2>

      {/* Line Chart Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Sales Trend Over Time
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
            >
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
              <XAxis dataKey="date" tickFormatter={(str) => str.slice(5)} />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value}`} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: "#4f46e5",
                  strokeWidth: 2,
                  fill: "white",
                }}
              >
                <LabelList
                  dataKey="totalSales"
                  position="top"
                  formatter={(val) => `$${val}`}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Total Sales Comparison
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
            >
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
              <XAxis dataKey="date" tickFormatter={(str) => str.slice(5)} />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value}`} />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="totalSales"
                fill="#10b981"
                barSize={40}
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="totalSales"
                  position="top"
                  formatter={(val) => `$${val}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
