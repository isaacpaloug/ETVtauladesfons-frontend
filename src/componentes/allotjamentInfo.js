import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AllotjamentInfo() {
    const [allotjament, setAllotjament] = useState(null);
    const [municipi, setMunicipi] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://www.etvtauladesfons.com/api/allotjaments/${id}`);
                setAllotjament(response.data.data);

                const responseMunicipi = await axios.get(`http://www.etvtauladesfons.com/api/municipis/${response.data.data.FK_ID_MUNICIPI}`);
                setMunicipi(responseMunicipi.data.data);

            } catch (error) {
                console.error('Error al obtener la información del alojamiento', error);
            }
        };
        fetchData();
    }, [id]);

    if (!allotjament || !municipi) {
        return <div>Cargando información del alojamiento...</div>;
    }

    return (
        <div>
            <h1>{allotjament.NOM_COMERCIAL}</h1>
            <p>Descripción: {allotjament.DESCRIPCIO}</p>
            <p>Llits: {allotjament.LLITS}</p>
            <p>Persones: {allotjament.PERSONES}</p>
            <p>Banys: {allotjament.BANYS}</p>
            <p>Adreça: {allotjament.ADREÇA}</p>
            <p>Valoración global: {allotjament.VALORACIO_GLOBAL}</p>
            <p>Municipi: {municipi.NOM_MUNICIPI}</p>
            {/* Agrega aquí más campos si es necesario */}
        </div>
    );
}

export default AllotjamentInfo;
