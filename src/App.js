//importamos los comp creados
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./componentes/Menu";
import Registro from "./componentes/registrarse";
import ContactForm from "./componentes/formulario";
import CrudAllotjaments from "./components/crud/Allotjaments";
import AllotjamentsList from "./componentes/LlistaAllotjaments";
import CrudVacances from "./components/crud/CrudVacances";
import CrudIdiomes from "./components/crud/CrudIdiomes";
import CrudTipusAllotjaments from "./components/crud/CrudTipusAllotjament";
import CrudServeis from "./components/crud/CrudServeis";
import CrudCategories from "./components/crud/CrudCategoria";
import CrudComentaris from "./components/crud/CrudComentaris";
import CrudUsuaris from "./components/crud/CrudUsuaris";
import ProtectedRoutesAdmin from './components/protect/ProtectedRoutesAdmin';
import Inici from "./componentes/Inici";
import AdminSelect from "./components/protect/AdminRoutes";
import AllotjamentInfo from "./componentes/allotjamentInfo";
import NoAdminRoutes from "./components/protect/NoAdminRoutes";
import DestcAllotjaments from "./components/crud/DestacAllotjament";
import EditUsuario from "./components/usuaris/EditUsuario";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/*" element={<Inici />} />
          <Route index element={<Inici />} />
          <Route path="/allotjaments" element={<AllotjamentsList />} />
          <Route path="/registre" element={<Registro />} />
          <Route path="/contacte" element={<ContactForm />} />
          <Route path="/allotjament/:id" element={<AllotjamentInfo />} />
          <Route element={<NoAdminRoutes />} >
            <Route path="/usuari" element={<EditUsuario />} />
          </Route>
          <Route element={<ProtectedRoutesAdmin />} >
            <Route element={<AdminSelect />} path="/adminMenu" />
            <Route element={<CrudAllotjaments />} path="/crudallotjaments" />
            <Route element={<CrudCategories />} path="/crudcategories" />
            <Route element={<CrudUsuaris />} path="/crudusuaris" />
            <Route element={<CrudIdiomes />} path="/crudidiomes" />
            <Route element={<CrudServeis />} path="/crudserveis" />
            <Route element={<CrudTipusAllotjaments />} path="/crudtipusallot" />
            <Route element={<CrudVacances />} path="/crudvacances" />
            <Route element={<CrudComentaris />} path="/crudcomentaris" />
            <Route element={<DestcAllotjaments />} path="/destcallotjaments" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
