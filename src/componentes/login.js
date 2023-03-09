import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

function LoginForm({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://www.etvtauladesfons.com/api/login", {
                CORREU_ELECTRONIC: email,
                CONTRASENYA: password,
            })
            .then((response) => {
                // Almacenamos el token en una cookie
                Cookies.set("token", response.data.Token, { expires: 10 });
                console.log(response.data.Token);

                // Mostramos un mensaje de éxito y actualizamos el estado de isLoggedIn
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.log(error);
                setShowError(true);
            });
    };

    return (
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
    );
}

export default LoginForm;
