import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, LogOut, Heart, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from '../assets/images/Logo 02.png'
import {
  Badge,
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [expanded, setExpanded] = React.useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <BootstrapNavbar
      bg="white"
      expand="lg"
      className="shadow-sm sticky-top"
      expanded={expanded}
      onToggle={(nextExpanded) => setExpanded(nextExpanded)}
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 text-primary logo-font d-flex align-items-center"
          onClick={closeNavbar}
        >
          <img
            src={logo}
            alt="Maluva Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          Maluva
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" onClick={closeNavbar}>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" onClick={closeNavbar}>
              Productos Generales
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={closeNavbar}>
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={closeNavbar}>
              Contacto
            </Nav.Link>

            {user ? (
              <NavDropdown
                title={
                  <>
                    <User size={20} className="me-1" /> {user.name}
                  </>
                }
                id="user-dropdown"
                className="ms-lg-3"
              >
                {isAdmin ? (
                  <NavDropdown.Item as={Link} to="/admin" onClick={closeNavbar}>
                    Dashboard Admin
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    as={Link}
                    to="/orders"
                    onClick={closeNavbar}
                  >
                    Mis Pedidos
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    logout();
                    closeNavbar();
                  }}
                  className="text-danger"
                >
                  <LogOut size={16} className="me-1" /> Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                onClick={closeNavbar}
                className="btn btn-primary text-white px-3 ms-lg-3 d-flex align-items-center rounded-pill"
              >
                <LogIn size={18} className="me-2" /> Login
              </Nav.Link>
            )}

            {!isAdmin && (
              <Nav.Link
                as={Link}
                to="/cart"
                onClick={closeNavbar}
                className="position-relative ms-lg-3 cart-link-glow"
                title="Mi Carrito"
              >
                {/* Animation container for the circle only */}
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    boxShadow: "0 0 20px rgba(249, 168, 212, 0.5)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="cart-icon-container bg-white border shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "45px", height: "45px" }}
                >
                  <motion.div
                    key={cartCount}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <ShoppingCart size={22} className="text-primary" />
                  </motion.div>
                </motion.div>

                {/* Badge outside the rotating container but inside the relative link */}
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="cart-badge"
                      initial={{ opacity: 0, scale: 0, x: 5, y: -5 }}
                      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, scale: 0, x: 5, y: -5 }}
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary border-white shadow-sm"
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.4em 0.65em",
                        zIndex: 5,
                        marginTop: "5px",
                        marginLeft: "-5px",
                      }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
