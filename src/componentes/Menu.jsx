import { useState } from "react";
import { Navbar, Nav, Modal, Input, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import LoginForm from "./login";
import Cookies from "js-cookie";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { MDBFooter } from 'mdb-react-ui-kit';
import BarraCerca from "./BarraCerca";


function Menu() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };
    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const isAdmin = Cookies.get("isAdmin") === "true";
    const token = Cookies.get("token");

    return (
        <>
            <Navbar bg="dark" className="color-nav" variant="dark" expand="sm" sticky="top">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/inici">Inici</Link>
                    <Link className="nav-link" to="/allotjaments">Allotjaments</Link>
                    <Nav.Link onClick={handleShowLoginModal}>Login</Nav.Link>
                    <Link className="nav-link" to="/contacte">Contacte</Link>
                    {token && (
                        <>
                            <Link className="nav-link" to="/reserves">Reserves</Link>
                            <Link className="nav-link" to="/usuari">Usuari</Link>
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <Link className="nav-link" to="/adminMenu"><AdminPanelSettingsIcon />Admin</Link>
                        </>
                    )}
                </Nav>
            </Navbar>

            <Container>
                <Outlet />
            </Container>
            <MDBFooter className='text-center' color='white' bgColor='dark' style={{ position: "relative", bottom: 0, width: "100%" }}>
                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © {new Date().getFullYear()}:
                    <a className='text-white' href='http://etvtauladesfons.com/etvclient'>EtvClient</a>
                </div>
            </MDBFooter>
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