import { Navbar, Nav, Container } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom";
import Carrusel from "./Carrusel"

function Menu() {
    return (
        <>
            <Navbar bg="dark" className="color-nav" variant="dark" expand="sm" sticky="top">
                <Nav className="mr-auto">
                    
                    <Link className="nav-link" to="/">Inici</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/CRUDallotjaments">CRUDAllorjaments</Link>
                </Nav>
            </Navbar>
            <Container>
                <Outlet />
            </Container>
            {/* <div>

                <h1>Benvinguts a ETV Tauladesfons!</h1>
                <h2>Allotjaments destacats</h2>
            </div>
            <Carrusel /> */}
        </>
    )
}

export default Menu;