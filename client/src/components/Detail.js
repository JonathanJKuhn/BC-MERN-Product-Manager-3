import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = (props) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="mt-5">
      <h2 className="display-6">{product.title}</h2>
      <p className="my-2">Price: ${product.price}</p>
      <p className="my-2">Description: {product.description}</p>
    </div>
  );
};

export default Detail;
