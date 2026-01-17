import React from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard";
import {
  ArrowRight,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  Tag,
  Shirt,
  Disc,
  Sticker,
  Coffee,
  GlassWater,
  CreditCard,
  Tent,
  Bath,
  Milk,
  Book,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const { products, categories } = useProducts();
  // Show only a few featured products on home
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-light py-5 mb-5 position-relative overflow-hidden">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="z-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge bg="primary" className="mb-3 px-3 py-2 fs-6">
                  Nueva Colección 2026
                </Badge>
                <h1 className="display-3 fw-bold mb-4 text-dark">
                  Ilumina y Viste tu{" "}
                  <span className="text-primary hero-accent-text">
                    Estilo Único
                  </span>
                </h1>
                <p className="lead text-muted mb-5">
                  Encuentra las mejores velas aromáticas, remeras exclusivas,
                  tasas de diseño y vinilos de colección en un solo lugar.
                </p>
                <div className="d-flex gap-3">
                  <Button
                    as={Link}
                    to="/products"
                    variant="primary"
                    size="lg"
                    className="px-4 py-3 fw-bold rounded-pill"
                  >
                    Ver Productos <ArrowRight size={20} className="ms-2" />
                  </Button>
                  <Button
                    as={Link}
                    to="/about"
                    variant="outline-dark"
                    size="lg"
                    className="px-4 py-3 fw-bold rounded-pill"
                  >
                    Conócenos <ArrowRight size={20} className="ms-2" />
                  </Button>
                </div>
              </motion.div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="hero-image-container"
              >
                <img
                  src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800"
                  alt="Hero"
                  className="img-fluid rounded-5 shadow-2xl"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
        {/* Decorative Elements */}
        <div
          className="position-absolute top-0 end-0 bg-primary opacity-10 rounded-circle"
          style={{
            width: "500px",
            height: "500px",
            transform: "translate(30%, -30%)",
          }}
        ></div>
      </section>

      {/* Features Section */}
      <Container className="mb-5">
        <Row className="text-center gy-4">
          <Col md={4}>
            <div className="p-4 rounded-4 bg-white shadow-sm h-100 transition-hover">
              <Truck size={40} className="text-primary mb-3" />
              <h5 className="fw-bold">Envío Rápido</h5>
              <p className="text-muted small mb-0">
                Entregamos en todo el país en menos de 48 horas hábiles.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 rounded-4 bg-white shadow-sm h-100 transition-hover">
              <ShieldCheck size={40} className="text-primary mb-3" />
              <h5 className="fw-bold">Pago Seguro</h5>
              <p className="text-muted small mb-0">
                Tus datos están protegidos con la mejor seguridad.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 rounded-4 bg-white shadow-sm h-100 transition-hover">
              <Zap size={40} className="text-primary mb-3" />
              <h5 className="fw-bold">Calidad Premium</h5>
              <p className="text-muted small mb-0">
                Seleccionamos cada producto con el mayor detalle.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Categories Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nuestras Categorías</h2>
            <div
              className="bg-primary mx-auto"
              style={{ width: "60px", height: "4px" }}
            ></div>
          </div>
          <Row className="g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 justify-content-center">
            {categories.map((cat) => (
              <Col key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card className="category-card border-0 shadow-sm h-100 text-center py-3 px-2">
                    <Card.Body className="p-0">
                      <div
                        className="category-icon-wrapper mb-2 mx-auto d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px" }}
                      >
                        {(() => {
                          const iconMap = {
                            Tag,
                            Shirt,
                            Disc,
                            Sticker,
                            Coffee,
                            GlassWater,
                            CreditCard,
                            Tent,
                            Bath,
                            Milk,
                            Book,
                          };
                          const IconComp = iconMap[cat.icon] || ShoppingBag;
                          return (
                            <IconComp size={24} className="text-primary" />
                          );
                        })()}
                      </div>
                      <h6 className="fw-bold mb-0 small">{cat.name}</h6>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-0">Productos Destacados</h2>
              <p className="text-muted mb-0">
                Lo más buscado por nuestros clientes.
              </p>
            </div>
            <Link
              to="/products"
              className="btn btn-outline-primary rounded-pill px-4"
            >
              Ver Todo
            </Link>
          </div>
          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} lg={3} md={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
