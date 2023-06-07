import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

export default function CrearVisita({user}){
    const [prdlen, setPrdlen] = useState(0)
    const [diaP, setdiaP] = useState(0)
    const [diaE, setdiaE] = useState(0)
      const [submitted, setSubmitted] = useState(false);
      useEffect(() => {
    if (submitted) {
      alert('Informacion Agregada');
      setSubmitted(false);
    }
  }, [submitted]);
      const Rtienda = () => {
        const [isLoading, setLoading] = useState(false)
        const [tienda, setTienda] = useState(null)
        const [nomTienda, setnomTienda] = useState(null)
        fetch( `http://${process.env.IP}:5000/api/v1/tienda`)
        .then((res) => res.json())
        .then((data) => {
          setTienda(data.data)
          setLoading(false)
        })
        
        if (isLoading) return <p>Loading...</p>
          if (!tienda) return <p>No profile data</p>
          const onch = async (e) => {
             
              
              setdiaP(crdta.diaP)
              
  
          }
          const onchname = (e) => {
            var name = e.target.value
            setnomTienda(name)
          }
  
          return(
              <>
                  <Form.Group className="mb-3" name='nombretienda' >
                  <Form.Label className='text-dark'>Nombre Tienda</Form.Label>
                  <Form.Select  name='nombreTienda'onChange={onchname} >
                  <option key='-' >-</option>
                    {tienda.map((t) => {
                      
                      return(<>
                      
                      <option key='-' name='canal'>{t.nombreTienda}</option></>)
                    })}
                  </Form.Select>
                  <Form.Text className="font-weight-bold">
                      Nombre Tienda
                  </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" >
                        <Form.Label className='text-dark'>TDA</Form.Label>
                        <Form.Select name ='TDA' onChange={() => onch()}  >
                    {tienda.map((t) => {
                      if (t.nombreTienda === nomTienda){
                        return(<option key={t.TDA}  >{t.TDA}</option>)
                      }
                     
                    })}
                  </Form.Select>
                  <Form.Text className="font-weight-bold">
                      TDA
                  </Form.Text>
  
                      </Form.Group>
              </>
          )
      }
  const Render =(p)=> {
          const [data, setData] = useState(null)
          const [isLoading, setLoading] = useState(false)
          
        
          useEffect(() => {
            
            setLoading(true)
            fetch(`http://${process.env.IP}:5000/api/v1/productos`)
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
                              <Form.Label className='text-dark' id= {`prodn${count}`}>{d.nombre}</Form.Label>
                            
                              <Form.Control type="Text" placeholder='Pedido' id={`altaP${count}`} />
                              <Form.Control type="Text" placeholder='Bajas' id={`bajaP${count}`}/>
                              <Form.Control type="Text" placeholder='Existencia' id={`existenciaP${count}`} />
                        </Form.Group>
  
                         {count= count+1}
                         </>)
                         
                     })}
                  </div>
              </>
          )
      }
      const [image, setimage] = useState(null)
      const [imageA, setimageA] = useState(false)
      const  imagesmbt = (e) => {
        console.log(e.target.files)
        setimage(e.target.files[0])
        setimageA(true)
      }
      const handleSubmit = async (e) => {
        console.log(prdlen)
        let prod =[]
        var prodPicking = []
        // Stop the form from submitting and refreshing the page.
        e.preventDefault()
        
        for (let index = 1; index <= prdlen; index++) {
       
          var value = document.getElementById(`prodn${index}`).innerHTML
        
          
          
          prodPicking.push({nombre:value,cantidad:parseInt(document.getElementById(`altaP${index}`).value)})
  
          prod.push({nombre:value, bajas:parseInt(document.getElementById(`bajaP${index}`).value),alta:parseInt(document.getElementById(`altaP${index}`).value),existencia:parseInt(document.getElementById(`existenciaP${index}`).value)})
          
        }
  
        let bajaN
        let bajaF =  lodash.sumBy(prod, (o) => {
          return parseInt(o.bajas)
        })
        
        let altasF = lodash.sumBy(prod, (o) => {
          return parseInt(o.alta)
        })
        let existenciaF = lodash.sumBy(prod, (o) => {
          return parseInt(o.existencia)
        })
  
        
        // Get data from the form.
        const data = {
            nombreTienda:e.target.nombreTienda.value,
            TDA:e.target.TDA.value,
            promotor: e.target.nombreP.value,
            productos:prod,
            fecha:e.target.fecha.value,
            bajasG: bajaF,
            altasG: altasF,
            totalP: existenciaF,
            observaciones: e.target.observaciones.value,
            rotacion:e.target.rotacion.value
    
        }
        
        var tda = e.target.TDA.value
        const formData = new FormData()
        formData.append('img', image)
        formData.append('nombreTienda', data.nombreTienda)
        formData.append('TDA', data.TDA)
        formData.append('promotor', data.promotor)
        formData.append('productos', JSON.stringify(prod))
        formData.append('fecha', data.fecha)
        formData.append('bajasG', data.bajasG)
        formData.append('altasG', data.altasG)
        formData.append('totalP', data.totalP)
        formData.append('observaciones', data.observaciones)
        formData.append('rotacion', data.rotacion)
  
        
  
        const resptiend =  await fetch(`http://${process.env.IP}:5000/api/v1/tienda/${tda}`)
        const dtajson = await  resptiend.json()
        const crdta = dtajson.data
       
        console.log(formData)
        console.log(crdta[0].diaE)
        const dataPicking = {
          
          TDA:e.target.TDA.value,
          fecha: crdta[0].diaE,
          empleado:crdta[0].empleadoEntrega,
          productos:prodPicking,
          estatus:'pendiente',
          totalPedido:data.totalP,
          fechaPromotoria:data.fecha
  
        }
       
     console.log(dataPicking)
  
        const respPicking = await axios.post(`http://${process.env.IP}:5000/api/v1/almacen/pedido/crear`,dataPicking)
        const resp = await axios.post(`http://${process.env.IP}:5000/api/v1/promotor/crearV`,formData)
        console.log(respPicking)
        //Router.reload()
    
          setSubmitted(true);

    
      }
      const [canal, setcanal] = useState(false)
  const handlecanal = (e) => {
    setcanal(e.target.value)
  }  
    return (
      <>
    
  <Container>
  
        
  <h1 className='text-dark text-center'>Datos</h1>
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
    
    {canal && (<>
    
    
      <Row>
      <Col>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label className='text-dark'>Imagen</Form.Label>
          <Form.Control type="file" size="sm" name='img' onChange={imagesmbt}/>
        </Form.Group>
        {imageA && (<>
          <Rtienda/>
      
      <Form.Group className="mb-3" >
      <Form.Label className='text-dark' >Nombre Promotor</Form.Label>
      <Form.Control value={user}   name='nombreP'/>
      <Form.Text className="text-muted">
        
      </Form.Text>
    </Form.Group>
      
      <Form.Group className="mb-3">
          <Form.Label className='text-dark' >Fecha</Form.Label>
          <Form.Control type="date" placeholder="Fecha" name='fecha'/>
          <Form.Text className="text-muted">
            Fecha Visita
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Label className='text-dark'>Observaciones</Form.Label>
        <Form.Control type="Text" placeholder="Observaciones" name='observaciones'/>
        <Form.Text>Observaciones</Form.Text>

      </Form.Group>
      <Form.Group className="mb-3" >
                <Form.Label className='text-dark'>Rotacion</Form.Label>
                <Form.Select  name='rotacion' >
                  <option name='canal'>0%</option>
                  <option name='canal'>10%</option>
                  <option name='canal'>20%</option>
                  <option name='canal'>30%</option>
                  <option name='canal'>40%</option>
                  <option name='canal'>50%</option>
                  <option name='canal'>60%</option>
                  <option name='canal'>70%</option>
                  <option name='canal'>80%</option>
                  <option name='canal'>90%</option>
                  <option name='canal'>100%</option>
                </Form.Select>

                </Form.Group>
               
      <h2 className='text-dark text-center'>Productos</h2>
      <Render/>
      <Button variant="primary" type="submit">
        Submit
      </Button>
        </>)}
       
      </Form>
      
      </Col>
  
     
    </Row>
    </>)}
  
  </Container>
      
      </>
    )
  }