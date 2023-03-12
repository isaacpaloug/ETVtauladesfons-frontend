import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Carrusel from './Carrusel';

const AllotjamentsList = () => {
    const [allotjaments, setAllotjaments] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const itemsPerPage = 5;
    const pagesVisited = pageNumber * itemsPerPage;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://www.etvtauladesfons.com/api/allotjaments');
            setAllotjaments(response.data.data);
        };
        fetchData();
    }, []);

    const pageCount = Math.ceil(allotjaments.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (

        <div className="container mt-5">
            <h2 className="mb-3">Llistat d'allotjaments</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom Comercial</th>
                        <th>Descripció</th>
                        <th>Llits</th>
                        <th>Persones</th>
                        <th>Banys</th>
                        <th>Adreça</th>
                        <th>Valoració Global</th>
                    </tr>
                </thead>
                <tbody>
                    {allotjaments
                        .slice(pagesVisited, pagesVisited + itemsPerPage)
                        .map((allotjament) => (
                            <tr key={allotjament.ID_ALLOTJAMENT}>
                                <td>{allotjament.NOM_COMERCIAL}</td>
                                <td>{allotjament.DESCRIPCIO}</td>
                                <td>{allotjament.LLITS}</td>
                                <td>{allotjament.PERSONES}</td>
                                <td>{allotjament.BANYS}</td>
                                <td>{allotjament.ADREÇA}</td>
                                <td>{allotjament.VALORACIO_GLOBAL}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ReactPaginate previousLabel={"Anterior"} nextLabel={"Següent"} pageCount={pageCount}
                onPageChange={changePage} containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"} nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}
                pageClassName={"page-link"}
            />
        </div>
    );
};

export default AllotjamentsList;