// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField} from '@mui/material';
import { Modal } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import Cookies from 'js-cookie';


//URL BASE
const REST_URL = 'http://www.etvtauladesfons.com/api/usuaris';

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
const CrudUsuaris = () => {

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
    const [usuariSeleccionat, setUsuariSeleccionat] = useState({
        NOM_COMPLET: '',
        DNI: '',
        CORREU_ELECTRONIC: '',
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setUsuariSeleccionat(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getUsuari()
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

    const seleccionarUsuari = (usuari, caso) => {
        setUsuariSeleccionat(usuari);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    // ! GET ALL
    const getUsuari = async () => {
        await axios.get(REST_URL)
            .then(response => {
                setData(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    // ! POST
    const insertUsuari = async () => {
        await axios.post(REST_URL, usuariSeleccionat, config)
            .then(response => {
                setData(data.concat(response.data.data))
                abrirCerrarModalInsertar()
                window.location.reload(true);
            })
    }
    // ! PUT
    const updateUsuari = async () => {
        await axios.put(REST_URL + '/put/' + usuariSeleccionat.ID_USUARI, usuariSeleccionat, config)
            .then(response => {
                abrirCerrarModalEditar();
                getUsuari();
            })
    }
    // ! DELETE
    const deleteUsuari = async () => {
        await axios.delete(REST_URL + "/destroy/" + usuariSeleccionat.ID_USUARI, config)
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
            <h3 align="center">Afegir un nou usuari</h3>
            <br />
            <TextField name='NOM_COMPLET' style={inputMaterial} label="Nom Usuari" onChange={handleChange} />
            <br />
            <TextField name='DNI' style={inputMaterial} label="DNI" onChange={handleChange} />
            <br />
            <TextField name='CORREU_ELECTRONIC' style={inputMaterial} label="Correu Electrònic" onChange={handleChange} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => insertUsuari()}>Insertar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Editar usuari</h3>
            <br />
            <TextField name='NOM_COMPLET' style={inputMaterial} label="Nom Usuari" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.NOM_COMPLET} />
            <br />
            <TextField name='DNI' style={inputMaterial} label="DNI" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.DNI}/>
            <br />
            <TextField name='CORREU_ELECTRONIC' style={inputMaterial} label="Correu Electrònic" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.CORREU_ELECTRONIC}/>
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateUsuari()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estàs segur de que vols eliminar l'usuari <b>{usuariSeleccionat && usuariSeleccionat.NOM_COMPLET}</b> ?</h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteUsuari()}>Sí</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )
    
    return (
        <div>
            <br />
            <h1>Crud Usuaris</h1>
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
                        {data.map((usuari) => (
                            <TableRow key={usuari.ID_USUARI}>
                                {Object.entries(usuari).map(([key, value]) => (
                                    <TableCell
                                        key={`${usuari.ID_USUARI}_${key}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Edit style={cursorPointer} onClick={() => seleccionarUsuari(usuari, 'Editar')} />
                                    &nbsp;&nbsp;
                                    <Delete style={cursorPointer} onClick={() => seleccionarUsuari(usuari, 'Eliminar')} />
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

export default CrudUsuaris;