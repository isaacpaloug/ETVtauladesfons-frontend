import { useState } from "react";
import { Navbar, Nav, Container, Modal } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import LoginForm from "./login";
import Cookies from "js-cookie";

function Menu() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };
    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const isAdmin = Cookies.get("isAdmin") === "true";
    const token = Cookies.get("token") === "true";

    return (
        <>
            <Navbar bg="dark" className="color-nav" variant="dark" expand="sm" sticky="top">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/inici">
                        Inici
                    </Link>
                    <Link className="nav-link" to="/llista">
                        Llista allotjaments
                    </Link>
                    <Nav.Link onClick={handleShowLoginModal}>Login</Nav.Link>
                    <Link className="nav-link" to="/registrarse">
                        Registre Usuari nou
                    </Link>
                    <Link className="nav-link" to="/contacte">
                        Contacte
                    </Link>
                    {isAdmin && (
                        <>
                            <Link className="nav-link" to="/CRUDallotjaments">
                                CRUDAllotjaments
                            </Link>
                            <Link className="nav-link" to="/CRUDVacances">
                                CRUDVacances
                            </Link>
                            <Link className="nav-link" to="/CRUDIdiomes">
                                CRUDIdiomes
                            </Link>
                            <Link className="nav-link" to="/CRUDTipus">
                                CRUDTipusAllotjaments
                            </Link>
                            <Link className="nav-link" to="/CRUDServeis">
                                CRUDServeis
                            </Link>
                            <Link className="nav-link" to="/CRUDCategories">
                                CRUDCategories
                            </Link>
                            <Link className="nav-link" to="/CRUDComentaris">
                                CRUDComentaris
                            </Link>
                            <Link className="nav-link" to="/DSTCAllotjaments">
                                DESTCAllotjaments
                            </Link>
                            <Link className="nav-link" to="/CRUDusuaris">
                                CRUDUsuaris
                            </Link>
                        </>
                    )}
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
    );
}

export default Menu;
