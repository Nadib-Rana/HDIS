import SalesForm from "../components/Sales/SalesForm";
import SalesList from "../components/Sales/SalesList";


export default function SalesPage() {
const key = Date.now(); // simple rerender key after create
const rerender = () => window.dispatchEvent(new Event("reload-sales"));


return (
<div className="p-6 space-y-6">
<h2 className="text-xl font-bold">Sales</h2>
<SalesForm onCreated={rerender} />
<SalesList key={key} />
</div>
);
}