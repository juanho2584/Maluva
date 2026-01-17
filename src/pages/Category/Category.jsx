import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard";

const Category = () => {
  const { products, categories } = useProducts();
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let result = products;
    if (categoryName) {
      result = result.filter((p) => p.category === categoryName);
    }
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredProducts(result);
  }, [categoryName, searchTerm]);

  const title = categoryName
    ? categories.find((c) => c.id === categoryName)?.name
    : "Todos los Productos";

  return (
    <Container className="py-5">
      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <h1 className="fw-bold mb-0">{title}</h1>
          <p className="text-muted">
            {filteredProducts.length} productos encontrados
          </p>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            className="py-2 px-4 rounded-pill shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {filteredProducts.length > 0 ? (
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id} lg={3} md={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h3 className="text-muted">
            No se encontraron productos en esta categoría.
          </h3>
        </div>
      )}
    </Container>
  );
};

export default Category;
