import { useEffect, useState } from "react";
import { api } from "../../utils/api";

type Medicine = { _id: string; name: string; price: number; stock: number };
type Line = { medicineId: string; quantity: number; price: number };

export default function SalesForm({ onCreated }: { onCreated: () => void }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [lines, setLines] = useState<Line[]>([{ medicineId: "", quantity: 1, price: 0 }]);

  useEffect(() => {
    api.get("/api/medicines").then(r => setMedicines(r.data));
  }, []);

  const addLine = () => setLines([...lines, { medicineId: "", quantity: 1, price: 0 }]);
  const removeLine = (idx: number) => setLines(lines.filter((_, i) => i !== idx));
  const updateLine = (idx: number, patch: Partial<Line>) => {
    setLines(lines.map((ln, i) => (i === idx ? { ...ln, ...patch } : ln)));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      medicines: lines.filter(l => l.medicineId),
      customerName,
    };
    await api.post("/api/sales", payload);
    setCustomerName("");
    setLines([{ medicineId: "", quantity: 1, price: 0 }]);
    onCreated();
  };

  const total = lines.reduce((s, l) => s + (Number(l.quantity) * Number(l.price) || 0), 0);

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold">Create Sale</h3>

      <input
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        placeholder="Customer name (optional)"
        className="w-full border rounded p-2"
      />

      <div className="space-y-3">
        {lines.map((ln, idx) => {
          const med = medicines.find(m => m._id === ln.medicineId);
          return (
            <div key={idx} className="grid md:grid-cols-4 gap-2 items-center">
              <select
                value={ln.medicineId}
                onChange={e => {
                  const m = medicines.find(x => x._id === e.target.value);
                  updateLine(idx, {
                    medicineId: e.target.value,
                    price: m ? Number(m.price) : 0,
                  });
                }}
                className="border rounded p-2"
              >
                <option value="">Select medicine</option>
                {medicines.map(m => (
                  <option key={m._id} value={m._id}>
                    {m.name} (${m.price}) — Stock: {m.stock}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={ln.quantity}
                onChange={e => updateLine(idx, { quantity: Number(e.target.value) })}
                className="border rounded p-2"
                min={1}
              />

              <input
                type="number"
                value={ln.price}
                onChange={e => updateLine(idx, { price: Number(e.target.value) })}
                className="border rounded p-2"
                step="0.01"
              />

              <button
                type="button"
                onClick={() => removeLine(idx)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addLine}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Line
      </button>

      <div className="font-semibold">Total: ${total.toFixed(2)}</div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit Sale
      </button>
    </form>
  );
}