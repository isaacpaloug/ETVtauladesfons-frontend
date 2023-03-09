import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

export default function CreateMunicipi() {
    const [nomMunicipi, setNomMunicipi] = useState('');
    const postData = () => {
        axios.post('http://www.etvtauladesfons.com/api/municipis', {
            nomMunicipi
        })
        console.log(nomMunicipi);
    }
return (
    <Form className='create-form'>
        <Form.Field>
            <label>Nom Munipici:</label>
            <input placeholder='Nom Municipi' onChange={(e) => setNomMunicipi(e.target.value)}/>
        </Form.Field>
        <Button onClick={postData} type='submit'>Crea</Button>
    </Form>
)
}