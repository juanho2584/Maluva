import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-dark pt-5 pb-4 mt-auto border-top">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6} className="footer-section">
            <h5 className="text-uppercase mb-4 fw-bold">AleShop</h5>
            <p>
              Tu tienda de confianza para velas, remeras, tasas y vinilos.
              Calidad y diseño en un solo lugar.
            </p>
            <div className="social-links-container mt-4">
              <a href="#" className="social-button facebook">
                <Facebook size={20} />
                <span className="social-text">Facebook</span>
              </a>
              <a href="#" className="social-button instagram">
                <Instagram size={20} />
                <span className="social-text">Instagram</span>
              </a>
              <a href="#" className="social-button twitter">
                <Twitter size={20} />
                <span className="social-text">Twitter</span>
              </a>
              <a href="#" className="social-button whatsapp">
                <MessageCircle size={20} />
                <span className="social-text">WhatsApp</span>
              </a>
            </div>
          </Col>

          <Col lg={2} md={6} className="footer-section">
            <h5 className="text-uppercase mb-4 fw-bold">Enlaces</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Productos
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="footer-section">
            <h5 className="text-uppercase mb-4 fw-bold">Categorías</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/category/velas"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Velas
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/category/remeras"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Remeras
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/category/tasas"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Tasas
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/category/vinilos"
                  className="text-dark text-decoration-none hover-primary"
                >
                  Vinilos
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="footer-section">
            <h5 className="text-uppercase mb-4 fw-bold">Contacto</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <MapPin size={20} className="me-2 text-primary" /> Buenos Aires,
                Argentina
              </li>
              <li className="mb-3 d-flex align-items-center">
                <Phone size={20} className="me-2 text-primary" /> +54 9 11
                1234-5678
              </li>
              <li className="mb-3 d-flex align-items-center">
                <Mail size={20} className="me-2 text-primary" />{" "}
                info@aleshop.com
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row className="align-items-center">
          <Col md={12} className="text-center">
            <p className="mb-0">
              © 2026 AleShop - Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
