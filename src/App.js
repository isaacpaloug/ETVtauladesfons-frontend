import Carrusel from "./componentes/Carrusel";
import CreateMunicipi from "./componentes/CreateMunicipi";
import './App.css';
import ReadMunicipis from "./componentes/ReadMunicipi";
import { BrowserRouter as Router, Route } from 'react-router-dom';



function App() {
  return (
    <>
    <div>
      <h1>Benvinguts a ETV Tauladesfons!</h1>
      <h2>Allotjaments destacats</h2>
    </div>
    <Carrusel />
    <div className="main">
      <h2 className="main-header">React Crud Operations</h2>
      <Router>
      <div>
        <CreateMunicipi />
        <ReadMunicipis />
      </div>
      </Router>
    </div>
    </>
  );
}

export default App;
