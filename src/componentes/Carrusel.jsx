import React, { useState, useEffect } from "react";
import axios from "axios";
import {Button} from "react-bootstrap";


function Carrusel() {
    const [index, setIndex] = useState(0);
    const [fotos, setFotos] = useState([]);
    const length = fotos.length;

    const handlePrevious = () => {
        const newIndex = index - 1;
        setIndex(newIndex < 0 ? length - 1 : newIndex);
    };

    const handleNext = () => {
        const newIndex = index + 1;
        setIndex(newIndex >= length ? 0 : newIndex);
    };

    useEffect(() => {
        axios
            .get("http://www.etvtauladesfons.com/api/fotografies")
            .then((response) => {
                setFotos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const interval = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="carousel"
            style={{
                boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.12), 0 2px 5px 0 rgba(0, 0, 0, 0.12)",
            }}
        >
            <div>
                <Button
                    style={{
                        background: "none",
                        border: "none",
                        fontWeight: "bold",
                        zIndex: "100",
                        position: "absolute",
                        left: 0,
                        top: 180,
                        fontSize: "80px",
                        opacity: "0.7",
                    }}
                    onClick={handlePrevious}
                >
                    {"<"}
                </Button>
                <Button
                    style={{
                        background: "none",
                        border: "none",
                        fontWeight: "bold",
                        zIndex: "100",
                        position: "absolute",
                        right: 0,
                        top: 180,
                        fontSize: "80px",
                        opacity: "0.7",
                    }}
                    onClick={handleNext}
                >
                    {">"}
                </Button>
                {fotos.length > 0 && (
                    <img
                        style={{
                            height: "500px",
                            width: "100%",
                            maxWidth: "100%",
                        }}
                        src={fotos[index].URL}
                        alt={fotos[index].DESCRIPCIO}
                    />
                )}
            </div>
        </div>
    );
}

export default Carrusel;