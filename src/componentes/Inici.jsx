import Carrusel from "./Carrusel";

function Inici(){
    const mystyle = {
        alignItems: 'center',
        textAlign:'center',
        justifyContent: 'center'
    };

    return(
        <>
        <div>
            <br/>
            <h1 style={mystyle}>HOSPEDATJE TAULA DES FONS</h1>
            <br/>
            <Carrusel />
            <br/>
        </div>
        </>
    )
}
export default Inici