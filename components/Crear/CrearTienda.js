import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

export default function CrearTienda({user}) {
    const [active2days, setactive2days] = useState(false)
   
    const [users, setusers] = useState([{role:'',nombre:''}])
    const [clientes, setclientes] = useState([{nombreCliente:'',canal:''}])
    const [canal, setcanal] = useState(null)
    const [activeclient, setactiveclient] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
      if (submitted) {
        alert('Informacion Agregada');
        setSubmitted(false);
      }
    }, [submitted]);
    const getuser = async () => {
        const res = await fetch(`${process.env.IP}:5000/api/v1/auth/users`)
        const dta = await res.json()
        const crdta = dta.data
       return setusers(crdta)
      }
    const getclients = async () => {
        const res = await fetch(`${process.env.IP}:5000/api/v1/cliente`)
        const dta = await res.json() 
        const crdta = dta.data
        console.log(crdta)
        return setclientes(crdta)
      }
    useEffect(() => {
        getclients()
       getuser()      
    }, [])
      const handlecanal= (e) => {      
        setactiveclient(true)
        setcanal(e.target.value)      
      }    
      const handle2dias = (e) => {
        setactive2days(true)
      }
      const componentsP = [];
      const componentsE = [];
      const RenderDays = (props) => {
        return(
          <>
          <Form.Group className="mb-3">
          <Form.Label className='text-dark' >  Dia {props.action} </Form.Label>
          <Form.Select id={`dia${props.numero}${props.action}`}>
            <option> Lunes </option>
            <option> Martes </option>
            <option> Miercoles </option>
            <option> Jueves </option>
            <option> Viernes </option>
            <option> Sabado </option>
            <option> Domingo </option>
          </Form.Select>
        </Form.Group>
        <line/>
          </>
        )
      }
      const [diasentregaP, setdiasentregaP] = useState(0)
      const handledaysP = (e) => {
        
        var days = diasentregaP
        console.log(days)
        for (let i = 0; i < days; i++) {
          componentsP.push(<RenderDays numero={i} action='Promotoria'  key={i} />);
        }
  
        return componentsP
      }
      const [diasentregaE, setdiasentregaE] = useState(0)
      const handledaysE = () => {
        var days = diasentregaE
        for (let i = 0; i < days; i++) {
          componentsE.push(<RenderDays numero={i} action='Entrega' key={i} />);
        }
        return componentsE
        
      }
      const ParentComponentE = () => {
        return(<>
        <h4 className='text-dark'> Dias Entregas</h4>
        {handledaysE()}
        </>)
      }
      const ParentComponentP= () => {
        return(<>
        <h4 className='text-dark'> Dias Promotoria</h4>
        {handledaysP()}
        </>)
      }
     
  
  
      const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
          canal: e.target.canal.value,
          nombreCliente: e.target.nombreCliente.value,
          TDA: e.target.tda.value,
          nombreTienda: e.target.nombreTienda.value,
         
          empleadoPromotoria: e.target.ePromotoria.value,
          empleadoEntrega: e.target.eEntrega.value,
          diaE:[],
          diaP:[]
        }
       
        var days  = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
       //  data.diaP = [{dia:days.indexOf(e.target.diaP.value)}]
       if(diasentregaE === 1) {
        const iddia = `dia0Entrega`
        console.log(iddia)
        console.log(document.getElementById(iddia).value)
        data.diaE.push({dia:days.indexOf(document.getElementById(iddia).value)})
       }else{
        for (let index = 0; index < diasentregaE; index++) {
          const iddia = `dia${index}Entrega`
          console.log(iddia)
          console.log(document.getElementById(iddia).value)
          data.diaE.push({dia:days.indexOf(document.getElementById(iddia).value)})
          
         }
       }
       if(diasentregaE === 1) {
        const iddia = `dia0Promotoria`
        console.log(iddia)
        console.log(document.getElementById(iddia).value)
        data.diaP.push({dia:days.indexOf(document.getElementById(iddia).value)})
       }else{
        for (let index = 0; index < diasentregaP; index++) {
          const iddia = `dia${index}Promotoria`
          console.log(iddia)
          console.log(document.getElementById(iddia).value)
          data.diaP.push({dia:days.indexOf(document.getElementById(iddia).value)})
          
         }  
       }
       
       
       console.log(data.diaE)
       const resp = await axios.post(`${process.env.IP}:5000/api/v1/tienda/crear`,data)
      alert('agregado')
  
      }
     
  return (
    <>
    <Container>
    <h2 className='text-dark text-center'>Datos</h2>
      <Row>
        <Col>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3"  >
        <Form.Label  className='text-dark'>Canal</Form.Label>
        <Form.Select name='canal' onChange={handlecanal}>
        <option>-</option>
        <option>Autoservicio</option>
        <option>HORECA</option>
          </Form.Select>
        <Form.Text className="text-muted">
            Canal de venta 
        </Form.Text>
      </Form.Group>
     {activeclient && (<>
      <Form.Group className="mb-3"  >
              <Form.Label  className='text-dark'>Nombre Cliente</Form.Label>
              <Form.Select name='nombreCliente'>
          {clientes.map(d=> {
            return(<>
            {canal === d.canal && (<>
              <option>-</option>
              <option>{d.nombreCliente}</option>
          </>)}
            </>)
          })}
          </Form.Select>
              </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label  className='text-dark'>TDA</Form.Label>
        <Form.Control type="Text" placeholder="Descripcion" name='tda'/>
        <Form.Text className="text-muted">
          TDA de la tienda
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label className='text-dark'>Nombre Tienda</Form.Label>
        <Form.Control type="Text" placeholder="Nombre" name='nombreTienda'/>
        <Form.Text className="text-muted">
          Nombre de la tienda
        </Form.Text>
      </Form.Group>
      <Form.Group>
        
        <Form.Label className='text-dark'>Dias De Promotoria</Form.Label>
          <Form.Control id='numberofdaysP'  onChange={() => setdiasentregaP(parseInt(document.getElementById('numberofdaysP').value))}/>
        </Form.Group>
      <Form.Group>
        
      <Form.Label className='text-dark'>Dias De Entrega</Form.Label>
        <Form.Control id='numberofdaysE' onChange={() => setdiasentregaE(parseInt(document.getElementById('numberofdaysE').value))}/>
      </Form.Group>
      <br/>
     {componentsP}
     <ParentComponentP/>
     <ParentComponentE/>
        <Form.Group className="mb-3"  >
              <Form.Label  className='text-dark'>Vendedor a cargo de Promotoria</Form.Label>
              <Form.Select name='ePromotoria'>
          {users.map(d=> {
            return(<>
            {d.role === 'vendedor' && (
              <>            
                  <option>{d.nombre}</option>              
              </>
            )}
            </>)
          })}
         
          </Form.Select>
              
              </Form.Group>
        
  
              <Form.Group className="mb-3"  >
              <Form.Label  className='text-dark'>Vendedor a cargo de Entrega</Form.Label>
              <Form.Select name='eEntrega'>
          {users.map(d=> {
            return(<>
            {d.role === 'vendedor' && (
              <>
              
                  <option>{d.nombre}</option>
                
              </>
            )}
            </>)
          })}
          </Form.Select>
              
              </Form.Group>
   
      <Button variant="primary" type="submit">
        Submit
      </Button>
     </>)}
    </Form>
        </Col>
      </Row>
    </Container>
    </>
  )
  }