import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        // Comprobar si hay una cookie válida al cargar la página
        const token = Cookies.get("token");
        const isAdmin = Cookies.get("isAdmin") === "true";

        if (token) {
            setIsLoggedIn(true);
            setShowMessage(true);
            setIsAdmin(isAdmin);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://www.etvtauladesfons.com/api/login", {
                CORREU_ELECTRONIC: email,
                CONTRASENYA: password,
            })
            .then((response) => {
                // Almacenamos el token en una cookie
                Cookies.set("token", response.data.data.TOKEN, { expires: 10 });
                Cookies.set("isAdmin", response.data.data.ADMINISTRADOR === 1, { expires: 10 });
                // Actualizamos el estado de isLoggedIn
                setIsLoggedIn(true);
                setShowMessage(true);
                setIsAdmin(response.data.data.ADMINISTRADOR === 1);

                console.log(response.data.data.TOKEN);
            })
            .catch((error) => {
                console.log(error);
                setShowError(true);
            });

    };

    const handleLogout = () => {
        if (window.confirm("¿Estas segur de voler fer logout?")) {
            // Borrar la cookie
            Cookies.remove("token");

            // Actualizar el estado de isLoggedIn
            setIsLoggedIn(false);
            setShowMessage(false);
        }
    };

    return (
        <div>
            {showMessage && isLoggedIn && (
                <div>
                    <h1>Benvingut{isAdmin ? ' administrador' : ''}, has iniciat sessió correctament</h1>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            )}
            {!showMessage && !isLoggedIn && (
                <div>
                    <h2>Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                        {showError && (
                            <Alert variant="danger">Invalid email or password</Alert>
                        )}
                    </Form>
                </div>
            )}

        </div>
    );
}


export default LoginForm;
