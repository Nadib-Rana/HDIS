import { useState } from "react";
import MedicineForm from "../components/Inventory/MedicineForm";
import MedicineList from "../components/Inventory/MedicineList";
import MedicineEdit from "../components/Inventory/MedicineEdit";

const MedicinesPage = () => {
  const [refresh, setRefresh] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"add" | "list">("add"); // navbar state

  const handleRefresh = () => setRefresh((prev) => prev + 1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">💊 Medicine Management</h1>

      {/* Navbar */}
      <div className="flex space-x-4 border-b pb-2">
        <button
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === "add" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("add")}
        >
          ➕ Add Medicine
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-medium ${
            activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("list")}
        >
          📋 Medicine List
        </button>
      </div>

      {/* Active Section */}
      {activeTab === "add" && <MedicineForm onAdded={handleRefresh} />}
      {activeTab === "list" && (
        <MedicineList onEdit={setEditingId} refresh={refresh} />
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <MedicineEdit
            medicineId={editingId}
            onClose={() => setEditingId(null)}
            onUpdated={handleRefresh}
          />
        </div>
      )}
    </div>
  );
};

export default MedicinesPage;
