import { useState } from "react";
import axios from "axios";

const MedicineForm = ({ onAdded }: { onAdded: () => void }) => {
  const [form, setForm] = useState({ name: "", category: "", price: 0, stock: 0 });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || form.price < 0 || form.stock < 0) {
      alert("Please fill all fields correctly.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/medicines", form);
      onAdded();
      setForm({ name: "", category: "", price: 0, stock: 0 });
    } catch (err) {
      console.error("Error adding medicine:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-semibold mb-2">Add Medicine</h3>
      <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="category" value={form.category} placeholder="Category" onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="price" type="number" value={form.price} placeholder="Price" onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="stock" type="number" value={form.stock} placeholder="Stock" onChange={handleChange} className="border p-2 mb-2 w-full" />
      <button type="submit" disabled={loading} className="bg-green-500 text-white px-3 py-1 rounded">
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default MedicineForm;