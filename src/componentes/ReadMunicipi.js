import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, Col, Row } from "react-bootstrap";

import(useState);

function ReadMunicipis() {
  const [municipis, setMunicipis] = useState([]);

  //UTILITZANT FETCH.
  useEffect(() => {
    fetch(
        "http://www.etvtauladesfons.com/api/municipis"
    )
      .then((response) => {
        return response.json(response);
      })
      .then((jsonresposta) => {
        setMunicipis(jsonresposta.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <ListGroup>
      {municipis.map(function (element, index) {
        return (
          <>
            <ListGroup.Item variant="primary" key={index}>
              <Row>
                {" "}
                <Col>{element.id}</Col> <Col>{element.municipi}</Col>
              </Row>{" "}
            </ListGroup.Item>
          </>
        );
      })}
    </ListGroup>
  );
}

export default ReadMunicipis;