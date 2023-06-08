import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

export default function CrearUsuarioAd() {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (submitted) {
      alert('Form submitted!');
      setSubmitted(false);
    }
  }, [submitted]);
    const handleSubmit = async (e) => {
        // Stop the form from submitting and refreshing the page.
        e.preventDefault()
    
        // Get data from the form.
        const data = {
          nombre: e.target.nombre.value,
          clave: e.target.clave.value,
          telefono:e.target.telefono.value,
          numLicencia:e.target.numLicencia.value,
          role: e.target.role.value,
          password: e.target.password.value,
        }
        console.log(data)
        const resp = await axios.post(`${process.env.IP}:5000/api/v1/auth/register`,data)
        console.log(resp)
        setSubmitted(true);
        alert('agregado')
      }
  return (
    <>
   <Container>
     <Row>
     <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label  className='text-dark'>Nombre</Form.Label>
        <Form.Control type="Text" placeholder="Nombre"name='nombre' />
        <Form.Text className="text-muted">
            Nombre Completo 
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label  className='text-dark'>Clave</Form.Label>
        <Form.Control type="Text" placeholder="Clave" name='clave'/>
        <Form.Text className="text-muted">
            Clave Empleado
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label  className='text-dark'>Telefono</Form.Label>
        <Form.Control type="Text" placeholder="Telefono" name='telefono'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label  className='text-dark'>Numero de licencia</Form.Label>
        <Form.Control type="Text" placeholder="Licencia" name='numLicencia'/>
        <Form.Text className="text-muted">
            Solo para Promotores y Vendedores
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3"  >
        <Form.Label  className='text-dark'>Rol</Form.Label>
        <Form.Select name='role'>
            <option>vendedor</option>
            <option>distribuidor</option>
            <option>almacen</option>
          
          </Form.Select>
        <Form.Text className="text-muted">
            Rol
        </Form.Text>
      </Form.Group>
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label  className='text-dark'>Password </Form.Label>
        <Form.Control type='text' placeholder="Password" name='password'/>
        
      </Form.Group>
      <Button  variant="primary" type="submit">
        Submit
      </Button>
    </Form>
     </Row>
   </Container>
    </>
  )
  }
