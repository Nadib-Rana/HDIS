import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { api } from "../../utils/api";

type Sale = {
  _id: string;
  customerName?: string;
  total: number;
  createdAt: string;
  medicines: { medicineId: { name: string }; quantity: number; price: number }[];
};

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const r = await api.get("/api/sales");
      setSales(r.data);
    } catch (err) {
      setError("Failed to load sales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">Recent Sales</h3>

      {loading ? (
        <div>Loading sales...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full">
          <thead className="text-left text-sm text-gray-600">
            <tr>
              
              <th className="py-2">NO</th>
              <th className="py-2">Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s , index) => (
              <tr key={s._id} className="border-t">

                <td className="py-2 px-4 bg-green-500">{index+1}</td>
                <td className="py-2">{dayjs(s.createdAt).format("DD MMM YYYY HH:mm")}</td>
                <td>{s.customerName || "—"}</td>
                <td>
                  {s.medicines.map((m, i) => (
                    <span
                      key={i}
                      className="mr-2 inline-block text-sm bg-gray-100 px-2 py-1 rounded"
                    >
                      {m.medicineId?.name} × {m.quantity}
                    </span>
                  ))}
                </td>
                <td className="font-semibold">${s.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}