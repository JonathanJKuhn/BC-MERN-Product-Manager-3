import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Detail = (props) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/product/${productId}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-5">
      <h2 className="display-6">{product.title}</h2>
      <p className="my-2">Price: ${product.price}</p>
      <p className="my-2">Description: {product.description}</p>
      <Button onClick={() => navigate(`/edit/${id}`)} className="me-2">
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => deleteProduct(id)}
        className="ms-2"
      >
        Delete
      </Button>
    </div>
  );
};

export default Detail;
