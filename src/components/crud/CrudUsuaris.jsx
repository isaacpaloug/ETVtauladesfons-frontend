// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField, TablePagination } from '@mui/material';
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
        DNI: '',
        NOM_COMPLET: '',
        CORREU_ELECTRONIC: '',
        TELEFON: '',
        CONTRASENYA: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setUsuariSeleccionat(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getUsuaris()
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
    const getUsuaris = async () => {
        await axios.get(REST_URL, config)
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
                let newData = data.map(usuari => {
                    if (usuari.ID_USUARI === response.data.data.ID_USUARI) {
                        return response.data.data;
                    }
                    return usuari;
                });
                setData(newData);
                abrirCerrarModalEditar();
            })
            .catch(error => {
                console.log('Error al actualizar el usuario:', error.response);
            });
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
            <form onSubmit={insertUsuari}>
            <br />
            <h3 align="center">Afegir un nou usuari</h3>
            <br />
            <TextField name='DNI' style={inputMaterial} label="DNI" onChange={handleChange} />
            <br />
            <TextField name='NOM_COMPLET' style={inputMaterial} label="Nom Complet" onChange={handleChange} />
            <br />
            <TextField name='CORREU_ELECTRONIC' style={inputMaterial} label="Correu Electrònic" onChange={handleChange} />
            <br />
            <TextField name='TELEFON' style={inputMaterial} label="Telèfon" onChange={handleChange} />
            <br />
            <TextField name='CONTRASENYA' style={inputMaterial} label="Contrasenya" onChange={handleChange} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => insertUsuari()}>Insertar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
            </form>
        </div>
    );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <form onSubmit={updateUsuari}>
            <br />
            <h3 align="center">Editar Usuari</h3>
            <br />
            <TextField name='DNI' style={inputMaterial} label="DNI" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.DNI} />
            <br />
            <TextField name='NOM_COMPLET' style={inputMaterial} label="Nom Complet" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.NOM_COMPLET} />
            <br />
            <TextField name='CORREU_ELECTRONIC' style={inputMaterial} label="Correu Electronic" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.CORREU_ELECTRONIC} />
            <br />
            <TextField name='TELEFON' style={inputMaterial} label="Telefon" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.TELEFON} />
            <br />
            <TextField name='CONTRASENYA' style={inputMaterial} label="Contrasenya" onChange={handleChange} />
            <br />
                <TextField name='ADMINISTRADOR' style={inputMaterial} label="Administrador" onChange={handleChange} value={usuariSeleccionat && usuariSeleccionat.ADMINISTRADOR} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateUsuari()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
                </form>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estàs segur de que vols eliminar l'usuari <b>{usuariSeleccionat && usuariSeleccionat.NOM_COMPLET}</b>?</h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteUsuari()}>Sí</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )
    // Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(99);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((usuari) => (
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
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

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