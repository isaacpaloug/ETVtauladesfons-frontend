import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Comentaris = () => {
    const [comentario, setComentario] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [allotjament, setAllotjament] = useState(null);
    const id = Cookies.get("ID_USUARI");
    const token = Cookies.get("token");

    const fetchComentario = async () => {
        const response = await axios.get(`http://www.etvtauladesfons.com/api/comentaris/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setComentario(response.data.data);
    };

    const fetchUsuario = async (id) => {
        const response = await axios.get(`http://www.etvtauladesfons.com/api/usuaris/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUsuario(response.data.data);
    };

    const fetchAllotjament = async (id) => {
        const response = await axios.get(`http://www.etvtauladesfons.com/api/allotjaments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setAllotjament(response.data.data);
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchComentario();
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (comentario) {
            const fetchUserData = async () => {
                await fetchUsuario(comentario.FK_ID_USUARI);
            };
            const fetchAllotjamentData = async () => {
                await fetchAllotjament(comentario.FK_ID_ALLOTJAMENT);
            };
            fetchUserData();
            fetchAllotjamentData();
        }
    }, [comentario]);

    if (!comentario || !usuario || !allotjament) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>{usuario.NOM_COMPLET}:</h3>
            <p>{comentario.DESCRIPCIO}</p>
            <p>
                Fecha: {comentario.DATA} Hora: {comentario.HORA}
            </p>
            <p>Allotjament: {allotjament.NOM}</p>
        </div>
    );
};

export default Comentaris;