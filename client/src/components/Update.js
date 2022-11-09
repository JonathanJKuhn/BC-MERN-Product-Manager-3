import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import axios from "axios";

const Update = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const updateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/product/${id}`, {
        title,
        price,
        description,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/product/${productId}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h2 className="display-6 mb-3">Update a Product</h2>
      <Form onSubmit={updateProduct}>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm={{ span: 1, offset: 3 }}>
            Title
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPrice">
          <Form.Label column sm={{ span: 1, offset: 3 }}>
            Price
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formDescription">
          <Form.Label column sm={{ span: 1, offset: 3 }}>
            Description
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 2, offset: 4 }} className="mb-3">
            <Button type="submit">Update</Button>
          </Col>
          <Col sm={{ span: 1, offset: 0 }} className="mb-3">
            <Button variant="danger" onClick={() => deleteProduct(id)}>
              Delete
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Update;
