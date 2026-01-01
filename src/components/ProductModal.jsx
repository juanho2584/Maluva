import React from "react";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import { ShoppingCart, Star, X, CheckCircle, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductModal = ({ show, onHide, product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        className={
          i < Math.floor(rating) ? "text-warning fill-warning" : "text-muted"
        }
      />
    ));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="product-detail-modal"
    >
      <Modal.Header
        closeButton
        className="border-0 pb-1 px-4 pt-4"
      ></Modal.Header>
      <Modal.Body className="pt-0 px-4 pb-4">
        <Row className="gy-4">
          <Col md={6}>
            <div className="rounded-4 overflow-hidden shadow-sm h-100">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid w-100 h-100 object-fit-cover"
                style={{ maxHeight: "450px" }}
              />
            </div>
          </Col>
          <Col md={6} className="d-flex flex-column">
            <div className="mb-2">
              {product.badge && (
                <Badge bg="primary" className="mb-2 px-3 py-2 fs-6">
                  {product.badge}
                </Badge>
              )}
              <h2 className="fw-bold mb-1">{product.name}</h2>
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="d-flex">{renderStars(product.rating)}</div>
                <span className="text-muted fw-bold">({product.rating})</span>
              </div>
            </div>

            <h3 className="text-primary fw-bold mb-4 fs-2">${product.price}</h3>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase text-muted small mb-2">
                Descripción
              </h6>
              <p className="text-secondary lead fs-6">{product.description}</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-uppercase text-muted small mb-2">
                Disponibilidad
              </h6>
              {product.stock > 0 ? (
                <div className="d-flex align-items-center text-success fw-bold">
                  <CheckCircle size={18} className="me-2" />
                  {product.stock} unidades en stock
                </div>
              ) : (
                <div className="d-flex align-items-center text-danger fw-bold">
                  <AlertCircle size={18} className="me-2" />
                  Agotado
                </div>
              )}
            </div>

            <div className="mt-auto d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                className="py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  addToCart(product);
                  onHide();
                }}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={22} />
                Agregar al Carrito
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
