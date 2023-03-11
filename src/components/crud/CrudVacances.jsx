// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField } from '@mui/material';
import { Modal } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import Cookies from 'js-cookie';


//URL BASE
const REST_URL = 'http://www.etvtauladesfons.com/api/vacances';

//? CSS
const modalStyle = {
    position: 'absolute',
    width: 850,
    backgroundColor: '#f5f5f5',
    border: '2px solid #000',
    padding: 'auto',
    boxShadow: '5px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};
const cursorPointer = {
    cursor: 'pointer'
};
const inputMaterial = {
    width: '100%'
}


// ! FUNCIO CRUD
const CrudVacances = () => {

    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const token = Cookies.get('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const [vacancesSeleccionat, setVacancesSeleccionat] = useState({
        NOM_VACANCES: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setVacancesSeleccionat(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getVacances()
    }, [])

    // HOOKS DE MODAL
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const seleccionarVacances = (vacances, caso) => {
        setVacancesSeleccionat(vacances);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    // ! GET ALL
    const getVacances = async () => {
        await axios.get(REST_URL)
            .then(response => {
                setData(response.data.result);
            })
            .catch((error) => console.log(error));
    }

    // ! POST
    const insertVacances = async () => {
        await axios.post(REST_URL, vacancesSeleccionat, config)
            .then(response => {
                setData(data.concat(response.data.result))
                abrirCerrarModalInsertar()
                window.location.reload(true);
            })
    }
    // ! PUT
    const updateVacances = async () => {
        await axios.put(REST_URL + '/put/' + vacancesSeleccionat.ID_VACANCES, vacancesSeleccionat, config)
            .then(response => {
                abrirCerrarModalEditar();
                getVacances();
            })
    }
    // ! DELETE
    const deleteVacances = async () => {
        await axios.delete(REST_URL + "/destroy/" + vacancesSeleccionat.ID_VACANCES, config)
            .then(response => {
                setData();
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }
    // Body Insertar
    const bodyInsertar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Afegir un nou tipus de  vacances</h3>
            <br />
            <TextField name='NOM_VACANCES' style={inputMaterial} label="Nom Vacances" onChange={handleChange} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => insertVacances()}>Insertar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Editar Vacances</h3>
            <br />
            <TextField name='NOM_VACANCES' style={inputMaterial} label="Nom Vacances" onChange={handleChange} value={vacancesSeleccionat && vacancesSeleccionat.NOM_VACANCES} />
            <br />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateVacances()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estás segur de que vols eliminar l'vacances <b>{vacancesSeleccionat && vacancesSeleccionat.NOM_VACANCES}</b> </h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteVacances()}>Sí</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )
    
    return (
        <div>
            <br />
            <h1>Crud Idiomes</h1>
            <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
            <br /><br />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Object.keys(data[0] || {}).map((key) => (
                                <TableCell key={key}>{key}</TableCell>
                            ))}
                            <TableCell>ACCIONS</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((vacances) => (
                            <TableRow key={vacances.ID_VACANCES}>
                                {Object.entries(vacances).map(([key, value]) => (
                                    <TableCell
                                        key={`${vacances.ID_VACANCES}_${key}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Edit style={cursorPointer} onClick={() => seleccionarVacances(vacances, 'Editar')} />
                                    &nbsp;&nbsp;
                                    <Delete style={cursorPointer} onClick={() => seleccionarVacances(vacances, 'Eliminar')} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>
            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>
            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>
        </div>
    )
}

export default CrudVacances;