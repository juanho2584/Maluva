import React from "react";
import { Container, Card, Table, Badge, Row, Col } from "react-bootstrap";
import {
  Package,
  Calendar,
  Tag,
  CreditCard,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Orders = () => {
  const { orders, updateOrderStatus, addToCart } = useCart();
  const { user } = useAuth();

  // Filter orders for the logged-in user
  const personOrders = orders.filter((o) => o.userEmail === user?.email);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "warning";
      case "Enviado":
        return "info";
      case "Completado":
        return "success";
      case "Cancelado":
        return "danger";
      default:
        return "secondary";
    }
  };

  const statusSteps = [
    { label: "Pendiente", icon: Clock },
    { label: "Enviado", icon: Truck },
    { label: "Completado", icon: CheckCircle2 },
  ];

  const handleCancelOrder = (orderId) => {
    updateOrderStatus(orderId, "Cancelado");
  };

  if (personOrders.length === 0) {
    return (
      <Container className="py-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-5"
        >
          <Package size={80} className="text-muted mb-4 opacity-50" />
          <h2 className="fw-bold mb-3">Aún no tienes pedidos</h2>
          <p className="text-muted lead mb-0">
            ¡Tus futuras compras aparecerán en esta sección!
          </p>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-5">Mis Pedidos</h1>
      <Row className="g-4">
        {personOrders.map((order) => (
          <Col key={order.id} xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-3">
                <Card.Header className="bg-white border-bottom-0 p-4">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                      <span className="text-muted small d-block text-uppercase fw-bold">
                        ID del Pedido
                      </span>
                      <h6 className="fw-bold mb-0">#{order.id}</h6>
                    </div>
                    <div>
                      <span className="text-muted small d-block text-uppercase fw-bold">
                        Fecha
                      </span>
                      <div className="d-flex align-items-center gap-1">
                        <Calendar size={14} className="text-primary" />
                        <h6 className="mb-0 small">{order.date}</h6>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted small d-block text-uppercase fw-bold">
                        Estado
                      </span>
                      <Badge
                        bg={getStatusColor(order.status)}
                        className="rounded-pill px-3 py-2"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-end">
                      <span className="text-muted small d-block text-uppercase fw-bold">
                        Total Pagado
                      </span>
                      <h5 className="fw-bold mb-0 text-primary">
                        ${order.total}
                      </h5>
                    </div>
                  </div>

                  {/* Status Tracker */}
                  {order.status !== "Cancelado" && (
                    <div className="px-4 pb-4">
                      <div className="d-flex justify-content-between position-relative mt-4">
                        <div
                          className="position-absolute top-50 start-0 translate-middle-y w-100 bg-light-subtle"
                          style={{ height: "2px", zIndex: 0 }}
                        >
                          <div
                            className="bg-primary transition-all duration-500"
                            style={{
                              height: "100%",
                              width:
                                order.status === "Pendiente"
                                  ? "0%"
                                  : order.status === "Enviado"
                                  ? "50%"
                                  : "100%",
                            }}
                          />
                        </div>
                        {statusSteps.map((step, idx) => {
                          const Icon = step.icon;
                          const isCompleted =
                            (order.status === "Enviado" && idx === 0) ||
                            (order.status === "Completado" && idx <= 2) ||
                            order.status === step.label;
                          const isActive = order.status === step.label;

                          return (
                            <div
                              key={idx}
                              className="text-center position-relative"
                              style={{ zIndex: 1 }}
                            >
                              <div
                                className={`rounded-circle p-2 d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm ${
                                  isActive
                                    ? "bg-primary text-white"
                                    : isCompleted
                                    ? "bg-primary text-white"
                                    : "bg-white text-muted border"
                                }`}
                                style={{ width: "40px", height: "40px" }}
                              >
                                {isCompleted && !isActive ? (
                                  <CheckCircle2 size={20} />
                                ) : (
                                  <Icon size={20} />
                                )}
                              </div>
                              <span
                                className={`small fw-bold ${
                                  isActive ? "text-primary" : "text-muted"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card.Header>
                <Card.Body className="p-4 bg-light bg-opacity-50">
                  <div className="table-responsive">
                    <Table borderless size="sm" className="mb-0">
                      <thead>
                        <tr>
                          <th className="text-muted small text-uppercase py-0">
                            Producto
                          </th>
                          <th className="text-muted small text-uppercase py-0 text-center">
                            Cant.
                          </th>
                          <th className="text-muted small text-uppercase py-0 text-end">
                            Precio
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2">
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={item.image}
                                  className="rounded"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    objectFit: "cover",
                                  }}
                                />
                                <span className="fw-bold">{item.name}</span>
                              </div>
                            </td>
                            <td className="py-2 text-center">
                              x{item.quantity}
                            </td>
                            <td className="py-2 text-end fw-bold">
                              ${item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <div className="mt-4 d-flex justify-content-end gap-2">
                    {order.status === "Pendiente" && (
                      <button
                        className="btn btn-outline-danger rounded-pill px-4 btn-sm d-flex align-items-center gap-2 fw-bold"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <XCircle size={16} /> Cancelar Pedido
                      </button>
                    )}
                    {order.status === "Completado" && (
                      <button
                        className="btn btn-primary rounded-pill px-4 btn-sm d-flex align-items-center gap-2 fw-bold"
                        onClick={() => {
                          order.items.forEach((item) => addToCart(item));
                          alert("Productos añadidos al carrito");
                        }}
                      >
                        <RefreshCcw size={16} /> Volver a Comprar
                      </button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Orders;
