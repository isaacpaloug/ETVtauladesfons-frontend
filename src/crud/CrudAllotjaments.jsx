import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';
const CrudAllotjaments = () => {
    const url = "http://www.etvtauladesfons.com/api/allotjaments";
    const [allotjaments, setAllotjaments] = useState([]);
    const [operation, setOperation] = useState(0);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetch("http://www.etvtauladesfons.com/api/allotjaments")
            .then((response) => response.json())
            .then((jsonresposta) => setAllotjaments(jsonresposta.data))
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <div className='App'>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-4">
                        <div className="d-grid mx-auto">
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target="#modalAllotjaments">
                                <i className="fa-solid fa-circle-plus"></i>Afegir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-12">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom Comercial</th>
                                        <th>Num Registre</th>
                                        <th>Descripció</th>
                                        <th>Llits</th>
                                        <th>Persones</th>
                                        <th>Banys</th>
                                        <th>Adreça</th>
                                        <th>Destacat</th>
                                        <th>Valoració Global</th>
                                        <th>ID Municipi</th>
                                        <th>ID Tipus</th>
                                        <th>ID Vacances</th>
                                        <th>ID Categoria</th>
                                        <th>ID Usuari</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {allotjaments.map((allotjament) => (
                                        <tr key={allotjament.ID_ALLOTJAMENT}>
                                            <td>{allotjament.ID_ALLOTJAMENT}</td>
                                            <td>{allotjament.NOM_COMERCIAL}</td>
                                            <td>{allotjament.NUM_REGISTRE}</td>
                                            <td>{allotjament.DESCRIPCIO}</td>
                                            <td>{allotjament.LLITS}</td>
                                            <td>{allotjament.PERSONES}</td>
                                            <td>{allotjament.BANYS}</td>
                                            <td>{allotjament.ADREÇA}</td>
                                            <td>{allotjament.DESTACAT}</td>
                                            <td>{allotjament.VALORACIO_GLOBAL}</td>
                                            <td>{allotjament.FK_ID_MUNICIPI}</td>
                                            <td>{allotjament.FK_ID_TIPUS}</td>
                                            <td>{allotjament.FK_ID_VACANCES}</td>
                                            <td>{allotjament.FK_ID_CATEGORIA}</td>
                                            <td>{allotjament.FK_ID_USUARI}</td>
                                            <td>
                                                <button className='btn btn-warning'><i className="fa-solid fa-edit"></i></button>&nbsp;
                                                <button className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='close'></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id'/>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id='nom' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrudAllotjaments;