import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, Col, Row, Table, Button, Form } from "react-bootstrap";

function ReadMunicipis() {
    const [municipis, setMunicipis] = useState([]);
    const [municipiSeleccionat, setMunicipiSeleccionat] = useState(null);
    const [nouNomMunicipi, setNouNomMunicipi] = useState("");

    const handleUpdateClick = (municipi) => {
        setMunicipiSeleccionat(municipi);
    };

    const handleUpdate = () => {
        if (!municipiSeleccionat) return;

        const idMunicipi = municipiSeleccionat.ID_MUNICIPI;
        const token = localStorage.getItem("token");

        fetch(`http://www.etvtauladesfons.com/api/municipis/put/${idMunicipi}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ NOM_MUNICIPI: nouNomMunicipi }),
        })
            .then((response) => response.json())
            .then((jsonresposta) => {
                console.log(jsonresposta);
                // Actualizamos el municipio en la lista de municipios
                const municipisActualitzats = municipis.map((municipi) => {
                    if (municipi.ID_MUNICIPI === idMunicipi) {
                        return { ...municipi, NOM_MUNICIPI: nouNomMunicipi };
                    } else {
                        return municipi;
                    }
                });
                setMunicipis(municipisActualitzats);

                // Limpiamos los estados
                setNouNomMunicipi("");
                setMunicipiSeleccionat(null);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleDeleteClick = (idMunicipi) => {
        const token = localStorage.getItem("token");

        fetch(`http://www.etvtauladesfons.com/api/municipis/destroy/${idMunicipi}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((jsonresposta) => {
                console.log(jsonresposta);
                // Filtramos el municipio eliminado de la lista de municipios
                const municipisFiltrats = municipis.filter((municipi) => municipi.ID_MUNICIPI !== idMunicipi);
                setMunicipis(municipisFiltrats);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    useEffect(() => {
        fetch("http://www.etvtauladesfons.com/api/municipis")
            .then((response) => response.json())
            .then((jsonresposta) => setMunicipis(jsonresposta.data))
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            {municipiSeleccionat && (
                <div>
                    <Form.Control
                        type="text"
                        placeholder="Nom municipi"
                        value={nouNomMunicipi}
                        onChange={(event) => setNouNomMunicipi(event.target.value)}
                    />
                    <Button variant="primary" onClick={handleUpdate}>
                        Actualitzar municipi
                    </Button>
                </div>
            )}
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>
                        <h2>Municipi</h2>
                    </th>
                    <th>
                        <h2>Accions</h2>
                    </th>
                </tr>
                </thead>
                <tbody>
                {municipis.map((municipi) => (
                    <tr key={municipi.ID_MUNICIPI}>
                        <td>{municipi.NOM_MUNICIPI}</td>
                        <td>
                            <Button variant="info" onClick={() => handleUpdateClick(municipi)}>
                                Actualitzar
                            </Button>
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteClick(municipi.ID_MUNICIPI)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
        </>
    );
}

export default ReadMunicipis;