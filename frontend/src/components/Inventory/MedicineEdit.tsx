import { useEffect, useState } from "react";
import axios from "axios";

interface Medicine {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  createdAt: string;
}

interface MedicineEditProps {
  medicineId: string;
  onClose: () => void;
  onUpdated: () => void;
}

const API_URL = "http://localhost:5000/api/medicines";

const MedicineEdit: React.FC<MedicineEditProps> = ({ medicineId, onClose, onUpdated }) => {
  const [formData, setFormData] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);

  // Load selected medicine
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await axios.get<Medicine[]>(API_URL);
        const med = res.data.find((m) => m._id === medicineId);
        setFormData(med || null);
      } catch (err) {
        console.error("❌ Failed to load medicine:", err);
      }
    };
    fetchMedicine();
  }, [medicineId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      await axios.put(`${API_URL}/${medicineId}`, formData);
      onUpdated(); // refresh list
      onClose();   // close modal
    } catch (err) {
      console.error("❌ Failed to update medicine:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Edit Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineEdit;
