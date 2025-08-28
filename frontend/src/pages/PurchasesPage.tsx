import { useState } from "react";
import PurchaseForm from "../components/Purchases/PurchaseForm";
import PurchaseList from "../components/Purchases/PurchaseList";

export default function PurchasesPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag(prev => !prev);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Purchases</h1>

      <PurchaseForm onCreated={triggerRefresh} />

      <div key={refreshFlag.toString()}>
        <PurchaseList />
      </div>
    </div>
  );
}