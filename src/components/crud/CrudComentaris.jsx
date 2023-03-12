// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField} from '@mui/material';
import { Modal } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import Cookies from 'js-cookie';


//URL BASE
const REST_URL = 'http://www.etvtauladesfons.com/api/comentaris';

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
const CrudComentaris = () => {

    const [data, setData] = useState([]);
    // const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const token = Cookies.get('token');
    const adminCookie = Cookies.get('isAdmin');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const [comentariSeleccionat, setComentariSeleccionat] = useState({
        DESCRIPCIO: '',
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setComentariSeleccionat(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getComentaris()
    }, [])

    // HOOKS DE MODAL
    // const abrirCerrarModalInsertar = () => {
    //     setModalInsertar(!modalInsertar);
    // }
    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const seleccionarComentari = (comentari, caso) => {
        setComentariSeleccionat(comentari);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    // ! GET ALL
    const getComentaris = async () => {
        await axios.get(REST_URL)
            .then(response => {
                setData(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    // // ! POST
    // const insertcomentari = async () => {
    //     await axios.post(REST_URL, comentariSeleccionat, config)
    //         .then(response => {
    //             setData(data.concat(response.data.data))
    //             abrirCerrarModalInsertar()
    //             window.location.reload(true);
    //         })
    // }
    // ! PUT
    const updateComentari = async () => {
        await axios.put(REST_URL + '/put/' + comentariSeleccionat.ID_COMENTARI, comentariSeleccionat, config)
            .then(response => {
                abrirCerrarModalEditar();
                getComentaris();
            })
    }
    // ! DELETE
    const deleteComentari = async () => {
        await axios.delete(REST_URL + "/destroy/" + comentariSeleccionat.ID_COMENTARI, config)
            .then(response => {
                setData();
                abrirCerrarModalEliminar();
                window.location.reload(false);
            })
    }
    // // Body Insertar
    // const bodyInsertar = (
    //     <div style={modalStyle}>
    //         <br />
    //         <h3 align="center">Afegir un nou idioma</h3>
    //         <br />
    //         <TextField name='DESCRIPCIO' style={inputMaterial} label="Nom Idioma" onChange={handleChange} />
    //         <div align="right">
    //             <Button variant="contained" color="primary" onClick={() => insertIdioma()}>Insertar</Button>
    //             <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
    //         </div>
    //     </div>
    // );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Editar comentari</h3>
            <br />
            <TextField name='DESCRIPCIO' style={inputMaterial} label="Corregeixi el comentari" onChange={handleChange} value={comentariSeleccionat && comentariSeleccionat.DESCRIPCIO} />
            <br />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateComentari()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estàs segur de que vols eliminar el comentari <b>{comentariSeleccionat && comentariSeleccionat.ID_COMENTARI}?</b> </h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteComentari()}>Sí</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )
    
    return (
        <div>
            <br />
            <h1>Crud Comentaris</h1>
            {/* <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button> */}
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
                        {data.map((comentari) => (
                            <TableRow key={comentari.ID_COMENTARI}>
                                {Object.entries(comentari).map(([key, value]) => (
                                    <TableCell
                                        key={`${comentari.ID_COMENTARI}_${key}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Edit style={cursorPointer} onClick={() => seleccionarComentari(comentari, 'Editar')} />
                                    &nbsp;&nbsp;
                                    <Delete style={cursorPointer} onClick={() => seleccionarComentari(comentari, 'Eliminar')} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal> */}
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

export default CrudComentaris;