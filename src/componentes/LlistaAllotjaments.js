import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

const AllotjamentsList = () => {
    const [allotjaments, setAllotjaments] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 5;
    const pagesVisited = pageNumber * itemsPerPage;
    const filterOptions = [
        { value: 'NOM_COMERCIAL', label: 'Nom Comercial' },
        { value: 'DESCRIPCIO', label: 'Descripció' },
        { value: 'LLITS', label: 'Llits' },
        { value: 'PERSONES', label: 'Persones' },
        { value: 'BANYS', label: 'Banys' },
        { value: 'ADREÇA', label: 'Adreça' },
        { value: 'VALORACIO_GLOBAL', label: 'Valoració Global' },
    ];

    const [searchText, setSearchText] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterChange = (selectedOption) => {
        setSelectedFilter(selectedOption);
    };
    const filteredAllotjaments = allotjaments.filter((allotjament) => {
        if (!selectedFilter) return true;

        const fieldValue = allotjament[selectedFilter.value];
        const searchValue = searchText.toLowerCase();

        if (fieldValue === null || fieldValue === undefined) {
            return false;
        } else if (typeof fieldValue === 'number') {
            const searchNumber = Number(searchValue);
            return !isNaN(searchNumber) && fieldValue === searchNumber;
        } else {
            return fieldValue.toLowerCase().includes(searchValue);
        }
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://www.etvtauladesfons.com/api/allotjaments');
                if (response.headers['content-type'].includes('application/json')) {
                    setAllotjaments(response.data.data);
                } else {
                    console.error('La respuesta no es un JSON válido');
                }
            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        };
        fetchData();
    }, []);

    const pageCount = Math.ceil(filteredAllotjaments.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Llistat d'allotjaments</h2>
            <div className="d-flex mb-3">
                <Select
                    className="mr-2"
                    options={filterOptions}
                    isClearable
                    isSearchable
                    placeholder="Filtrar por..."
                    onChange={handleFilterChange}
                    onMenuOpen={() => {}}
                />
            </div>
            <br/>
            <div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar"
                    value={searchText}
                    onChange={handleSearchInputChange}
                />
            </div>

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
                {filteredAllotjaments
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
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Següent"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                pageClassName={"page-link"}
            />
        </div>
    );
};

export default AllotjamentsList;

