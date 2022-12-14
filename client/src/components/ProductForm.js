import React, { useState } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import axios from "axios";

const ProductForm = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const { products, setProducts } = props;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/product", {
        title,
        price,
        description,
      })
      .then((res) => {
        setProducts([...products, res.data]);
        setTitle("");
        setPrice(0);
        setDescription("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <h2 className="display-6 mb-3">Product Manager</h2>
      <Form onSubmit={handleOnSubmit}>
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
          <Col sm={{ span: 10, offset: 1 }}>
            <Button type="submit">Create</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ProductForm;
