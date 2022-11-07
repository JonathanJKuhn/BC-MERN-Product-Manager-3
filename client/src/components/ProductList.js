import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = (props) => {
  const { products, setProducts } = props;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setProducts]);

  return (
    <div>
      <h2 className="display-4">All Products:</h2>
      {products.map((item, index) => {
        return (
          <div key={index}>
            <Link to={`/${item._id}`} className="text-body">
              {item.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
