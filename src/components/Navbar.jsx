import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, LogOut, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  Badge,
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [isCartAnimating, setIsCartAnimating] = React.useState(false);

  React.useEffect(() => {
    if (cartCount > 0) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => setIsCartAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 text-primary logo-font d-flex align-items-center"
        >
          <img
            src="/maluva-logo.png"
            alt="Maluva Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          Maluva
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>
            <NavDropdown title="Productos" id="products-dropdown">
              <NavDropdown.Item as={Link} to="/category/velas">
                Velas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/remeras">
                Remeras
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/tasas">
                Tasas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/vinilos">
                Vinilos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/products">
                Todos los productos
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/about">
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contacto
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/cart"
              className={`position-relative mx-2 ${
                isCartAnimating ? "cart-animate" : ""
              }`}
            >
              <ShoppingCart size={24} className="text-dark" />
              {cartCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <NavDropdown
                title={
                  <>
                    <User size={20} className="me-1" /> {user.name}
                  </>
                }
                id="user-dropdown"
              >
                {isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Dashboard Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/orders">
                  Mis Pedidos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} className="text-danger">
                  <LogOut size={16} className="me-1" /> Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="btn btn-primary text-white px-3 ms-2"
              >
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
