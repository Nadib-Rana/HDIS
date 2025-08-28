import StockReport from "../components/Reports/StockReport";
import SalesReport from "../components/Reports/SalesReport";

const ReportsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockReport />
        <SalesReport />
      </div>
    </div>
  );
};

export default ReportsPage;
