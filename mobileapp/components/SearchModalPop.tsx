import React, { useState } from 'react';

import {Modal, Container, Form, FormGroup, FormLabel,  Button, FormControl} from 'react-bootstrap';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Appbar } from 'react-native-paper';


export default function SearchModalPop(props) {

    const [show, setShow] = useState(false);
    const [player, setPlayer] = useState("");
    const [playerList, setPlayerList] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleClose = () => setShow(false); 
    const handleShow = () => { setShow(true); }
  
    const setSearchPlayer = (player:string) => {
        setPlayer (player);
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        setShow(false);
        props.navigation.navigate('Trade');
    }

    const handleSearch = () =>
    {
/*
        var data = null;
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        };
    
       fetch("http://market.cricktrade.com/market/api/allplayers/" + player, requestOptions)
        .then(async response => {
            data = await response.json();
    
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                alert(error);
                setErrorMessage(error.toString());
                return Promise.reject(error);

            }

        })
        .catch(error => {
            setErrorMessage(error.toString());
            alert(error);
        });

        setPlayerList(data);      
  */
       setShow(true);
        
    }

    
    //            <Modal.Title><FontAwesomeIcon icon={faSearch} size='md' style={{ color: 'pink' }}/> Search</Modal.Title>

/*
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit}>

                <FormGroup controlId="search" bsSize="large">
                <FormLabel>Search</FormLabel>
                <FormControl
                    value={player}
                    onChange={e => setPlayer(e.target.value)}
                    placeholder="Search Player "
                />
                </FormGroup>
            </Form>
        </Container>


          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

*/


    return (
      <>
        <Appbar.Action icon="magnify" onPress={handleSearch} />
        <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}>


        </Modal>
          
   </>
    );
  }