import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Target, Users, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="about-page py-5">
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center mb-5">
          <Col lg={6}>
            <h1 className="display-4 fw-bold mb-4">Nuestra Historia</h1>
            <p className="lead text-muted">
              AleShop nació en 2026 con el objetivo de traer productos únicos
              que iluminen el hogar y vistan la personalidad de cada cliente.
            </p>
            <p className="text-secondary">
              Lo que comenzó como un pequeño taller de velas artesanales se ha
              convertido en una tienda integral donde el diseño y la calidad
              convergen. Creemos que cada objeto en tu vida debe contar una
              historia y reflejar quién eres.
            </p>
          </Col>
          <Col lg={6}>
            <div className="rounded-5 overflow-hidden shadow-lg p-3 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
                alt="Team"
                fluid
                className="rounded-4"
              />
            </div>
          </Col>
        </Row>

        {/* Values Section */}
        <div className="bg-white rounded-5 p-5 shadow-sm mb-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nuestros Valores</h2>
            <div
              className="bg-primary mx-auto"
              style={{ width: "60px", height: "4px" }}
            ></div>
          </div>
          <Row className="g-4">
            <Col md={3} className="text-center">
              <div className="mb-3 text-primary">
                <Target size={40} />
              </div>
              <h5 className="fw-bold">Excelencia</h5>
              <p className="text-muted small">
                Buscamos la perfección en cada detalle de nuestros productos.
              </p>
            </Col>
            <Col md={3} className="text-center">
              <div className="mb-3 text-primary">
                <Users size={40} />
              </div>
              <h5 className="fw-bold">Comunidad</h5>
              <p className="text-muted small">
                Valoramos la conexión con nuestros clientes y colaboradores.
              </p>
            </Col>
            <Col md={3} className="text-center">
              <div className="mb-3 text-primary">
                <Heart size={40} />
              </div>
              <h5 className="fw-bold">Pasión</h5>
              <p className="text-muted small">
                Amamos lo que hacemos y eso se nota en el resultado final.
              </p>
            </Col>
            <Col md={3} className="text-center">
              <div className="mb-3 text-primary">
                <Award size={40} />
              </div>
              <h5 className="fw-bold">Originalidad</h5>
              <p className="text-muted small">
                Diseños únicos que no encontrarás en ningún otro lugar.
              </p>
            </Col>
          </Row>
        </div>

        <Row className="text-center py-5">
          <Col lg={8} className="mx-auto">
            <h2 className="fw-bold mb-4">Únete a nuestra aventura</h2>
            <p className="text-muted mb-0">
              Cada día trabajamos para innovar y ofrecerte lo mejor. ¡Gracias
              por ser parte de AleShop!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
