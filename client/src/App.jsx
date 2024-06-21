import React from "react";
import ProductDetailsComponent from "./compoment/productDetailsComponent";
import ProductListComponent from "./compoment/productListComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProductListComponent />} />
          <Route
            path="/product/:productId"
            element={<ProductDetailsComponent />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
