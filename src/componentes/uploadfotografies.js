import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UploadFotos = () => {
    const [allotjaments, setAllotjaments] = useState([]);
    const [selectedAllotjament, setSelectedAllotjament] = useState(null);
    const [file, setFile] = useState(null);
    const [descripcio, setDescripcio] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const idUsuari = Cookies.get('ID_USUARI');
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchAllotjaments = async () => {
            if (!token) {
                console.error('No estás autorizado para ver esta información.');
                return;
            }

            const response = await axios.get('http://www.etvtauladesfons.com/api/allotjaments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === 'error') {
                console.error(response.data.message);
                return;
            }

            const userAllotjaments = response.data.data.filter(
                (allotjament) => allotjament.FK_ID_USUARI.toString() === idUsuari
            );

            setAllotjaments(userAllotjaments);
        };

        fetchAllotjaments();
    }, [idUsuari, token]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescripcioChange = (e) => {
        setDescripcio(e.target.value);
    };

    const handleAllotjamentChange = (e) => {
        setSelectedAllotjament(e.target.value);
        console.log('Alojamiento seleccionado:', e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAllotjament || !file || !descripcio) {
            setUploadStatus('Por favor, rellena todos los campos y selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('FOTO', file);
        formData.append('DESCRIPCIO', descripcio);
        formData.append('FK_ID_ALLOTJAMENT', selectedAllotjament);

        try {
            const response = await axios.post('http://www.etvtauladesfons.com/api/fotografies', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'error') {
                setUploadStatus(`Error: ${response.data.message}`);
                return;
            }
            setUploadStatus('Imagen subida correctamente.');
            setFile(null);
            setDescripcio('');
            setSelectedAllotjament(null);
        } catch (error) {
            console.error(error);
            setUploadStatus('Error al subir la imagen.');
        }
    };

    return (
        <div>
            <h2>Subir fotos de tus alojamientos</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="allotjament">Selecciona un alojamiento:</label>
                <select id="allotjament" value={selectedAllotjament} onChange={handleAllotjamentChange} required>
                    <option value="">Elige un alojamiento</option>
                    {allotjaments.length > 0 ? (
                        allotjaments.map((allotjament) => (
                            <option key={allotjament.ID_ALLOTJAMENT} value={allotjament.ID_ALLOTJAMENT}>
                                {allotjament.NOM}
                            </option>
                        ))
                    ) : (
                        <option value="">Cargando alojamientos...</option>
                    )}

                </select>
                <label htmlFor="file">Selecciona una imagen:</label>
                <input type="file" id="file" accept="image/*" onChange={handleFileChange} required />

                <label htmlFor="descripcio">Descripción de la imagen:</label>
                <textarea id="descripcio" value={descripcio} onChange={handleDescripcioChange} required />

                <button type="submit">Subir imagen</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadFotos;