import { useEffect, useState } from "react";
import { API } from "./config";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API}/products`).then(r => r.json()).then(setProducts);
    fetch(`${API}/orders`).then(r => r.json()).then(setOrders);
  }, []);

  const placeOrder = async () => {
    if (!customer || !selected) return alert("Fill all fields");

    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer,
        product: selected.name,
        price: selected.price
      })
    });

    const data = await res.json();
    setOrders(data);
    setCustomer("");
    setSelected(null);
  };

  const cancelOrder = async (id) => {
    const res = await fetch(`${API}/orders/${id}`, { method: "DELETE" });
    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="container">
      <h1>🛒 ShopEase</h1>

      <div className="card">
        <h3>Place Order</h3>
        <input
          placeholder="Customer Name"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
        />
        <br /><br />
        <select onChange={e => setSelected(JSON.parse(e.target.value))}>
          <option value="">Select Product</option>
          {products.map(p => (
            <option key={p.id} value={JSON.stringify(p)}>
              {p.name} – ₹{p.price}
            </option>
          ))}
        </select>
        <br /><br />
        <button className="primary" onClick={placeOrder}>
          Order Now
        </button>
      </div>

      <div className="card">
        <h3>Orders</h3>
        {orders.length === 0 && <p>No orders yet</p>}
        {orders.map(o => (
          <div key={o.id} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{o.customer} – {o.product} – ₹{o.price}</span>
            <button className="danger" onClick={() => cancelOrder(o.id)}>
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
