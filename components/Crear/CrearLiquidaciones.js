import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

export default function CrearLiquidacion({user}) {
    console.log(user)
    const [prdlen, setPrdlen] = useState(0)
    const [isLoading, setLoading] = useState(false)
    const [tienda, setTienda] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    const getTiendas = async  () => {
      const res = await fetch(`${process.env.IP}/api/v1/tienda`)
      const data = await res.json()
      
       const crdta =  data.data
        setLoading(false)
        return setTienda(crdta)
      
    }
    
    const [cliente, setcliente] = useState([])
    
    const getClientsres = async  ()=> {
     const res = await  fetch(`${process.env.IP}/api/v1/cliente`)
    const data = await res.json()
    setLoading(false)
      return setcliente(data.data)
      
  
    }
    useEffect(() => {
      getTiendas()
      getClientsres()
      if (submitted) {
        alert('Informacion Agregada');
        setSubmitted(false);
      }
    
      
    }, [submitted])
    
    const [nomtienda, setnomtienda] = useState(null)
    const handlename = (e) => {
      setnomtienda(e.target.value)
    }
    const [getnomcliente, setgetnomcliente] = useState(null)
    const [activeTienda, setactiveTienda] = useState(false)
    const handlecliente = (e) => {
      setgetnomcliente(e.target.value)
      setactiveTienda(true)
    }
    if (isLoading) return <p>Loading...</p>
      if (!tienda) return <p>No profile data</p>
        const Render =(p)=> {
          const [data, setData] = useState(null)
          const [isLoading, setLoading] = useState(false)
          
        
          useEffect(() => {
            setLoading(true)
            fetch(`${process.env.IP}/api/v1/productos`)
              .then((res) => res.json())
              .then((data) => {
                setData(data.data)
                setLoading(false)
              })
  
          }, [])
  
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
                              <Form.Label className=' text-dark'id= {`prodn${count}`}>{d.nombre}</Form.Label>
                            
  
                              <Form.Control type="Text" placeholder='Piezas entregadas' id={`entregada${count}`} />
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
        console.log(prdlen)
        let prod =[]
        // Get data from the form.
        for (let index = 1; index <= prdlen; index++) {
       
          var value = document.getElementById(`prodn${index}`).innerHTML
        
          
          
          
          prod.push({nombre:value, existencia:parseInt(document.getElementById(`entregada${index}`).value)})
          
        }
        console.log(prod.length)
        
        let existenciaF =  lodash.sumBy(prod, (o) => {
          return parseInt(o.existencia)
        })
        console.log(existenciaF)
        const data = {
            folioLiquidacion:document.getElementById('folioLiquidacion').value,
            numeroRemison:document.getElementById('remision').value,
            nombreTienda:document.getElementById('nombreTienda').value,
            vendedor:document.getElementById('vendedor').value,
            fechaLiquidacion:document.getElementById('fechaLiquidacion').value,
            montoFactura:document.getElementById('montoFacturado').value,
            TDA:document.getElementById('TDA').value,
            piezasEntregadas: existenciaF,
            producto:prod
            
        }
        console.log(data)
        const resp = await axios.post(`${process.env.IP}/api/v1/liquidacion/crear`,data)
        console.log(resp)
        setSubmitted(true);

      
  
      }
  
    return (
      <>
     <Container>
       <Row>
       <Form onSubmit={handleSubmit}>
       <Form.Group className="mb-3">
            <Form.Label  className='text-dark'>Folio Liquidación</Form.Label>
            <Form.Control type="text" placeholder="Folio Liquidacion" id='folioLiquidacion'/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label  className='text-dark'>Numero Remision</Form.Label>
            <Form.Control type="text" placeholder="Numero Remision" id='remision'/>
          </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Label  className='text-dark' >Nombre Vendedor</Form.Label>
        <Form.Control value={user} disabled id='vendedor'/>
      </Form.Group>
      <>
                <Form.Group className="mb-3" name='cliente' >
                    <Form.Label className='text-dark'>Nombre Cliente</Form.Label>
                    <Form.Select  id='cliente' onChange={handlecliente} >
                      <option> -</option>
                      {cliente.map((t) => {
                        return(<option key='-' name='canal'>{t.nombreCliente}</option>)
                      })}
                    </Form.Select>
                    <Form.Text className="text-muted">
                       Nombre Cliente
                    </Form.Text>
                    </Form.Group>
                    {activeTienda && (<>
                      <Form.Group className="mb-3" name='nombretienda' >
                    <Form.Label className='text-dark'>Nombre Tienda</Form.Label>
                    <Form.Select  id='nombreTienda' onChange={handlename} >
                    <option>-</option>
                      {tienda.map((t) => {
                        
                        if(getnomcliente === t.nombreCliente){
                          return(<option key={t.nombreTienda} >{t.nombreTienda}</option>)
                        }
                        
                      })}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Nombre Tienda
                    </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                          <Form.Label className='text-dark'>TDA</Form.Label>
                          <Form.Select   id='TDA'>
                          
                      {tienda.map((t) => {
                        if(t.nombreTienda === nomtienda){
                          return(<option key='-' id='TDA'>{t.TDA}</option>)
                        }
                        
                      })}
                    </Form.Select>
    
                        </Form.Group>
                    </>)}
                </>
        <Form.Group className="mb-3">
            <Form.Label  className='text-dark' >Fecha</Form.Label>
            <Form.Control type="date" placeholder="Fecha" id='fechaLiquidacion'/>
            <Form.Text className="text-muted">
                Fecha Liquidacion
              </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className='text-dark'>Monto Facturado</Form.Label>
            <Form.Control type="number" placeholder="Monto Facturado" id='montoFacturado'/>
          </Form.Group>
  
       
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
