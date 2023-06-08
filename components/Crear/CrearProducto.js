
import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,Card,Row,Button,Form,Col} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
export default function CrearProducto() {
    const [image, setimage] = useState(null)
    const  imagesmbt = (e) => {
      console.log(e.target.files)
      setimage(e.target.files[0])
    }
    const [cliente, setcliente] = useState([])
    const [submitted, setSubmitted] = useState(false);

    const fetchcliente = async (d) => {
      var result = [];
    const resp = await fetch(`${process.env.IP}:5000/api/v1/cliente`)
     const dtajson = await resp.json()
     const crdta = dtajson.data
      return setcliente(crdta);  
    }
    useEffect(() => {
     fetchcliente()
     if (submitted) {
      alert('Informacion Agregada');
      setSubmitted(false);
    }
    }, [submitted])
    
    const handleSubmit = async (e) => {
        // Stop the form from submitting and refreshing the page.
        e.preventDefault()
    
        // Get data from the form.
        const data = {
          nombre: e.target.producto.value,
          codigoBarras: e.target.codigoB.value,
          descripcion: e.target.desc.value,
          img:image
          
        }
        const formData = new FormData()
        formData.append('img', image)
        formData.append('nombre', data.nombre)
        formData.append('codigoBarras', data.codigoBarras)
        formData.append('descripcion', data.descripcion)
       
       const resp = await axios.post(`${process.env.IP}:5000/api/v1/productos/crear`,formData)
  
      
     var nombresClientes = [cliente.map(e => e.nombreCliente)]
     var ids = [cliente.map(e => e._id )]
     console.log(nombresClientes)
      for (let index = 0; index < nombresClientes[0].length; index++) {
        
        const dataC = {nombre:e.target.producto.value,precio:document.getElementById(nombresClientes[0][index]).value,codigoBarras:data.codigoBarras}
       const resp = await axios.put(`${process.env.IP}:5000/api/v1/productos/cliente/${ids[0][index]}`,dataC)
        
      }
     var fech = new Date()
     fech.toLocaleDateString('es-MX')
      console.log(`fecha ${fech}`)
      setSubmitted(true);

      }
      
  
  return (
    <>
   <Container>
     <Row>
     <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label className='text-dark'>Nombre</Form.Label>
        <Form.Control type="Text" placeholder="Nombre Producto"name='producto' />
        <Form.Text className="text-muted">
            Nombre Producto
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-dark'>Codigo de barras</Form.Label>
        <Form.Control type="Text" placeholder="Codigo de barra" name='codigoB'/>
  
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-dark' >Descripcion</Form.Label>
        <Form.Control type="Text" placeholder="Descripcion" name='desc'/>
        <Form.Text className="text-muted">
          Descripcion del producto (gramos, presentacion...)
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label className='text-dark'>Imagen</Form.Label>
          <Form.Control type="file" size="sm" name='img' onChange={imagesmbt}/>
        </Form.Group>
        
            <Row>
            <h2 className='text-dark'>Precio</h2>
        {cliente.map((c)=> {
            
          return(<>
          <Col>
          <Card >
      <Card.Body>
        <Card.Title className={'text-dark'}>{c.nombreCliente}</Card.Title>
       
        <Card.Text>
          <Form.Control id={c.nombreCliente} placeholder={'Precio Producto'}/>
        </Card.Text>
       
      </Card.Body>
    </Card>
    <br/>
    </Col>
   
          </>)
        })}
      
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
     </Row>
   </Container>
    </>
  )
  }
