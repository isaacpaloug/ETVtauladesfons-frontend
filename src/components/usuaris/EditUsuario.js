import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const EditUsuario = () => {
    const navigate = useNavigate();
    const userID = Cookies.get("ID_USUARI");
    const token = Cookies.get("token");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://www.etvtauladesfons.com/api/usuaris/${userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserData({ DNI: response.data.data.DNI, NOM_COMPLET: response.data.data.NOM_COMPLET, CORREU_ELECTRONIC: response.data.data.CORREU_ELECTRONIC, CONTRASENYA: "", TELEFON: response.data.data.TELEFON });
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [userID, token]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://www.etvtauladesfons.com/api/usuaris/put/${userID}`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status === "error") {
                setError(response.data.message);
            } else {
                navigate("/inici");
                
            }
        } catch (error) {
            setError(error);
        }
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>Error al cargar los datos del usuario</p>;
    }
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
                                placeholder="password"
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
                        <br />
                        <Button variant="primary" onClick={handleSave}>
                            Guardar cambios
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditUsuario;