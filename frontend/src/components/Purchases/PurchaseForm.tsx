import { useEffect, useState } from "react";
import { api } from "../../utils/api"; // Make sure this matches your actual file casing

type Medicine = { _id: string; name: string; price: number; stock: number };
type Line = { medicineId: string; quantity: number; price: number };

export default function PurchaseForm({ onCreated }: { onCreated: () => void }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [supplierName, setSupplierName] = useState("");
  const [lines, setLines] = useState<Line[]>([{ medicineId: "", quantity: 1, price: 0 }]);

  useEffect(() => {
    api.get("/api/medicines").then(r => setMedicines(r.data));
  }, []);

  const addLine = () =>
    setLines([...lines, { medicineId: "", quantity: 1, price: 0 }]);

  const removeLine = (i: number) =>
    setLines(lines.filter((_, idx) => idx !== i));

  const updateLine = (i: number, patch: Partial<Line>) =>
    setLines(lines.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/api/purchases", {
      supplierName,
      medicines: lines.filter(l => l.medicineId),
    });
    setSupplierName("");
    setLines([{ medicineId: "", quantity: 1, price: 0 }]);
    onCreated();
  };

  const total = lines.reduce(
    (s, l) => s + (Number(l.quantity) * Number(l.price) || 0),
    0
  );

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-xl shadow space-y-3">
      <h3 className="text-lg font-semibold">Record Purchase</h3>

      <input
        value={supplierName}
        onChange={e => setSupplierName(e.target.value)}
        placeholder="Supplier name"
        className="w-full border rounded p-2"
      />

      {lines.map((ln, idx) => (
        <div key={idx} className="grid md:grid-cols-4 gap-2">
          <select
            value={ln.medicineId}
            onChange={e => updateLine(idx, { medicineId: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">Select medicine…</option>
            {medicines.map(m => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={ln.quantity}
            onChange={e =>
              updateLine(idx, { quantity: Number(e.target.value) })
            }
            className="border rounded p-2"
            placeholder="Qty"
          />

          <input
            type="number"
            step="0.01"
            value={ln.price}
            onChange={e =>
              updateLine(idx, { price: Number(e.target.value) })
            }
            className="border rounded p-2"
            placeholder="Price"
          />

          <button
            type="button"
            onClick={() => removeLine(idx)}
            className="px-3 py-2 rounded bg-red-500 text-white"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addLine}
        className="px-3 py-2 rounded bg-gray-800 text-white"
      >
        + Add line
      </button>

      <div className="flex items-center justify-between">
        <div className="text-gray-600">Total:</div>
        <div className="text-xl font-bold">{total.toFixed(2)}</div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-4 py-2 rounded bg-blue-600 text-white"
      >
        Save Purchase
      </button>
    </form>
  );
}