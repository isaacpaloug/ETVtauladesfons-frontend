// IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField} from '@mui/material';
import { Modal } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import Cookies from 'js-cookie';


//URL BASE
const REST_URL = 'http://www.etvtauladesfons.com/api/categories';

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
const CrudCategories = () => {

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
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({
        NOM_CATEGORIA: '',
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setCategoriaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        getCategoria()
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

    const seleccionarCategoria = (categoria, caso) => {
        setCategoriaSeleccionada(categoria);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    // ! GET ALL
    const getCategoria = async () => {
        await axios.get(REST_URL)
            .then(response => {
                setData(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    // ! POST
    const insertCategoria = async () => {
        await axios.post(REST_URL, categoriaSeleccionada, config)
            .then(response => {
                setData(data.concat(response.data.data))
                abrirCerrarModalInsertar()
                window.location.reload(true);
            })
    }
    // ! PUT
    const updateCategoria = async () => {
        await axios.put(REST_URL + '/put/' + categoriaSeleccionada.ID_CATEGORIA, categoriaSeleccionada, config)
            .then(response => {
                abrirCerrarModalEditar();
                getCategoria();
            })
    }
    // ! DELETE
    const deleteCategoria = async () => {
        await axios.delete(REST_URL + "/destroy/" + categoriaSeleccionada.ID_CATEGORIA, config)
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
            <h3 align="center">Afegir una nova categoria</h3>
            <br />
            <TextField name='NOM_CATEGORIA' style={inputMaterial} label="Nom Categoria" onChange={handleChange} />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => insertCategoria()}>Insertar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    );
    // Body Editar
    const bodyEditar = (
        <div style={modalStyle}>
            <br />
            <h3 align="center">Editar categoria</h3>
            <br />
            <TextField name='NOM_CATEGORIA' style={inputMaterial} label="Nom Categoria" onChange={handleChange} value={categoriaSeleccionada && categoriaSeleccionada.NOM_CATEGORIA} />
            <br />
            <div align="right">
                <Button variant="contained" color="primary" onClick={() => updateCategoria()}>Actualitzar</Button>
                <Button variant="contained" color="secondary" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );
    const bodyEliminar = (
        <div style={modalStyle}>
            <br />
            <h4 align="center">Estàs segur de que vols eliminar la categoria <b>{categoriaSeleccionada && categoriaSeleccionada.NOM_CATEGORIA}</b> ?</h4>
            <div align="right" style={inputMaterial}>
                <Button color="primary" onClick={() => deleteCategoria()}>Sí</Button>
                <Button color="secondary" onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>

        </div>
    )
    
    return (
        <div>
            <br />
            <h1>Crud Categories</h1>
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
                        {data.map((categoria) => (
                            <TableRow key={categoria.ID_CATEGORIA}>
                                {Object.entries(categoria).map(([key, value]) => (
                                    <TableCell
                                        key={`${categoria.ID_CATEGORIA}_${key}`}
                                    >
                                        {value}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Edit style={cursorPointer} onClick={() => seleccionarCategoria(categoria, 'Editar')} />
                                    &nbsp;&nbsp;
                                    <Delete style={cursorPointer} onClick={() => seleccionarCategoria(categoria, 'Eliminar')} />
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

export default CrudCategories;