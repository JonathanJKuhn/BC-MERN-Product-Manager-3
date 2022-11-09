import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const ProductList = (props) => {
  const { removeFromDom, products, setProducts } = props;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setProducts]);

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/product/${productId}`)
      .then(() => {
        removeFromDom(productId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="display-4">All Products:</h2>
      {products.map((item, index) => {
        return (
          <div key={index} className="mb-3">
            <Link to={`/${item._id}`} className="text-body">
              {item.title}
            </Link>
            <br />
            <Button onClick={() => navigate(`/edit/${item._id}`)}>Edit</Button>
            <span> | </span>
            <Button variant="danger" onClick={() => deleteProduct(item._id)}>
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
