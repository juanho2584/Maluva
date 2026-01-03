import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation of form submission
    Swal.fire({
      title: "¡Mensaje Enviado!",
      text: "Nos pondremos en contacto contigo a la brevedad.",
      icon: "success",
      confirmButtonColor: "#6366f1",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contáctanos</h1>
        <p className="text-muted">
          ¿Tienes alguna duda? Estamos aquí para ayudarte.
        </p>
        <div
          className="bg-primary mx-auto"
          style={{ width: "60px", height: "4px" }}
        ></div>
      </div>

      <Row className="g-4">
        <Col lg={5}>
          <Card className="border-0 shadow-sm rounded-4 h-100 p-4">
            <h4 className="fw-bold mb-4">Información de Contacto</h4>
            <div className="mb-4 d-flex align-items-start">
              <div className="bg-primary-light p-3 rounded-circle text-primary me-3">
                <Mail size={24} />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Email</h6>
                <p className="text-muted mb-0">maluva.estampados@gmail.com</p>
              </div>
            </div>
            <div className="mb-4 d-flex align-items-start">
              <div className="bg-primary-light p-3 rounded-circle text-primary me-3">
                <Phone size={24} />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Teléfono</h6>
                <p className="text-muted mb-0">+54 9 11 1234-5678</p>
              </div>
            </div>
            <div className="mb-4 d-flex align-items-start">
              <div className="bg-primary-light p-3 rounded-circle text-primary me-3">
                <MapPin size={24} />
              </div>
              <div>
                <h6 className="fw-bold mb-1">Ubicación</h6>
                <p className="text-muted mb-0">
                  Av. Siempre Viva 742, Buenos Aires
                </p>
              </div>
            </div>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="border-0 shadow-sm rounded-4 p-4">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Nombre</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Tu nombre"
                      required
                      className="py-2 px-3"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="fw-bold">Email</Form.Label>
                    <Form.Control
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="py-2 px-3"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Asunto</Form.Label>
                <Form.Control
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                  className="py-2 px-3"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Mensaje</Form.Label>
                <Form.Control
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  as="textarea"
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  required
                  className="py-2 px-3"
                />
              </Form.Group>
              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <Send size={20} /> Enviar Mensaje
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
