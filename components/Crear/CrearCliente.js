
import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
export default function CrearCliente({user})  {
  const [prdlen, setPrdlen] = useState(0)
  const Render =(p)=> {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
      setLoading(true)
      fetch(`${process.env.IP}:5000/api/v1/productos`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data)
          setLoading(false)
        })
        if (submitted) {
          alert('Informacion Agregada');
          setSubmitted(false);
        }
    }, [submitted])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    let count=1
    
    console.log(data)
    setPrdlen(data.length)
    return(
        <>
            <div>
               {data.map((d)=>{
                 
                   return(<>
                    <br/>
                   <Form.Group className="mb-3">
                        <Form.Label className='text-dark' id= {`prodn${count}`}>{d.nombre}</Form.Label>
                      

                        <Form.Control type="number" step={0.001} placeholder='Precio' id={`precio${count}`} />
                        <Form.Control type="Text" placeholder='Codigo de Barras' id={`codigobarras${count}`} />
                  </Form.Group>

                   {count= count+1}
                   </>)
                   
               })}
            </div>
        </>
    )
}
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refreshing the page.
    e.preventDefault()

    // Get data from the form.

    let prod =[]

      
      for (let index = 1; index <= prdlen; index++) {
     
        var value = document.getElementById(`prodn${index}`).innerHTML
        prod.push({nombre:value, precio:document.getElementById(`precio${index}`).value,codigoBarras:document.getElementById(`codigobarras${index}`).value})
        
      }
    const data = {
        canal:e.target.canal.value,
        clave:e.target.clave.value,
        nombreCliente:e.target.nombreCliente.value,
       razonSocial:e.target.razonSocial.value,
       productos:prod
    }
    console.log(data)
    const resp = await axios.post(`${process.env.IP}:5000/api/v1/cliente/crear`,data)
    alert('Cliente Agregado')

  }
return (
<>
<Container>
 <Row>
 <Form onSubmit={handleSubmit}>
   <h1 className='text-dark text-center'>Datos</h1>
   <Form.Group className="mb-3"  >
      <Form.Label  className='text-dark'>Canal</Form.Label>
      <Form.Select name='canal'>
          <option>Autoservicio</option>
          <option>HORECA</option>
        
        </Form.Select>
      <Form.Text className="text-muted">
          Canal de venta 
      </Form.Text>
    </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail" >
    <Form.Label  className='text-dark'>Clave</Form.Label>
    <Form.Control type="Text" placeholder=" Clave Cliente"name='clave' />
    <Form.Text className="text-muted">
        Clave Cliente
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label className='text-dark'>Nombre Cliente</Form.Label>
    <Form.Control type="Text" placeholder="Nombre Cliente" name='nombreCliente'/>

  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className='text-dark'>Razon Social</Form.Label>
    <Form.Control type="Text" placeholder="Razon Social" name='razonSocial'/>

  </Form.Group>
  <h2 className='text-dark text-center'>Productos</h2>
<Render/>
    
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
 </Row>
</Container>
</>
)
}