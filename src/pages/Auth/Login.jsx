import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock Login Logic
    if (email === "admin@aleshop.com" && password === "admin123") {
      login({ name: "Admin", email, role: "admin" });
      Swal.fire({
        title: "¡Bienvenido Admin!",
        text: "Has iniciado sesión correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } else if (email && password) {
      login({ name: "Usuario", email, role: "user" });
      Swal.fire({
        title: "¡Hola de nuevo!",
        text: "Has iniciado sesión correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } else {
      Swal.fire("Error", "Por favor ingresa credenciales válidas", "error");
    }
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
                <LogIn size={48} className="mb-3" />
                <h3 className="fw-bold mb-0">Iniciar Sesión</h3>
              </div>
              <Card.Body className="p-4 p-lg-5">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <Mail size={18} className="me-2" /> Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="py-2 px-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <Lock size={18} className="me-2" /> Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      required
                      className="py-2 px-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-grid mb-4">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="py-3 fw-bold"
                    >
                      Entrar
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      ¿No tienes una cuenta?{" "}
                      <Link
                        to="/register"
                        className="text-primary fw-bold text-decoration-none"
                      >
                        Regístrate aquí
                      </Link>
                    </p>
                  </div>
                </Form>
                <div className="mt-4 p-3 bg-light rounded-3 small">
                  <p className="mb-1 fw-bold text-muted">
                    Credenciales de prueba:
                  </p>
                  <p className="mb-0 text-muted">
                    Admin: admin@aleshop.com / admin123
                  </p>
                  <p className="mb-0 text-muted">
                    User: user@test.com / user123
                  </p>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
