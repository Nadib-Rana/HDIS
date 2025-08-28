import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { api } from "../../utils/api";

type Purchase = {
  _id: string;
  supplierName: string;
  total: number;
  createdAt: string;
  medicines: { medicineId: { name: string }; quantity: number; price: number }[];
};

export default function PurchaseList() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const r = await api.get("/api/purchases");
      setPurchases(r.data);
    } catch (err) {
      setError("Failed to load purchases.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">Recent Purchases</h3>

      {loading ? (
        <div>Loading purchases...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full">
          <thead className="text-left text-sm text-gray-600">
            <tr>
              <th className="py-2">Date</th>
              <th>Supplier</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(p => (
              <tr key={p._id} className="border-t">
                <td className="py-2">{dayjs(p.createdAt).format("DD MMM YYYY HH:mm")}</td>
                <td>{p.supplierName}</td>
                <td>
                  {p.medicines.map((m, i) => (
                    <span
                      key={i}
                      className="mr-2 inline-block text-sm bg-gray-100 px-2 py-1 rounded"
                    >
                      {m.medicineId?.name} × {m.quantity}
                    </span>
                  ))}
                </td>
                <td className="font-semibold">${p.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}