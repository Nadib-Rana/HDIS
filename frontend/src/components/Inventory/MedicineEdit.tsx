import { useEffect, useState } from "react";
import axios from "axios";

type Medicine = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function MedicineEdit({
  medicineId,
  onUpdated,
  onCancel,
}: {
  medicineId: string;
  onUpdated: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await axios.get(`/api/medicines/${medicineId}`);
        setForm(res.data);
      } catch (err) {
        console.error("Failed to fetch medicine:", err);
      }
    };
    fetchMedicine();
  }, [medicineId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !form.name || !form.category || form.price < 0 || form.stock < 0) {
      alert("Please fill all fields correctly.");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`/api/medicines/${medicineId}`, form);
      onUpdated();
    } catch (err) {
      console.error("Error updating medicine:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-semibold mb-2">Edit Medicine</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 mb-2 w-full" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 mb-2 w-full" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 mb-2 w-full" />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-2 mb-2 w-full" />
      <div className="flex space-x-2">
        <button type="submit" disabled={loading} className="bg-green-500 text-white px-3 py-1 rounded">
          {loading ? "Updating..." : "Update"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}