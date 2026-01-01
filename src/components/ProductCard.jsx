import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Eye, ShoppingCart, Star } from "lucide-react";
import ProductModal from "./ProductModal";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < Math.floor(rating) ? "text-warning fill-warning" : "text-muted"
        }
      />
    ));
  };

  return (
    <>
      <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
        <Card className="h-100 border-0 shadow-sm product-card position-relative overflow-hidden">
          {product.badge && (
            <Badge
              bg="vivid-badge"
              className="position-absolute top-0 start-0 m-2 z-1 px-3 py-2 fs-6"
            >
              {product.badge}
            </Badge>
          )}

          <div className="product-image-container">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-overlay">
              <Button
                variant="light"
                className="rounded-circle p-3 shadow-lg"
                onClick={() => setShowModal(true)}
              >
                <Eye size={24} className="text-primary" />
              </Button>
            </div>
          </div>

          <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className="fs-5 fw-bold mb-0 text-truncate">
                {product.name}
              </Card.Title>
              <span className="fw-bold text-primary fs-5">
                ${product.price}
              </span>
            </div>

            <div className="mb-3 d-flex align-items-center gap-1">
              {renderStars(product.rating)}
              <span className="ms-1 text-muted small">({product.rating})</span>
            </div>

            <p className="text-muted small mb-3 flex-grow-1 product-description">
              {product.description}
            </p>

            <div className="d-grid mt-auto">
              <Button
                variant="primary"
                className="d-flex align-items-center justify-content-center gap-2 py-2"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={18} />
                Agregar al Carrito
              </Button>
            </div>
          </Card.Body>
        </Card>
      </motion.div>

      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;
