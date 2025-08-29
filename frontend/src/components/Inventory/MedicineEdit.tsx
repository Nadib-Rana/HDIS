import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Medicine {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

export default function MedicineEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Medicine>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await axios.get(`/api/medicines/${id}`);
        console.log(res);
        setForm(res.data);
      } catch (err) {
        setError("Failed to fetch medicine data.");
      }
    };
    fetchMedicine();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { name, category, price, stock } = form;
      if (!name || !category || price == null || stock == null) {
        setError("Please fill all required fields.");
        setLoading(false);
        return;
      }

      await axios.put(`/api/medicines/${id}`, {
        name,
        category,
        price,
        stock,
      });

      navigate("/medicines");
    } catch (err) {
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Medicine</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Medicine Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price ?? ""}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          value={form.stock ?? ""}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Medicine"}
        </button>
      </form>
    </div>
  );
}