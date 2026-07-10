import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  return (
    <div className="container">
      <h1>🛍️ Product List</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="searchBar"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="products">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div className="card" key={product.id}>
              {/* Image Section */}
              <div className="imageContainer">
                <span className="discountBadge">
                  {Math.round(product.discountPercentage)}% OFF
                </span>

                <span className="stockBadge">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>

                {/* Wishlist */}
                <span className="wishlist">❤️</span>

                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>

              {/* Product Details */}
              <div className="cardBody">
                <h2>{product.title}</h2>

                <p className="brand">{product.brand}</p>

                <div className="ratingPrice">
                  <span className="rating">
                    ⭐ {product.rating.toFixed(1)}
                  </span>

                  <span className="price">
                    ₹ {product.price}
                  </span>
                </div>

                <button> Add To Cart</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}






