// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField, TablePagination } from '@mui/material';
import { Modal } from '@mui/material'
import { Edit } from '@mui/icons-material';
import Cookies from 'js-cookie';


//URL BASE
const REST_URL = 'http://www.etvtauladesfons.com/api/allotjaments';

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


// ! FUNCIO DESTACAR
const DestcAllotjaments = () => {

    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const token = Cookies.get('token');
    const adminCookie = Cookies.get('isAdmin');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const [allotjamentSeleccionat, setAllotjamentSeleccionat] = useState({
        NOM_COMERCIAL: '',
        NUM_REGISTRE: '',
        DESCRIPCIO: '',
        DESTACAT: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setAllotjamentSeleccionat(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getAllotjaments()
    }, [])

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const seleccionarAllotjament = (allotjament, caso) => {
        setAllotjamentSeleccionat(allotjament);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    // ! GET ALL
    const getAllotjaments = async () => {
        await axios.get(REST_URL)
            .then(response => {
                setData(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    // ! PUT
    const updateAllotjament = async () => {
        await axios.put(REST_URL + '/put/destacat/' + allotjamentSeleccionat.ID_ALLOTJAMENT, allotjamentSeleccionat, config)
            .then(response => {
                abrirCerrarModalEditar();
                getAllotjaments();
            })
    }

    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Destacar Allotjament</h3>
            <br />
            <TextField name='DESTACAT' style={inputMaterial} label="Destacat: 1 / No destacat: 0" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.DESTACAT} />
            <br />
           
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateAllotjament()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );

    return (
        <div>
            <br />
            <h1>Destacar Allotjaments</h1>
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
                        {data.map((allotjament) => (
                            <TableRow key={allotjament.ID_ALLOTJAMENT}>
                                {Object.entries(allotjament).map(([key, value]) => (
                                    <TableCell
                                        key={`${allotjament.ID_ALLOTJAMENT}_${key}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Edit style={cursorPointer} onClick={() => seleccionarAllotjament(allotjament, 'Editar')} />
                                    &nbsp;&nbsp;
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                    component="div"
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            {/* <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal> */}
            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>
        </div>
    )
}

export default DestcAllotjaments;