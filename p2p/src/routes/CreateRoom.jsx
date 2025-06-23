import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v1 as uuid } from 'uuid';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
    const navigate = useNavigate();

    function create() {
        const id = uuid();
        navigate(`/room/${id}`);
    }

    return (
        <Container className='text-center'>
            <br/><br/>
            <h1>P2P File Transfer</h1>
            <br/><br/>
            <Button onClick={create} className='btn btn-danger'>Create Room</Button>
        </Container>
    );
}

export default CreateRoom;