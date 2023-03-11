//importamos los comp creados
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import LoginForm from "./componentes/login";
import { Button } from "react-bootstrap";
import Registro from "./componentes/registrarse";
import ReadMunicipis from "./componentes/ReadMunicipi";
import ContactForm from "./componentes/formulario";
import CrudAllotjaments from "./components/crud/Allotjaments";
import Carrusel from "./componentes/Carrusel";
import AllotjamentsList from "./componentes/LlistaAllotjaments";



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
            <Route path="/contacte" element={<ContactForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <div>
<h1 style={{margin: "20px"}}>Benvinguts a ETV Tauladesfons!</h1>
<h2 style={{margin: "20px"}}>Alguns dels nostres allotjaments</h2>
<br></br>
</div>
<Carrusel />
<AllotjamentsList />
    </>
  );
}

export default App;
