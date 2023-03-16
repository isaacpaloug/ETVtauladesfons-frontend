import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        // Comprobamos si hay un token almacenado en la cookie
        const token = Cookies.get("token");
        const admin = Cookies.get("isAdmin") === "true"; // Parse the string as boolean

        if (token) {
            setIsLoggedIn(true);
            setShowMessage(true);
            setIsAdmin(admin); // Set the isAdmin state based on the parsed boolean
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
                // Almacenamos el token y el valor de administrador en una cookie
                const admin = response.data.data.ADMINISTRADOR === 1;
                Cookies.set("token", response.data.data.TOKEN, { expires: 10 });
                Cookies.set("isAdmin", admin, { expires: 10 });
                Cookies.set("ID_USUARI", response.data.data.ID_USUARI, { expires: 10 }); // Almacenar ID_USUARI en la cookie

                // Actualizamos el estado de isLoggedIn y isAdmin
                setIsLoggedIn(true);
                setShowMessage(true);
                setIsAdmin(admin);

                console.log(response.data.data.TOKEN);
                console.log(response.data.data.ADMINISTRADOR);
                console.log(response.data.data.ID_USUARI); // Imprimir ID_USUARI en la consola

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
            Cookies.remove("isAdmin");
            Cookies.remove("ID_USUARI"); // Eliminar ID_USUARI de la cookie


            // Actualizar el estado de isLoggedIn
            setIsLoggedIn(false);
            setShowMessage(false);
        }
    };

    return (
        <div>
            {showMessage && isLoggedIn && (
                <div>
                    <h1>
                        Benvingut{isAdmin ? " administrador" : ""}, has iniciat sessió
                        correctament
                    </h1>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            )}
            {!showMessage && !isLoggedIn && (
                <div>
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
                        <br/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/registre'}>Registrate</Link>

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
