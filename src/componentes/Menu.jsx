import { useState } from "react";
import { Navbar, Nav, Container, Modal } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom";
import LoginForm from "./login";


function Menu() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    return (
        <>
            <Navbar bg="dark" className="color-nav" variant="dark" expand="sm" sticky="top">
                <Nav className="mr-auto">

                    <Link className="nav-link" to="/">Inici</Link>
                    <Nav.Link onClick={handleShowLoginModal}>Login</Nav.Link>
                    <Link className="nav-link" to="/CRUDallotjaments">CRUDAllotjaments</Link>
                    <Link className="nav-link" to="/registrarse">Registre Usuari nou</Link>
                    <Link className="nav-link" to="/contacte">Contacte</Link>
                </Nav>
            </Navbar>
                <Outlet />
            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm onClose={handleCloseLoginModal} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Menu;
