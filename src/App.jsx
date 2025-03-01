import { useState } from "react";
import "./index.css";

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 800 },
  { id: 2, name: "Phone", category: "Electronics", price: 500 },
  { id: 3, name: "Shirt", category: "Clothing", price: 30 },
  { id: 4, name: "Jeans", category: "Clothing", price: 50 },
];

export default function ProductPage() {
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = products
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <h1 className="title">Product List</h1>
      <div className="controls">
        <select onChange={(e) => setCategory(e.target.value)} className="dropdown">
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} className="dropdown">
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)} className="btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Cart Summary</h2>
        {cart.length === 0 ? <p>No items in cart</p> : cart.map((item, index) => (
          <p key={index}>{item.name} - ${item.price}</p>
        ))}
      </div>
    </div>
  );
}
