import Carrusel from "./componentes/Carrusel";

import './App.css';
import ReadMunicipis from "./componentes/ReadMunicipi";

import {Button} from "react-bootstrap";
import LoginForm from "./componentes/login";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import CreateMunicipi from "./componentes/createmunicipi";
import EditMunicipiModal from "./componentes/UpdateMunicipi";
import Registro from "./componentes/registrarse";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Comprobamos si hay un token almacenado en la cookie
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Borramos la cookie y actualizamos el estado de isLoggedIn
    Cookies.remove("token");
    setIsLoggedIn(false);
  };
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleMostrarRegistro = () => {
    setMostrarRegistro(true);
  };
  const [showLoginForm, setShowLoginForm] = useState(false);
  return (
    <>
      <div className="login">
        {!isLoggedIn ? (
            <div>
              {showLoginForm ? (
                  <LoginForm setIsLoggedIn={setIsLoggedIn} />
              ) : (
                  <Button onClick={() => setShowLoginForm(true)}>Login</Button>
              )}
            </div>
        ) : (
            <div>
              <h1>You are logged in</h1>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
        )}
        <button onClick={handleMostrarRegistro}>Registrarse</button>
        {mostrarRegistro && <Registro />}
      </div>

    <div>

      <h1>Benvinguts a ETV Tauladesfons!</h1>
      <h2>Allotjaments destacats</h2>
    </div>
    <Carrusel />
    <div className="main">
      <h2 className="main-header">React Crud Operations</h2>

        <br/>
        <br/>

      <CreateMunicipi />
        <br/>

        <ReadMunicipis />




    </div>
    </>
  );
}

export default App;
