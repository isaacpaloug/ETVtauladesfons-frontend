import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';


const AllotjamentsList = () => {
    const [allotjaments, setAllotjaments] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const allotjamentsPerPage = 5;
    const pagesVisited = pageNumber * allotjamentsPerPage;
    const cursorPointer = {
        cursor: 'pointer'
    };
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://www.etvtauladesfons.com/api/allotjaments'
            );
            const allotjamentsWithFoto = await Promise.all(result.data.data.map(async (allotjament) => {
                const fotoResult = await axios(
                    `http://www.etvtauladesfons.com/api/fotografies/allotjament/${allotjament.ID_ALLOTJAMENT}`
                );
                return {
                    ...allotjament,
                    foto: fotoResult.data.data[0]?.URL || 'https://via.placeholder.com/300', // Usamos una imagen de placeholder si no hay fotos
                }
            }));
            setAllotjaments(allotjamentsWithFoto);
        };
        fetchData();
    }, []);

    const displayAllotjaments = allotjaments
        .slice(pagesVisited, pagesVisited + allotjamentsPerPage)
        .map((allotjament) => {
            const navigateToAllotjament = (id_allotjament) => {
                window.location.href = `/allotjament/${id_allotjament}`;
            };
            return (
                <div className="container">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 300 }}
                            image={allotjament.foto}
                            title="green iguana"
                            style={cursorPointer}
                            onClick={() =>
                                navigateToAllotjament(allotjament.ID_ALLOTJAMENT)
                            }
                        />
                        <CardContent key={allotjament.ID_ALLOTJAMENT}>
                            <Typography gutterBottom variant="h5" component="div">
                                {allotjament.NOM_COMERCIAL}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <p>{allotjament.DESCRIPCIO}</p>
                                <p>Valoración global: {allotjament.VALORACIO_GLOBAL}</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            );
        });

    const pageCount = Math.ceil(allotjaments.length / allotjamentsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            {displayAllotjaments}
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
                breakClassName={'pagination__break'}
                breakLinkClassName={'pagination__break-link'}
            />
            <style jsx>{`
            .pagination {
              display: flex;
              justify-content: center;
              margin-top: 1rem;
              font-family: Arial, sans-serif;
            }
            .pagination__link {
              padding: 0.5rem;
              border-radius: 0.25rem;
              margin-right: 0.5rem;
              color: #0070f3;
              background-color: #fff;
              border: 1px solid #0070f3;
              cursor: pointer;
            }
            .pagination__link:hover {
              background-color: #0070f3;
              color: #fff;
            }
            .pagination__link--disabled {
              color: #ccc;
              border-color: #ccc;
              cursor: not-allowed;
            }
            .pagination__link--active {
              background-color: #0070f3;
              color: #fff;
              border-color: #0070f3;
            }
            .pagination__break {
              margin-right: 0.5rem;
            }
            .pagination__break-link {
              color: #0070f3;
              cursor: default;
            }
          `}</style>
        </div>
    );

};

export default AllotjamentsList;
