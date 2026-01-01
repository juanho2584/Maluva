import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Badge,
  Card,
  Tabs,
  Tab,
  Nav,
} from "react-bootstrap";
import { PRODUCTS, CATEGORIES } from "../../utils/mockData";
import { useCart } from "../../context/CartContext";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const { orders, updateOrderStatus } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "velas",
    stock: "",
    description: "",
    image: "",
    badge: "",
  });

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: "",
        category: "velas",
        stock: "",
        description: "",
        image: "",
        badge: "",
      });
    }
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((p) => p.id !== id));
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...formData, id: p.id } : p
        )
      );
      Swal.fire(
        "Actualizado",
        "Producto actualizado correctamente.",
        "success"
      );
    } else {
      const newProduct = { ...formData, id: Date.now() };
      setProducts([...products, newProduct]);
      Swal.fire("Creado", "Producto agregado correctamente.", "success");
    }
    setShowModal(false);
  };

  const handleShowOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    Swal.fire({
      title: "Estado Actualizado",
      text: `El pedido #${orderId} ahora está ${newStatus}`,
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-0">Panel Control Admin</h1>
          <p className="text-muted">
            Gestión de inventario y pedidos de clientes
          </p>
        </div>
        {activeTab === "products" && (
          <Button
            variant="primary"
            onClick={() => handleOpenModal()}
            className="px-4 py-2 rounded-pill fw-bold shadow-sm"
          >
            <Plus size={20} className="me-2" /> Nuevo Producto
          </Button>
        )}
      </div>

      <Card className="border-0 shadow-lg rounded-4 overflow-hidden mb-5">
        <Card.Body className="p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="admin-tabs border-bottom"
            fill
          >
            <Tab
              eventKey="products"
              title={
                <span>
                  <Package size={18} className="me-2" />
                  Productos
                </span>
              }
            >
              <div className="p-4">
                <div className="position-relative mb-4">
                  <Search
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    size={20}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nombre o categoría..."
                    className="ps-5 py-3 border-light bg-light rounded-pill"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>

                <Table responsive hover className="align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">Producto</th>
                      <th className="border-0 py-3">Categoría</th>
                      <th className="border-0 py-3">Precio</th>
                      <th className="border-0 py-3">Stock</th>
                      <th className="border-0 py-3 text-end px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center">
                            <img
                              src={product.image}
                              className="rounded me-3 shadow-sm"
                              style={{
                                width: "45px",
                                height: "45px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <h6 className="fw-bold mb-0">{product.name}</h6>
                              {product.badge && (
                                <Badge bg="vivid-badge" className="small">
                                  {product.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-capitalize">
                          {product.category}
                        </td>
                        <td className="py-3 fw-bold text-primary">
                          ${product.price}
                        </td>
                        <td className="py-3">
                          <span
                            className={`fw-bold ${
                              product.stock < 10
                                ? "text-danger"
                                : "text-success"
                            }`}
                          >
                            {product.stock} un.
                          </span>
                        </td>
                        <td className="py-3 text-end px-4">
                          <Button
                            variant="light"
                            size="sm"
                            className="me-2 text-primary rounded-circle p-2"
                            onClick={() => handleOpenModal(product)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="text-danger rounded-circle p-2"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            <Tab
              eventKey="orders"
              title={
                <span>
                  <ShoppingBag size={18} className="me-2" />
                  Todos los Pedidos
                </span>
              }
            >
              <div className="p-4">
                {orders.length === 0 ? (
                  <div className="text-center py-5">
                    <ShoppingBag
                      size={64}
                      className="text-muted opacity-25 mb-3"
                    />
                    <h5>No hay pedidos registrados aún</h5>
                  </div>
                ) : (
                  <Table responsive hover className="align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 px-4 py-3">ID / Fecha</th>
                        <th className="border-0 py-3">Cliente</th>
                        <th className="border-0 py-3">Items</th>
                        <th className="border-0 py-3">Total</th>
                        <th className="border-0 py-3">Estado</th>
                        <th className="border-0 py-3 text-end px-4">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-3 border-0">
                            <div className="fw-bold">#{order.id}</div>
                            <div className="text-muted small">{order.date}</div>
                          </td>
                          <td className="py-3 border-0">
                            <div className="d-flex align-items-center gap-2">
                              <User size={14} className="text-primary" />
                              <span>{order.userName}</span>
                            </div>
                            <div className="text-muted small">
                              {order.userEmail}
                            </div>
                          </td>
                          <td className="py-3 border-0">
                            <Badge bg="light" text="dark" className="border">
                              {order.items.length} productos
                            </Badge>
                          </td>
                          <td className="py-3 border-0 fw-bold text-primary">
                            ${order.total}
                          </td>
                          <td className="py-3 border-0">
                            <Badge
                              bg={
                                order.status === "Completado"
                                  ? "success"
                                  : order.status === "Enviado"
                                  ? "info"
                                  : order.status === "Cancelado"
                                  ? "danger"
                                  : "warning"
                              }
                              className="rounded-pill px-3 py-2"
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3 border-0 text-end px-4">
                            <Button
                              variant="light"
                              size="sm"
                              className="text-primary fw-bold"
                              onClick={() => handleShowOrderDetails(order)}
                            >
                              Ver Detalle
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* CRUD Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton className="border-0 px-4 pt-4">
            <Modal.Title className="fw-bold">
              {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row className="gy-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-bold small text-muted text-uppercase">
                    Nombre del Producto
                  </Form.Label>
                  <Form.Control
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="py-2 border-light bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold small text-muted text-uppercase">
                    Precio ($)
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="py-2 border-light bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold small text-muted text-uppercase">
                    Categoría
                  </Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="py-2 border-light bg-light text-capitalize"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold small text-muted text-uppercase">
                    Stock Inicial
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="py-2 border-light bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold small text-muted text-uppercase">
                    Etiqueta (Opcional)
                  </Form.Label>
                  <Form.Control
                    placeholder="Ej: Nuevo, Oferta, Más Vendido"
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    className="py-2 border-light bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-bold small text-muted text-uppercase">
                    URL de la Imagen
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="py-2 border-light bg-light"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-bold small text-muted text-uppercase">
                    Descripción
                  </Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="py-2 border-light bg-light"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 px-4 pb-4 pt-0">
            <Button
              variant="light"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-pill"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="px-5 py-2 rounded-pill fw-bold"
            >
              {editingProduct ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Order Detail Modal */}
      <Modal
        show={showOrderModal}
        onHide={() => setShowOrderModal(false)}
        size="lg"
        centered
      >
        {selectedOrder && (
          <>
            <Modal.Header closeButton className="border-0 px-4 pt-4">
              <Modal.Title className="fw-bold">
                Detalle del Pedido #{selectedOrder.id}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Row className="mb-4">
                <Col md={6}>
                  <h6 className="text-muted small text-uppercase fw-bold mb-3">
                    Información del Cliente
                  </h6>
                  <p className="mb-1 fw-bold">{selectedOrder.userName}</p>
                  <p className="text-muted small mb-0">
                    {selectedOrder.userEmail}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted small text-uppercase fw-bold mb-3">
                    Cambiar Estado
                  </h6>
                  <Form.Select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      handleStatusChange(selectedOrder.id, e.target.value)
                    }
                    className="py-2 border-primary bg-light fw-bold"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </Form.Select>
                </Col>
              </Row>

              <h6 className="text-muted small text-uppercase fw-bold mb-3">
                Productos Comprados
              </h6>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 small">Producto</th>
                      <th className="border-0 small text-center">Cant.</th>
                      <th className="border-0 small text-end">Precio Unit.</th>
                      <th className="border-0 small text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={item.image}
                              className="rounded"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                              }}
                            />
                            <span className="fw-bold fs-6">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">${item.price}</td>
                        <td className="text-end fw-bold">
                          ${item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-top">
                      <td colSpan="3" className="text-end fw-bold py-3 fs-5">
                        Total del Pedido
                      </td>
                      <td className="text-end fw-bold py-3 fs-5 text-primary">
                        ${selectedOrder.total}
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0 px-4 pb-4">
              <Button
                variant="light"
                onClick={() => setShowOrderModal(false)}
                className="px-4 py-2 rounded-pill"
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
