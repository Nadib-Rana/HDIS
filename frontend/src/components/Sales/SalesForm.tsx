import { useEffect, useState, useRef } from "react";
import { api } from "../../utils/api";

type Medicine = { _id: string; name: string; price: number; stock: number };
type Line = { medicineId: string; quantity: number; price: number };

export default function SalesForm({ onCreated }: { onCreated: () => void }) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [lines, setLines] = useState<Line[]>([{ medicineId: "", quantity: 1, price: 0 }]);
  const [searchQueries, setSearchQueries] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/api/medicines").then(r => setMedicines(r.data));
  }, []);

  const addLine = () => {
    setLines([...lines, { medicineId: "", quantity: 1, price: 0 }]);
    setSearchQueries([...searchQueries, ""]);
  };
  const removeLine = (idx: number) => {
    setLines(lines.filter((_, i) => i !== idx));
    setSearchQueries(searchQueries.filter((_, i) => i !== idx));
  };
  const updateLine = (idx: number, patch: Partial<Line>) => {
    setLines(lines.map((ln, i) => (i === idx ? { ...ln, ...patch } : ln)));
  };
  const updateSearchQuery = (idx: number, query: string) => {
    const newQueries = [...searchQueries];
    newQueries[idx] = query;
    setSearchQueries(newQueries);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload = {
      medicines: lines
        .filter(l => l.medicineId)
        .map(l => ({
          medicineId: l.medicineId,
          quantity: l.quantity,
          price: l.price,
        })),
      customerName: customerName || undefined,
      discount: discount || 0,
    };
    try {
      await api.post("/api/sales", payload);
      setCustomerName("");
      setDiscount(0);
      setLines([{ medicineId: "", quantity: 1, price: 0 }]);
      setSearchQueries([""]);
      onCreated();
    } catch (err) {
      setError("Failed to submit sale. Please check the data or server connection.");
      console.error("Submission error:", err);
    }
  };

  const subtotal = lines.reduce((s, l) => s + (Number(l.quantity) * Number(l.price) || 0), 0);
  const finalTotal = Math.max(subtotal - discount, 0);

  const getAvailableMedicines = (idx: number) => {
    return medicines.filter(m => 
      !lines.slice(0, idx).some(l => l.medicineId === m._id)
    ).filter(m =>
      m.name.toLowerCase().includes(searchQueries[idx]?.toLowerCase() || "")
    );
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">🛒 Create Sale</h3>

      <input
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        placeholder="Customer name (optional)"
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="space-y-4">
        {lines.map((ln, idx) => {
          const med = medicines.find(m => m._id === ln.medicineId);
          const availableMedicines = getAvailableMedicines(idx);
          return (
            <div key={idx} className="grid md:grid-cols-4 gap-2 items-center">
              <div className="relative col-span-2">
                <input
                  type="text"
                  value={searchQueries[idx]}
                  onChange={(e) => updateSearchQuery(idx, e.target.value)}
                  onBlur={() => {
                    if (!ln.medicineId && availableMedicines.length > 0) {
                      updateLine(idx, { medicineId: availableMedicines[0]._id, price: availableMedicines[0].price });
                      updateSearchQuery(idx, "");
                    }
                  }}
                  placeholder="Search or select medicine..."
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  list={`medicine-list-${idx}`}
                />
                <datalist id={`medicine-list-${idx}`}>
                  {availableMedicines.map(m => (
                    <option key={m._id} value={m.name} data-id={m._id} data-price={m.price}>
                      {m.name} (${m.price}) — Stock: {m.stock}
                    </option>
                  ))}
                </datalist>
                {ln.medicineId && (
                  <span className="absolute right-2 top-2 text-gray-500">
                    {med?.name} (Selected)
                  </span>
                )}
              </div>
              <input
                type="number"
                value={ln.quantity}
                onChange={e => updateLine(idx, { quantity: Number(e.target.value) || 1 })}
                className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                min={1}
              />
              <input
                type="number"
                value={ln.price}
                onChange={e => updateLine(idx, { price: Number(e.target.value) || 0 })}
                className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.01"
              />
              <button
                type="button"
                onClick={() => removeLine(idx)}
                className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                disabled={lines.length === 1}
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

      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="font-semibold text-gray-700">Subtotal: ${subtotal.toFixed(2)}</div>
        <input
          type="number"
          value={discount}
          onChange={e => setDiscount(Number(e.target.value) || 0)}
          placeholder="Discount"
          className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          min={0}
        />
      </div>

      <div className="font-semibold text-gray-700">Final Total: ${finalTotal.toFixed(2)}</div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        disabled={lines.every(l => !l.medicineId)}
      >
        Submit Sale
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}