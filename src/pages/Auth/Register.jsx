import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    // Mock Register Logic
    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Ya puedes iniciar sesión con tu cuenta.",
      icon: "success",
      confirmButtonColor: "#6366f1",
    }).then(() => {
      navigate("/login");
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-primary p-4 text-center text-white">
                <UserPlus size={48} className="mb-3" />
                <h3 className="fw-bold mb-0">Crear Cuenta</h3>
              </div>
              <Card.Body className="p-4 p-lg-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <User size={18} className="me-2" /> Nombre Completo
                    </Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      required
                      className="py-2 px-3"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <Mail size={18} className="me-2" /> Email
                    </Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="py-2 px-3"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <Lock size={18} className="me-2" /> Contraseña
                    </Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="py-2 px-3"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <Lock size={18} className="me-2" /> Confirmar Contraseña
                    </Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="py-2 px-3"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <div className="d-grid mb-4">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="py-3 fw-bold"
                    >
                      Registrarse
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      ¿Ya tienes una cuenta?{" "}
                      <Link
                        to="/login"
                        className="text-primary fw-bold text-decoration-none"
                      >
                        Inicia sesión
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
