import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

function Registro() {
    const [nomComplet, setNomComplet] = useState("");
    const [contrasenya, setContrasenya] = useState("");
    const [correuElectronic, setCorreuElectronic] = useState("");
    const [dni, setDni] = useState("");
    const [telefon, setTelefon] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            NOM_COMPLET: nomComplet,
            CONTRASENYA: contrasenya,
            CORREU_ELECTRONIC: correuElectronic,
            DNI: dni,
            TELEFON: telefon,
        };

        fetch("http://www.etvtauladesfons.com/api/usuaris", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((jsonResposta) => {
                console.log(jsonResposta);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container">
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="nomComplet">
                    <Form.Label>Nom complet:</Form.Label>
                    <Form.Control type="text" placeholder="Nom complet" value={nomComplet} onChange={(event) => setNomComplet(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="contrasenya">
                    <Form.Label>Contrasenya:</Form.Label>
                    <Form.Control type="password" placeholder="Contrasenya" value={contrasenya} onChange={(event) => setContrasenya(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="correuElectronic">
                    <Form.Label>Correu electrònic:</Form.Label>
                    <Form.Control type="email" placeholder="Correu electrònic" value={correuElectronic} onChange={(event) => setCorreuElectronic(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="dni">
                    <Form.Label>DNI:</Form.Label>
                    <Form.Control type="text" placeholder="DNI" value={dni} onChange={(event) => setDni(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="telefon">
                    <Form.Label>Telèfon:</Form.Label>
                    <Form.Control type="tel" placeholder="Telèfon" value={telefon} onChange={(event) => setTelefon(event.target.value)} />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                    Registrar-se
                </Button>
            </Form>
        </div>
    );
}

export default Registro;
