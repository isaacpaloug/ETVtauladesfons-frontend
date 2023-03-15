import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        alert('Gràcies per posar-te en contacte amb nosaltres. En breu ens posarem en contacte.');
        setName('');
        setEmail('');
        setMessage('');
        window.location.href = '/';
    }

    return (
        <div className='container'>
            <h1>Contacta amb Nosaltres</h1>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Escriu el teu nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Correu electrònic</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Escriu el teu correu electrònic"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label>Missatge</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Escriu el teu missatge"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                    Envia
                </Button>
            </Form>
        </div>
    );
}

export default ContactForm;
