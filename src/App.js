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
import Benvinguda from "./componentes/Benvinguda";
import CrudVacances from "./components/crud/CrudVacances";
import CrudIdiomes from "./components/crud/CrudIdiomes";
import CrudTipusAllotjaments from "./components/crud/CrudTipusAllotjament";
import CrudServeis from "./components/crud/CrudServeis";
import CrudCategories from "./components/crud/CrudCategoria";
import CrudComentaris from "./components/crud/CrudComentaris";
import DestcAllotjaments from "./components/crud/DestacAllotjament";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/llista" element={<AllotjamentsList />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/registrarse" element={<Registro />}></Route>
            <Route path="/contacte" element={<ContactForm />}></Route>
            <Route path="/CRUDAllotjaments" element={<CrudAllotjaments />}></Route>
            <Route path="/CRUDVacances" element={<CrudVacances />}></Route>
            <Route path="/CRUDIdiomes" element={<CrudIdiomes />}></Route>
            <Route path="/CRUDTipus" element={<CrudTipusAllotjaments />}></Route>
            <Route path="/CRUDServeis" element={<CrudServeis />}></Route>
            <Route path="/CRUDCategories" element={<CrudCategories />}></Route>
            <Route path="/CRUDComentaris" element={<CrudComentaris />}></Route>
            <Route path="/DSTCAllotjaments" element={<DestcAllotjaments />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
     

    </>
  );
}

export default App;
