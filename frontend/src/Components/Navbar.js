import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { DumbbellIcon, PlusIcon } from "lucide-react";

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center"
          as={Link}
          to="/"
          style={{ color: "white", fontSize: "1.5rem" }}
        >
          <DumbbellIcon className="icon-custom m-1" size={40} />
          Fitness Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{ color: "white", fontSize: "1.3rem" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/exercises"
              style={{ color: "white", fontSize: "1.3rem" }}
            >
              Exercises
            </Nav.Link>
            <Button
              as={Link}
              to="/create/workout"
              variant="primary"
              className="button-custom-bg d-flex align-items-center p-2 me-2 m-1"
            >
              <PlusIcon size={18} />
              Přidat trénink
            </Button>
            <Button
              as={Link}
              to="/create/exercise"
              variant="primary"
              className="button-custom-bg d-flex align-items-center p-2 me-2 m-1"
            >
              <PlusIcon size={18} />
              Přidat cvik
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
