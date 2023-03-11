import React, { useState, useEffect } from "react";
import axios from "axios";
import {Button} from "react-bootstrap";


function Carrusel() {
    const [index, setIndex] = useState(0);
    const [imatges, setImatges] = useState([]);
    const length = imatges.length;

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
                setImatges(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const interval = setInterval(() => {
            handlePrevious();
        }, 2000);

        return () => clearInterval(interval);
    });

    return (

        <div className="carousel" style={{display: "flex", alignItems: "center", alignContent: "center"}}>
            <div>
                <Button variant="outline-secondary"
                        style={{position: "absolute", zIndex: "100", left: "20px", top: 100, fontSize: "100px"}}
                        onClick={handlePrevious}
                > {"•"}
                </Button>
                <Button variant="outline-secondary"
                        style={{position: "absolute", zIndex: "100", left: "456px", top: 100, fontSize: "100px"}}
                        onClick={handleNext}> {"•"}
                </Button>
                {imatges.length > 0 && (
                    <img style={{margin: "20px", height: "350px", width: "500px", maxWidth: "500px"}}
                        src={imatges[index].URL}
                        alt={imatges[index].DESCRIPCIO}
                    />
                )}
            </div>
        </div>

    );
}

export default Carrusel;