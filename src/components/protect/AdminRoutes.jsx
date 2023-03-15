import {useNavigate} from "react-router-dom";
import {Button, Container, Row, Col} from "react-bootstrap";

function AdminSelect(){
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    }

    const buttonData = [
        {text: "Allotjaments", path: "/crudallotjaments"},
        {text: "Allot-Serveis", path: "/crudalojservicios"},
        {text: "Categories", path: "/crudcategories"},
        // {text: "Fotos", path: "/crudfotos"},
        {text: "Idiomes", path: "/crudidiomes"},
        {text: "Reserves", path: "/crudreserves"},
        {text: "Serveis", path: "/crudserveis"},
        {text: "Tipus Allot.", path: "/crudtipusallot"},
        {text: "Vacances", path: "/crudvacances"},
        {text: "Usuaris", path: "/crudusuaris"},
        {text: "Valoracions", path: "/crudvaloracions"},
        {text: "Comentaris", path: "/crudcomentaris"},
    ];

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-5">Eines de l'administrador</h1>
            <Row>
                {buttonData.map((button, index) => (
                    <Col sm={6} md={4} lg={3} key={index} className="mb-3">
                        <Button variant="success" block onClick={() => navigateTo(button.path)}>
                            {button.text}
                        </Button>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default AdminSelect;
