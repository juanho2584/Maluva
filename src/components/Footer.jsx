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
          <Col lg={4} md={4} sm={12} className="footer-section">
            <h5 className="text-uppercase mb-4 fw-bold">Maluva Estampados</h5>
            <p className="pe-lg-5 text-muted small">
              Tu tienda de confianza para sublimación, estampados y vinilos
              personalizados. Calidad y amor en cada detalle.
            </p>
            <div className="social-links-container mt-4">
              <a href="#" className="social-button facebook">
                <Facebook size={18} />
                <span className="social-text">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/malu_va.estampados/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button instagram"
              >
                <Instagram size={18} />
                <span className="social-text">Instagram</span>
              </a>
              <a
                href="https://wa.me/message/BCUATXIVAMTXA1"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button whatsapp"
              >
                <MessageCircle size={18} />
                <span className="social-text">WhatsApp</span>
              </a>
            </div>
          </Col>

          <Col lg={4} md={4} sm={12} className="footer-section ps-md-4 ps-lg-5">
            <h5 className="text-uppercase mb-4 fw-bold">Navegación</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-dark text-decoration-none hover-primary d-flex align-items-center small"
                >
                  <span className="me-2">›</span> Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-dark text-decoration-none hover-primary d-flex align-items-center small"
                >
                  <span className="me-2">›</span> Productos
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-dark text-decoration-none hover-primary d-flex align-items-center small"
                >
                  <span className="me-2">›</span> Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-dark text-decoration-none hover-primary d-flex align-items-center small"
                >
                  <span className="me-2">›</span> Contacto
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={4} sm={12} className="footer-section ps-md-4 ps-lg-4">
            <h5 className="text-uppercase mb-4 fw-bold">Contacto</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start small">
                <MapPin size={18} className="me-3 text-primary mt-1" />
                <div>
                  <div className="fw-bold">Ubicación</div>
                  <div className="text-muted">Buenos Aires, AR</div>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start small">
                <Phone size={18} className="me-3 text-primary mt-1" />
                <div>
                  <div className="fw-bold">WhatsApp</div>
                  <div className="text-muted">+54 9 11 1234-5678</div>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start small text-truncate">
                <Mail size={18} className="me-3 text-primary mt-1" />
                <div>
                  <div className="fw-bold">Email</div>
                  <div className="text-muted">maluva.estamp@gmail.com</div>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row className="align-items-center">
          <Col md={12} className="text-center">
            <p className="mb-0">
              © 2026 Maluva Estampados - Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
