import { useState } from "react";
import MedicineForm from "../components/Inventory/MedicineForm";
import MedicineList from "../components/Inventory/MedicineList";
import MedicineEdit from "../components/Inventory/MedicineEdit";

const InventoryPage = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      {/* Form section */}
      {!editingId ? (
        <MedicineForm onAdded={triggerRefresh} />
      ) : (
        <MedicineEdit
          medicineId={editingId}
          onUpdated={() => {
            setEditingId(null);
            triggerRefresh();
          }}
          onCancel={() => setEditingId(null)}
        />
      )}

      {/* List section */}
      <div className="mt-8">
        <MedicineList
          key={refreshKey} // ensures list refreshes after add/edit/delete
          onEdit={(id: string) => setEditingId(id)}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
