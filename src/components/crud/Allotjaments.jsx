// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField, TablePagination } from '@mui/material';
import { Modal } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
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


// ! FUNCIO CRUD
const CrudAllotjaments = () => {

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
    const [allotjamentSeleccionat, setAllotjamentSeleccionat] = useState({
        NOM_COMERCIAL: '',
        NUM_REGISTRE: '',
        DESCRIPCIO: '',
        LLITS: '',
        PERSONES: '',
        BANYS: '',
        ADREÇA: '',
        FK_ID_MUNICIPI: '',
        FK_ID_TIPUS: '',
        FK_ID_VACANCES: '',
        FK_ID_CATEGORIA: '',
        FK_ID_USUARI: ''
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

    // ! POST
    const insertAllotjament = async () => {
        await axios.post(REST_URL, allotjamentSeleccionat, config)
            .then(response => {
                setData(data.concat(response.data.data))
                abrirCerrarModalInsertar()
                window.location.reload(true);
            })
    }
    // ! PUT
    const updateAllotjament = async () => {
        await axios.put(REST_URL + '/put/' + allotjamentSeleccionat.ID_ALLOTJAMENT, allotjamentSeleccionat, config)
            .then(response => {
                abrirCerrarModalEditar();
                getAllotjaments();
            })
    }
    // ! DELETE
    const deleteAllotjament = async () => {
        await axios.delete(REST_URL + "/destroy/" + allotjamentSeleccionat.ID_ALLOTJAMENT, config)
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
            <h3 align="center">Afegir un nou allotjament</h3>
            <br />
            <TextField name='NOM_COMERCIAL' style={inputMaterial} label="Nom Comercial" onChange={handleChange} />
            <br />
            <TextField name='NUM_REGISTRE' style={inputMaterial} label="Num Registre" onChange={handleChange} />
            <br />
            <TextField name='DESCRIPCIO' style={inputMaterial} label="Descripcio" onChange={handleChange} />
            <br />
            <TextField name='LLITS' style={inputMaterial} label="Llits" onChange={handleChange} />
            <br />
            <TextField name='PERSONES' style={inputMaterial} label="Persones" onChange={handleChange} />
            <br />
            <TextField name='BANYS' style={inputMaterial} label="Banys" onChange={handleChange} />
            <br />
            <TextField name='ADREÇA' style={inputMaterial} label="Adreça" onChange={handleChange} />
            <br />
            <TextField name='FK_ID_MUNICIPI' style={inputMaterial} label="Fk_ID_Municipi" onChange={handleChange} />
            <br />
            <TextField name='FK_ID_TIPUS' style={inputMaterial} label="Fk_ID_Tipus" onChange={handleChange} />
            <br />
            <TextField name='FK_ID_VACANCES' style={inputMaterial} label="Fk_ID_Vacances" onChange={handleChange} />
            <br />
            <TextField name='FK_ID_CATEGORIA' style={inputMaterial} label="Fk_ID_Categoria" onChange={handleChange} />
            <br />
            <TextField name='FK_ID_USUARI' style={inputMaterial} label="Fk_ID_Usuari" onChange={handleChange} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => insertAllotjament()}>Insertar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Editar Allotjament</h3>
            <br />
            <TextField name='NOM_COMERCIAL' style={inputMaterial} label="Nom Comercial" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.NOM_COMERCIAL} />
            <br />
            <TextField name='NUM_REGISTRE' style={inputMaterial} label="Num Registre" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.NUM_REGISTRE} />
            <br />
            <TextField name='DESCRIPCIO' style={inputMaterial} label="Descripcio" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.DESCRIPCIO} />
            <br />
            <TextField name='LLITS' style={inputMaterial} label="Llits" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.LLITS} />
            <br />
            <TextField name='PERSONES' style={inputMaterial} label="Persones" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.PERSONES} />
            <br />
            <TextField name='BANYS' style={inputMaterial} label="Banys" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.BANYS} />
            <br />
            <TextField name='ADREÇA' style={inputMaterial} label="Adreça" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.ADREÇA} />
            <br />
            <TextField name='FK_ID_MUNICIPI' style={inputMaterial} label="Fk_ID_Municipi" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.FK_ID_MUNICIPI} />
            <br />
            <TextField name='FK_ID_TIPUS' style={inputMaterial} label="Fk_ID_Tipus" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.FK_ID_TIPUS} />
            <br />
            <TextField name='FK_ID_VACANCES' style={inputMaterial} label="Fk_ID_Vacances" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.FK_ID_VACANCES} />
            <br />
            <TextField name='FK_ID_CATEGORIA' style={inputMaterial} label="Fk_ID_Categoria" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.FK_ID_CATEGORIA} />
            <br />
            <TextField name='FK_ID_USUARI' style={inputMaterial} label="Fk_ID_Usuari" onChange={handleChange} value={allotjamentSeleccionat && allotjamentSeleccionat.FK_ID_USUARI} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateAllotjament()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estás segur de que vols eliminar l'allotjament <b>{allotjamentSeleccionat && allotjamentSeleccionat.NOM_COMERCIAL}</b> </h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteAllotjament()}>Sí</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedList = data.slice(startIndex, endIndex);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div>
            <br />
            <h1>Crud Alojamientos</h1>
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
                                    <Delete style={cursorPointer} onClick={() => seleccionarAllotjament(allotjament, 'Eliminar')} />
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

export default CrudAllotjaments;