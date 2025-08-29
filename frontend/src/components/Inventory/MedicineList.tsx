import { useEffect, useState } from "react";
import axios from "axios";

type Medicine = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

const API_URL = "http://localhost:5000/api/medicines"; // <-- adjust to your backend

const MedicineList = ({ onEdit }: { onEdit: (id: string) => void }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setMedicines(res.data);
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicine = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMedicines();
    } catch (err) {
      console.error("Failed to delete medicine:", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  if (loading) return <p>Loading medicines...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Medicine Inventory</h2>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            
            <th className="py-2 px-4">SI.NO</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
  {medicines.map((m, index) => (
    <tr key={m._id} className="border-t">
      <td className="py-2 px-4">{index + 1}</td> {/* SI. No */}
      <td className="py-2 px-4">{m.name}</td>
      <td className="py-2 px-4">{m.category}</td>
      <td className="py-2 px-4">${m.price}</td>
      <td className="py-2 px-4">{m.stock}</td>
      <td className="py-2 px-4 space-x-2">
        <button
          onClick={() => onEdit(m._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deleteMedicine(m._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default MedicineList;
