// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField} from '@mui/material';
import { Modal } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import Cookies from 'js-cookie';


//URL BASE
const REST_URL = 'http://www.etvtauladesfons.com/api/tipus';

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
const CrudTipusAllotjaments = () => {

    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const token = Cookies.get('token');
    const adminCookie = Cookies.get('isAdmin');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const [tipusSeleccionat, setTipusSeleccionat] = useState({
        NOM_TIPUS: '',
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setTipusSeleccionat(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getTipus()
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

    const seleccionarTipus = (tipus, caso) => {
        setTipusSeleccionat(tipus);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    // ! GET ALL
    const getTipus = async () => {
        await axios.get(REST_URL)
            .then(response => {
                setData(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    // ! POST
    const insertTipus = async () => {
        await axios.post(REST_URL, tipusSeleccionat, config)
            .then(response => {
                setData(data.concat(response.data.data))
                abrirCerrarModalInsertar()
                window.location.reload(true);
            })
    }
    // ! PUT
    const updateTipus = async () => {
        await axios.put(REST_URL + '/put/' + tipusSeleccionat.ID_TIPUS, tipusSeleccionat, config)
            .then(response => {
                abrirCerrarModalEditar();
                getTipus();
            })
    }
    // ! DELETE
    const deleteTipus = async () => {
        await axios.delete(REST_URL + "/destroy/" + tipusSeleccionat.ID_TIPUS, config)
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
            <h3 align="center">Afegir un nou tipus</h3>
            <br />
            <TextField name='NOM_TIPUS' style={inputMaterial} label="Nom tipus" onChange={handleChange} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => insertTipus()}>Insertar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Editar tipus</h3>
            <br />
            <TextField name='NOM_TIPUS' style={inputMaterial} label="Nom Comercial" onChange={handleChange} value={tipusSeleccionat && tipusSeleccionat.NOM_TIPUS} />
            <br />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateTipus()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estàs segur de que vols eliminar el tipus <b>{tipusSeleccionat && tipusSeleccionat.NOM_TIPUS}?</b> </h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteTipus()}>Sí</Button>
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
                        {data.map((tipus) => (
                            <TableRow key={tipus.ID_TIPUS}>
                                {Object.entries(tipus).map(([key, value]) => (
                                    <TableCell
                                        key={`${tipus.ID_TIPUS}_${key}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Edit style={cursorPointer} onClick={() => seleccionarTipus(tipus, 'Editar')} />
                                    &nbsp;&nbsp;
                                    <Delete style={cursorPointer} onClick={() => seleccionarTipus(tipus, 'Eliminar')} />
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

export default CrudTipusAllotjaments;