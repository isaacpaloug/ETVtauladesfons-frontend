import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Usuario from "./Usuario";

const Usuaris = () => {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const token = Cookies.get("token");

            if (!token) {
                console.error("No estás autorizado para ver esta información.");
                return;
            }

            const response = await axios.get("http://www.etvtauladesfons.com/api/usuaris", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === "error") {
                setError(response.data.message);
                setIsLoading(false);
                return;
            }

            const usuarioEncontrado = response.data.data.find((user) => user.TOKEN === token);
            if (usuarioEncontrado) {
                if (usuarioEncontrado.ADMINISTRADOR === 1) {
                    setUsuario(usuarioEncontrado);
                    setIsLoading(false);
                } else {
                    const responsePut = await axios.get(
                        `http://www.etvtauladesfons.com/api/usuaris/put/${usuarioEncontrado.ID_USUARI}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (responsePut.data.status === "error") {
                        setError(responsePut.data.message);
                    } else {
                        setUsuario(responsePut.data.data);
                    }
                    setIsLoading(false);
                }
            }
        };

        fetchUsuarios();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (isLoading) {
        return <div>Cargando información del usuario...</div>;
    }

    return (
        <div>
            <h2>Información del usuario:</h2>
            <Usuario usuario={usuario} />
        </div>
    );
};

export default Usuaris;
