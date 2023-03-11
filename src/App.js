//importamos los comp creados
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import LoginForm from "./componentes/login";
import { Button } from "react-bootstrap";
import CrudAllotjaments from "./crud/CrudAllotjaments";
import Registro from "./componentes/registrarse";
import ReadMunicipis from "./componentes/ReadMunicipi";



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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/CRUDAllotjaments" element={<CrudAllotjaments />}></Route>
            <Route path="/registrarse" element={<Registro />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <div className="login">
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
      </div> */}
    </>
  );
}

export default App;
