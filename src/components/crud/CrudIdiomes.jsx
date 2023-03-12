// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField} from '@mui/material';
import { Modal } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import Cookies from 'js-cookie';


//URL BASE
const REST_URL = 'http://www.etvtauladesfons.com/api/idiomes';

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
const CrudIdiomes = () => {

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
    const [idiomaSeleccionat, setIdiomaSeleccionat] = useState({
        NOM_IDIOMA: '',
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setIdiomaSeleccionat(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getIdiomes()
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

    const seleccionarIdioma = (idioma, caso) => {
        setIdiomaSeleccionat(idioma);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    // ! GET ALL
    const getIdiomes = async () => {
        await axios.get(REST_URL)
            .then(response => {
                setData(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    // ! POST
    const insertIdioma = async () => {
        await axios.post(REST_URL, idiomaSeleccionat, config)
            .then(response => {
                setData(data.concat(response.data.data))
                abrirCerrarModalInsertar()
                window.location.reload(true);
            })
    }
    // ! PUT
    const updateIdioma = async () => {
        await axios.put(REST_URL + '/put/' + idiomaSeleccionat.ID_IDIOMA, idiomaSeleccionat, config)
            .then(response => {
                abrirCerrarModalEditar();
                getIdiomes();
            })
    }
    // ! DELETE
    const deleteIdioma = async () => {
        await axios.delete(REST_URL + "/destroy/" + idiomaSeleccionat.ID_IDIOMA, config)
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
            <h3 align="center">Afegir un nou idioma</h3>
            <br />
            <TextField name='NOM_IDIOMA' style={inputMaterial} label="Nom Idioma" onChange={handleChange} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => insertIdioma()}>Insertar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Editar idioma</h3>
            <br />
            <TextField name='NOM_IDIOMA' style={inputMaterial} label="Idioma" onChange={handleChange} value={idiomaSeleccionat && idiomaSeleccionat.NOM_IDIOMA} />
            <br />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateIdioma()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estàs segur de que vols eliminar l'idioma <b>{idiomaSeleccionat && idiomaSeleccionat.NOM_IDIOMA}?</b> </h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteIdioma()}>Sí</Button>
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
                        {data.map((idioma) => (
                            <TableRow key={idioma.ID_IDIOMA}>
                                {Object.entries(idioma).map(([key, value]) => (
                                    <TableCell
                                        key={`${idioma.ID_IDIOMA}_${key}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Edit style={cursorPointer} onClick={() => seleccionarIdioma(idioma, 'Editar')} />
                                    &nbsp;&nbsp;
                                    <Delete style={cursorPointer} onClick={() => seleccionarIdioma(idioma, 'Eliminar')} />
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

export default CrudIdiomes;