import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import LocationCityIcon from '@mui/icons-material/LocationCity';

function AllotjamentInfo() {
    const [allotjament, setAllotjament] = useState([]);
    const [municipi, setMunicipi] = useState([]);
    const [tipusAllot, setTipusAllot] = useState([]);
    const [vacances, setVacances] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://www.etvtauladesfons.com/api/allotjaments/${id}`);
                setAllotjament(response.data.data);

                const responseMunicipi = await axios.get(`http://www.etvtauladesfons.com/api/municipis/${response.data.data.FK_ID_MUNICIPI}`);
                setMunicipi(responseMunicipi.data.data);

                const responseTipusAllot = await axios.get(`http://www.etvtauladesfons.com/api/tipus/${response.data.data.FK_ID_TIPUS}`);
                setTipusAllot(responseTipusAllot.data.data);
                const responseVacances = await axios.get(`http://www.etvtauladesfons.com/api/vacances/${response.data.data.FK_ID_VACANCES}`);
                setVacances(responseVacances.data.data);
                const responseCategoria = await axios.get(`http://www.etvtauladesfons.com/api/categories/${response.data.data.FK_ID_CATEGORIA}`);
                setCategoria(responseCategoria.data.data)

            } catch (error) {
                console.error('Error al obtener la información del alojamiento', error);
            }
        };
        fetchData();
    }, [id]);

    if (!allotjament || !municipi || !tipusAllot || !vacances || !categoria) {
        return <div>Cargando información del alojamiento...</div>;
    }

    return (
        <div>
            <h1>{allotjament.NOM_COMERCIAL}</h1>
            <h5>{allotjament.DESCRIPCIO}</h5>
            <p><HotelIcon/> Llits: {allotjament.LLITS}</p>
            <p><PersonIcon/>Persones: {allotjament.PERSONES}</p>
            <p><ShowerIcon/>Banys: {allotjament.BANYS}</p>
            <p><LocationOnIcon/>Adreça: {allotjament.ADREÇA}</p>
            <p><StarRateIcon/>Valoració: {allotjament.VALORACIO_GLOBAL}</p>
            <p><LocationCityIcon/>Municipi: {municipi.NOM_MUNICIPI}</p>
            <p>Tipus: {tipusAllot.NOM_TIPUS}</p>
            <p>Tipus de Vacances: {vacances.NOM_VACANCES}</p>
            <p>Categoria: {categoria.NOM_CATEGORIA}</p>
        </div>
    );
}

export default AllotjamentInfo;
