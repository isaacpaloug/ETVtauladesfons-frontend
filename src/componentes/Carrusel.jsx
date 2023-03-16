import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Carrusel() {
    const [imatges, setImatges] = useState([]);
    const [allotjamentsDestacats, setAllotjamentsDestacats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseAllotjaments = await axios.get('http://www.etvtauladesfons.com/api/allotjaments');
                const allotjamentsDestacats = responseAllotjaments.data.data.filter((allotjament) => allotjament.DESTACAT === 1);
                setAllotjamentsDestacats(allotjamentsDestacats);

                const responseFotografies = await axios.get('http://www.etvtauladesfons.com/api/fotografies');
                const fotografiesDestacades = responseFotografies.data.filter((foto) =>
                    allotjamentsDestacats.some((allotjament) => allotjament.ID_ALLOTJAMENT === foto.FK_ID_ALLOTJAMENT)
                );
                setImatges(fotografiesDestacades);
            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        };
        fetchData();
    }, []);

    const getNomAllotjament = (idAllotjament) => {
        const allotjament = allotjamentsDestacats.find((a) => a.ID_ALLOTJAMENT === idAllotjament);
        return allotjament ? allotjament.NOM_COMERCIAL : '';
    };

    return (
        <Carousel>
            {imatges.map((imatge) => (
                <Carousel.Item key={imatge.ID_FOTO}>
                    <Link to={`/allotjament/${imatge.FK_ID_ALLOTJAMENT}`}>
                        <img
                            className="d-block w-100"
                            src={imatge.URL}
                            alt={imatge.DESCRIPCIO}
                            style={{ maxHeight: '50vh', objectFit: 'contain' }}
                        />
                    </Link>
                    <Carousel.Caption>
                        <h3>{getNomAllotjament(imatge.FK_ID_ALLOTJAMENT)}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carrusel;
