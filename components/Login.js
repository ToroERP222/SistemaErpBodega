
import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import {Container,Row,Col, Form,Button} from 'react-bootstrap'
import Navb from './Navb';

export default function Login() {
  const [loginError, setLoginError] = useState('');
  const [clave, setClave] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch(`${process.env.IP}:5000/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clave,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 2});
          Router.push('/');
          Router.reload();
        }
      });
  }
  return (
    <>
    
    <Container>
      <Row>
      <Col>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Clave Usuario</Form.Label>
    <Form.Control type="text" placeholder="Clave Usuario" name="clave"
        
        value={clave}
        onChange={(e) => setClave(e.target.value)}/>

  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Clave Usuario</Form.Label>
    <Form.Control type="text"  placeholder="Password" name="password"
        
        //value={password}
        onChange={(e) => setPassword(e.target.value)}/>

  </Form.Group>
     
      <Button type="submit" value="Submit">Ingresar</Button>
      {loginError && <p style={{color: 'red'}}>{loginError}</p>}
    </Form>
      </Col>
    </Row>
    </Container>
    </>
  );
}
