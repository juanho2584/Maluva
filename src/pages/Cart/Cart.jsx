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
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
    placeOrder,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      Swal.fire(
        "Inicia sesión",
        "Debes estar registrado para realizar una compra",
        "warning"
      );
      navigate("/login");
      return;
    }

    Swal.fire({
      title: "¿Confirmar pedido?",
      text: `El total de tu compra es $${totalPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        placeOrder(user);
        Swal.fire(
          "¡Éxito!",
          "Tu pedido ha sido procesado correctamente.",
          "success"
        );
        navigate("/orders");
      }
    });
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5">
          <h2 className="fw-bold mb-4">Tu carrito está vacío</h2>
          <p className="text-muted lead mb-5">
            Parece que aún no has agregado nada. ¡Explora nuestra colección!
          </p>
          <Button
            as={Link}
            to="/products"
            variant="primary"
            size="lg"
            className="rounded-pill px-5"
          >
            <ArrowLeft size={20} className="me-2" /> Seguir Comprando
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-5">Tu Carrito</h1>
      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3">Producto</th>
                    <th className="py-3">Precio</th>
                    <th className="py-3">Cantidad</th>
                    <th className="py-3 text-end px-4">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="align-middle">
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <Image
                            src={item.image}
                            rounded
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            className="me-3"
                          />
                          <div>
                            <h6 className="fw-bold mb-0">{item.name}</h6>
                            <button
                              className="btn btn-link text-danger p-0 small text-decoration-none d-flex align-items-center"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={14} className="me-1" /> Eliminar
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">${item.price}</td>
                      <td className="py-3">
                        <div
                          className="d-flex align-items-center border rounded-pill p-1 bg-light"
                          style={{ width: "fit-content" }}
                        >
                          <button
                            className="btn btn-sm btn-light rounded-circle p-1"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-light rounded-circle p-1"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 text-end px-4 fw-bold text-primary">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-4">Resumen de Compra</h4>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold">${totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
              <span className="text-muted">Envío</span>
              <span className="text-success fw-bold">Gratis</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <h5 className="fw-bold">Total</h5>
              <h5 className="fw-bold text-primary">${totalPrice}</h5>
            </div>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                className="py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                onClick={handleCheckout}
              >
                <CreditCard size={20} /> Finalizar Compra
              </Button>
              <Button
                as={Link}
                to="/products"
                variant="outline-dark"
                className="py-2"
              >
                Seguir comprando
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
