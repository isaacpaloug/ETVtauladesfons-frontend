import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Button, Col, Container, Form, Row} from "react-bootstrap";


const Usuario = ({ usuario }) => {
    const [userData, setUserData] = useState({
        DNI: usuario.DNI,
        NOM_COMPLET: usuario.NOM_COMPLET,
        CORREU_ELECTRONIC: usuario.CORREU_ELECTRONIC,
        CONTRASENYA: usuario.CONTRASENYA,
        TELEFON: usuario.TELEFON,
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const token = Cookies.get("token");
        try {
            const response = await axios.put(
                `http://www.etvtauladesfons.com/api/usuaris/put/${usuario.ID_USUARI}`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status === "error") {
                console.error(response.data.message);
            } else {
                console.log("Datos actualizados correctamente");
            }
        } catch (error) {
            console.error("Error al actualizar los datos", error);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <Form.Group controlId="formDNI">
                            <Form.Label>DNI:</Form.Label>
                            <Form.Control
                                type="text"
                                name="DNI"
                                value={userData.DNI}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFullName">
                            <Form.Label>Nombre completo:</Form.Label>
                            <Form.Control
                                type="text"
                                name="NOM_COMPLET"
                                value={userData.NOM_COMPLET}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Correo electrónico:</Form.Label>
                            <Form.Control
                                type="email"
                                name="CORREU_ELECTRONIC"
                                value={userData.CORREU_ELECTRONIC}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control
                                type="password"
                                name="CONTRASENYA"
                                value={userData.CONTRASENYA}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono:</Form.Label>
                            <Form.Control
                                type="text"
                                name="TELEFON"
                                value={userData.TELEFON}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" onClick={handleSave}>
                            Guardar cambios
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Usuario;
