import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  IdCard,
  UserCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dni: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation states
  const [validity, setValidity] = useState({
    name: false,
    surname: false,
    dni: false,
    email: false,
    username: false,
    password: {
      length: false,
      uppercase: false,
      number: false,
      special: false,
    },
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "name":
      case "surname":
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(value);
      case "dni":
        return /^\d{8}$/.test(value);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "username":
        return /^[a-zA-Z0-9_]{4,15}$/.test(value);
      case "password":
        return {
          length: value.length >= 8 && value.length <= 12,
          uppercase: /[A-Z]/.test(value),
          number: /[0-9]/.test(value),
          special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        };
      case "confirmPassword":
        return value === formData.password && value !== "";
      default:
        return false;
    }
  };

  useEffect(() => {
    const newValidity = { ...validity };
    Object.keys(formData).forEach((field) => {
      newValidity[field] = validateField(field, formData[field]);
    });
    setValidity(newValidity);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isPasswordValid = Object.values(validity.password).every(Boolean);
    const isFormValid =
      validity.name &&
      validity.surname &&
      validity.dni &&
      validity.email &&
      validity.username &&
      isPasswordValid &&
      validity.confirmPassword;

    if (!isFormValid) {
      Swal.fire(
        "Error",
        "Por favor, completa todos los campos correctamente siguiendo las instrucciones.",
        "error",
      );
      return;
    }

    // Mock Register Logic
    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Tu cuenta ha sido creada correctamente.",
      icon: "success",
      confirmButtonColor: "#6366f1",
    }).then(() => {
      navigate("/login");
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ValidationItem = ({ label, isValid, touched }) => (
    <div
      className={`d-flex align-items-center gap-2 mb-1 ${isValid ? "text-success" : touched ? "text-danger" : "text-muted"}`}
      style={{ fontSize: "0.85rem" }}
    >
      {isValid ? (
        <CheckCircle2 size={14} />
      ) : (
        <XCircle size={14} className={touched ? "" : "opacity-50"} />
      )}
      <span>{label}</span>
    </div>
  );

  const StatusIcon = ({ isValid, touched }) => {
    if (!touched) return null;
    return isValid ? (
      <CheckCircle2 size={18} className="text-success ms-2" />
    ) : (
      <AlertCircle size={18} className="text-danger ms-2" />
    );
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={7}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-primary p-4 text-center text-white gradient-custom-2">
                <UserPlus size={48} className="mb-3" />
                <h2 className="fw-bold mb-0">Únete a Maluva</h2>
                <p className="mb-0 opacity-75">Crea tu cuenta segura</p>
              </div>
              <Card.Body className="p-4 p-lg-5">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Form.Label className="fw-bold mb-0">
                            <User size={16} className="me-2 text-primary" />{" "}
                            Nombre
                          </Form.Label>
                          <StatusIcon
                            isValid={validity.name}
                            touched={formData.name.length > 0}
                          />
                        </div>
                        <Form.Control
                          name="name"
                          type="text"
                          placeholder="Ej: Juan"
                          required
                          className={`py-2.5 rounded-3 ${formData.name && !validity.name ? "is-invalid" : formData.name && validity.name ? "is-valid" : ""}`}
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {formData.name && !validity.name && (
                          <Form.Text className="text-danger">
                            Solo letras, mínimo 2 caracteres.
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Form.Label className="fw-bold mb-0">
                            <User size={16} className="me-2 text-primary" />{" "}
                            Apellido
                          </Form.Label>
                          <StatusIcon
                            isValid={validity.surname}
                            touched={formData.surname.length > 0}
                          />
                        </div>
                        <Form.Control
                          name="surname"
                          type="text"
                          placeholder="Ej: Pérez"
                          required
                          className={`py-2.5 rounded-3 ${formData.surname && !validity.surname ? "is-invalid" : formData.surname && validity.surname ? "is-valid" : ""}`}
                          value={formData.surname}
                          onChange={handleChange}
                        />
                        {formData.surname && !validity.surname && (
                          <Form.Text className="text-danger">
                            Solo letras, mínimo 2 caracteres.
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Form.Label className="fw-bold mb-0">
                            <IdCard size={16} className="me-2 text-primary" />{" "}
                            DNI
                          </Form.Label>
                          <StatusIcon
                            isValid={validity.dni}
                            touched={formData.dni.length > 0}
                          />
                        </div>
                        <Form.Control
                          name="dni"
                          type="text"
                          placeholder="8 dígitos"
                          required
                          className={`py-2.5 rounded-3 ${formData.dni && !validity.dni ? "is-invalid" : formData.dni && validity.dni ? "is-valid" : ""}`}
                          value={formData.dni}
                          onChange={handleChange}
                        />
                        {formData.dni && !validity.dni && (
                          <Form.Text className="text-danger">
                            Deben ser exactamente 8 números.
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Form.Label className="fw-bold mb-0">
                            <UserCircle
                              size={16}
                              className="me-2 text-primary"
                            />{" "}
                            Usuario
                          </Form.Label>
                          <StatusIcon
                            isValid={validity.username}
                            touched={formData.username.length > 0}
                          />
                        </div>
                        <Form.Control
                          name="username"
                          type="text"
                          placeholder="min. 4 caracteres"
                          required
                          className={`py-2.5 rounded-3 ${formData.username && !validity.username ? "is-invalid" : formData.username && validity.username ? "is-valid" : ""}`}
                          value={formData.username}
                          onChange={handleChange}
                        />
                        {formData.username && !validity.username && (
                          <Form.Text className="text-danger">
                            4-15 caracteres alfanuméricos.
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <Form.Label className="fw-bold mb-0">
                        <Mail size={16} className="me-2 text-primary" /> Email
                      </Form.Label>
                      <StatusIcon
                        isValid={validity.email}
                        touched={formData.email.length > 0}
                      />
                    </div>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      required
                      className={`py-2.5 rounded-3 ${formData.email && !validity.email ? "is-invalid" : formData.email && validity.email ? "is-valid" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <Form.Label className="fw-bold mb-0">
                        <Lock size={16} className="me-2 text-primary" />{" "}
                        Contraseña
                      </Form.Label>
                      <StatusIcon
                        isValid={Object.values(validity.password).every(
                          Boolean,
                        )}
                        touched={formData.password.length > 0}
                      />
                    </div>
                    <InputGroup>
                      <Form.Control
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className={`py-2.5 rounded-start-3 border-end-0 ${formData.password && !Object.values(validity.password).every(Boolean) ? "is-invalid" : formData.password && Object.values(validity.password).every(Boolean) ? "is-valid" : ""}`}
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <Button
                        variant="outline-secondary"
                        className="border-start-0 rounded-end-3 px-3 bg-white text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </Button>
                    </InputGroup>

                    <motion.div
                      className="mt-3 p-3 bg-light rounded-3 border"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <h6
                        className="fw-bold mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Requisitos de seguridad:
                      </h6>
                      <ValidationItem
                        label="Entre 8 y 12 caracteres"
                        isValid={validity.password.length}
                        touched={formData.password.length > 0}
                      />
                      <ValidationItem
                        label="Al menos una mayúscula"
                        isValid={validity.password.uppercase}
                        touched={formData.password.length > 0}
                      />
                      <ValidationItem
                        label="Al menos un número"
                        isValid={validity.password.number}
                        touched={formData.password.length > 0}
                      />
                      <ValidationItem
                        label="Al menos un carácter especial (!@#$%^&*)"
                        isValid={validity.password.special}
                        touched={formData.password.length > 0}
                      />
                    </motion.div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <Form.Label className="fw-bold mb-0">
                        <Lock size={16} className="me-2 text-primary" />{" "}
                        Confirmar Contraseña
                      </Form.Label>
                      <StatusIcon
                        isValid={validity.confirmPassword}
                        touched={formData.confirmPassword.length > 0}
                      />
                    </div>
                    <InputGroup>
                      <Form.Control
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className={`py-2.5 rounded-start-3 border-end-0 ${formData.confirmPassword && !validity.confirmPassword ? "is-invalid" : formData.confirmPassword && validity.confirmPassword ? "is-valid" : ""}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <Button
                        variant="outline-secondary"
                        className="border-start-0 rounded-end-3 px-3 bg-white text-muted"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </Button>
                    </InputGroup>
                    {formData.confirmPassword && (
                      <div
                        className={`mt-2 d-flex align-items-center gap-2 ${validity.confirmPassword ? "text-success" : "text-danger"}`}
                        style={{ fontSize: "0.85rem" }}
                      >
                        {validity.confirmPassword ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}
                        <span>
                          {validity.confirmPassword
                            ? "Las contraseñas coinciden"
                            : "Las contraseñas no coinciden"}
                        </span>
                      </div>
                    )}
                  </Form.Group>

                  <div className="d-grid mb-4">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="py-3 fw-bold rounded-3 shadow-sm btn-register"
                      disabled={
                        !(
                          validity.name &&
                          validity.surname &&
                          validity.dni &&
                          validity.email &&
                          validity.username &&
                          Object.values(validity.password).every(Boolean) &&
                          validity.confirmPassword
                        )
                      }
                    >
                      Registrarme ahora
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      ¿Ya tienes una cuenta?{" "}
                      <Link
                        to="/login"
                        className="text-primary fw-bold text-decoration-none hover-link"
                      >
                        Inicia sesión aquí
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
