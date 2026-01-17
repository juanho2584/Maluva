import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Image,
} from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, placeOrder } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      Swal.fire(
        "Inicia sesión",
        "Debes estar registrado para realizar una compra",
        "warning",
      );
      navigate("/login");
      return;
    }

    Swal.fire({
      title: "¿Confirmar pedido?",
      text: `El total de tu compra es $${totalPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f9a8d4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
      background: "#fff",
      customClass: {
        popup: "rounded-4 border-0 shadow",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        placeOrder(user);
        Swal.fire({
          title: "¡Gracias por tu compra!",
          text: "Tu pedido ha sido procesado correctamente.",
          icon: "success",
          confirmButtonColor: "#f9a8d4",
        });
        navigate("/orders");
      }
    });
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-5"
        >
          <div className="bg-light rounded-circle d-inline-flex p-4 mb-4">
            <ShoppingBag size={64} className="text-primary opacity-50" />
          </div>
          <h2 className="fw-bold mb-3">Tu carrito está vacío</h2>
          <p
            className="text-muted lead mb-5 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            Parece que aún no has agregado nada. ¡Explora nuestra colección y
            encuentra algo especial para vos!
          </p>
          <Button
            as={Link}
            to="/products"
            variant="primary"
            size="lg"
            className="rounded-pill px-5 py-3 fw-bold shadow-sm"
          >
            <ArrowLeft size={20} className="me-2" /> Ver Productos
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-5"
      >
        <h1 className="fw-bold display-5 mb-2">Mi Carrito</h1>
        <p className="text-muted">
          Tenés {cart.reduce((acc, item) => acc + item.quantity, 0)} productos
          listos para vos
        </p>
      </motion.div>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <Card.Body className="p-0">
              <Table responsive className="mb-0 align-middle">
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="px-4 py-4 border-0 text-muted small text-uppercase fw-bold">
                      Producto
                    </th>
                    <th className="py-4 border-0 text-muted small text-uppercase fw-bold">
                      Precio
                    </th>
                    <th className="py-4 border-0 text-muted small text-uppercase fw-bold text-center">
                      Cantidad
                    </th>
                    <th className="py-4 border-0 text-muted small text-uppercase fw-bold text-end px-4">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                      <motion.tr
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="border-bottom"
                      >
                        <td className="px-4 py-4">
                          <div className="d-flex align-items-center">
                            <div className="position-relative">
                              <Image
                                src={item.image}
                                rounded-3
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                                className="shadow-sm border"
                              />
                            </div>
                            <div className="ms-3">
                              <h6 className="fw-bold mb-1 fs-5">{item.name}</h6>
                              <button
                                className="btn btn-link text-danger p-0 small text-decoration-none d-flex align-items-center opacity-75 hover-opacity-100"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 size={14} className="me-1" /> Quitar
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 fw-medium">${item.price}</td>
                        <td className="py-4">
                          <div
                            className="d-flex align-items-center border rounded-pill p-1 mx-auto"
                            style={{
                              width: "fit-content",
                              background: "#f8fafc",
                            }}
                          >
                            <button
                              className="btn btn-sm btn-white rounded-circle shadow-sm p-1"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span className="mx-3 fw-bold">
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-sm btn-white rounded-circle shadow-sm p-1"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-end px-4 fw-bold fs-5 text-primary">
                          ${item.price * item.quantity}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Link
            to="/products"
            className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center gap-2 mb-4 mb-lg-0"
          >
            <ArrowLeft size={16} /> Seguir explorando productos
          </Link>
        </Col>

        <Col lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="border-0 shadow-lg rounded-4 p-4 sticky-top"
              style={{ top: "100px", zIndex: 10 }}
            >
              <h4 className="fw-bold mb-4">Resumen de Pedido</h4>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal de productos</span>
                <span className="fw-bold fs-5">${totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 pb-4 border-bottom">
                <span className="text-muted">Costo de envío</span>
                <span className="text-success fw-bold">GRATIS</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold mb-0">Total Final</h5>
                <h5 className="fw-bold text-primary display-6 mb-0">
                  ${totalPrice}
                </h5>
              </div>

              <div className="bg-light p-3 rounded-4 mb-4 small text-muted border-dashed">
                <div className="d-flex gap-2 mb-1">
                  <span className="text-primary fw-bold">✓</span> Pago 100%
                  seguro
                </div>
                <div className="d-flex gap-2">
                  <span className="text-primary fw-bold">✓</span> Garantía de
                  satisfacción
                </div>
              </div>

              <div className="d-grid">
                <Button
                  variant="primary"
                  size="lg"
                  className="py-3 rounded-pill fw-bold shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2 btn-premium"
                  onClick={handleCheckout}
                >
                  <CreditCard size={22} /> Finalizar el Pedido
                </Button>
                <div className="text-center">
                  <Image
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    height="25"
                    className="me-2"
                  />
                  <Image
                    src="https://img.icons8.com/color/48/000000/mastercard.png"
                    height="25"
                    className="me-2"
                  />
                  <Image
                    src="https://img.icons8.com/color/48/000000/mercado-pago.png"
                    height="25"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
