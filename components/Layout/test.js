import React,{useState,useEffect} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
//funciones datos maestros
const ProductosUser = (user) => {
  const [pta, setpta] = useState([])
  const fetchptda = async (d) => {
      var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/productos`)
     const dtajson = await resp.json()
     const crdta = dtajson.data
      return setpta(crdta);  
    }
    
    const handlesbmt = async (e) => {
      e.preventDefault()  
      fetchptda()
    }
    return(<>
    <Form onSubmit={handlesbmt} >
    <div><Table striped bordered hover responsive><thead>
      <tr>  
        <th>Nombre Producto</th>
        <th>Codigo de Barras</th>
        <th>Descripcion</th>
 
      </tr>
    </thead>
    <tbody>
      {pta.map(d => {
          return(
          <tr key='1'>
            <td key={d.nombre}>{d.nombre}</td>
            <td key={d.codigoBarras}>{d.codigoBarras}</td>
            <td key={d.descripcion}>{d.descripcion}</td>
          </tr>
      )
    })}
      </tbody>
      </Table>
      </div>
      <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar
    </Button></div>
     </Form>
    </>)
}
const ClienteAdmin = (user) => {
  const [cli, setcli] = useState([])
  const fetchptda = async (d) => {
      var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/cliente`)
     const dtajson = await resp.json()
     const crdta = dtajson.data
     console.log()
      return setcli(crdta);  
    }
    
    const handlesbmt = async (e) => {
      e.preventDefault()  
      fetchptda()
    }
    return(<>
    <Form onSubmit={handlesbmt} >
    <div><Table striped bordered hover><thead>
      <tr>  
        <th>Numero</th>
        <th>Clave</th>
        <th>Nombre Cliente</th>
        <th>Razon Social</th>

      </tr>
    </thead>
    <tbody>
      {cli.map(d => {
          return(
          <tr key='1'>
            <td key={d.nombre}>{d.numero}</td>
            <td key={d.clave}>{d.clave}</td>
            <td key={d.nombreCliente}>{d.nombreCliente}</td>
            <td key={d.razonSocial}>{d.razonSocial}</td>
          </tr>
      )
    })}
      </tbody>
      </Table>
      </div>
      <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar
    </Button></div>
     </Form>
    </>)
}
const TiendaUser = (user) => {
  const [tda, setda] = useState([])
  const fetchptda = async (d) => {
      var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/tienda`)
     const dtajson = await resp.json()
     const crdta = dtajson.data
      return setda(crdta);  
    }
    
    const handlesbmt = async (e) => {
      e.preventDefault()  
      fetchptda()
    }
    return(<>
    <Form onSubmit={handlesbmt} >
    <div><Table striped bordered hover responsive><thead>
      <tr>  
        <th>Nombre Tienda</th>
        <th>Clave Cliente</th>
        <th>TDA</th>

        <th>Facturable</th>
        <th>Nivel Socioeconomico</th>
        <th>Region</th> 
       
        <th>Horario</th>
        <th>Dia Entrega</th>
        <th>Dia Promotoria</th>
        <th>Calle</th>
        <th>Numero</th>
        <th>Numero</th>
        <th>Colonia</th>
        <th>Telefono</th>
        <th>Contacto</th>

      </tr>
    </thead>
    <tbody>
      {tda.map(d => {
          return(
          <tr key ='1'>
            <td key={d.nombreTienda}>{d.nombreTienda}</td>
            <td key={d.claveCliente}>{d.claveCliente}</td>
            <td key={d.TDA}>{d.TDA}</td>
            <td key={d.facturable}>{d.facturable}</td>
            <td key={d.nivelSocioeconomico}>{d.nivelSocioeconomico}</td>
            <td key={d.region}>{d.region}</td>

 
            <td key={d.calle}>{d.calle}</td>
            <td key={d.numeroC}>{d.numeroC}</td>
            <td key={d.colonia}>{d.colonia}</td>
            <td key={d.telefono}>{d.telefono}</td>
            <td key={d.contacto}>{d.contacto}</td>
          </tr>
      )
    })}
      </tbody>
      </Table>
      </div>
      <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar
    </Button></div>
     </Form>
    </>)
}
//promotoria
const CrearVisita = ({user}) => {
  const [prdlen, setPrdlen] = useState(0)
  const [diaP, setdiaP] = useState(0)
  const [diaE, setdiaE] = useState(0)
  
    const Rtienda = () => {
      const [isLoading, setLoading] = useState(false)
      const [tienda, setTienda] = useState(null)
      const [nomTienda, setnomTienda] = useState(null)
      fetch( `${process.env.IP}/api/v1/tienda`)
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
                      <Form.Select name ='TDA' onChange={() => onch()} disabled  >
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
      const resptiend =  await fetch(`${process.env.IP}/api/v1/tienda/${tda}`)
      const dtajson = await  resptiend.json()
      const crdta = dtajson.data
     
      console.log(data)
      console.log(crdta[0].diaE)
      const dataPicking = {
        tienda:e.target.nombreTienda.value,
        TDA:e.target.TDA.value,
        fecha: crdta[0].diaE,
        empleadoEntrega:crdta[0].empleadoEntrega,
        productos:prodPicking,
        estatus:'pendiente'

      }
     
   console.log(dataPicking)

      const respPicking = await axios.post(`${process.env.IP}/api/v1/picking/crear`,dataPicking)
      const resp = await axios.post(`${process.env.IP}/api/v1/promotor/crearV`,data)
      
      
  
    
  
    }
    
  return (
    <>
    
<Container>
  <Row>
    <Col>
    <Form onSubmit={handleSubmit}>
    <h1 className='text-dark text-center'>Datos</h1>
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
    </Form>
    
    </Col>

   
  </Row>

</Container>
    
    </>
  )
}
const VerVisitaAdmin = ({user}) => {
  const initialState = {
  productos:[{}]
  }
  const [dta, setdta] = useState([initialState])
  const [pta, setpta] = useState([])

  const fetchdta = async (d) => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/promotor/visita/${d}`)
    const dtajson = await resp.json()
    const crdta = dtajson.data
     return setdta(crdta);  
      
  }
  const fetchptda = async (d) => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/productos`)
    const dtajson = await resp.json()
    const crdta = dtajson.data
    return setpta(crdta); 
  }
  const handlesbmt = async (e) => {
    e.preventDefault()  
    var fechaRemision=  document.getElementById(`fechaRemision`).value
    fetchdta(fechaRemision)
    fetchptda()
  }
  const updVisita = async (e) => {
   let est =  document.getElementById(`estatus`).value
   const data = {
    estatus:est

}
   const resp = await axios.put(`${process.env.IP}/api/v1/promotor/update/${e}`,data)





  }
  return(<>
  <Form onSubmit={handlesbmt} >
  <Form.Group className="mb-3">
     <Form.Label >Fecha</Form.Label>
     <Form.Control type="date" placeholder="Fecha" id='fechaRemision'/>
     <Form.Text className="text-muted">
         Fecha Liquidacion
       </Form.Text>
   </Form.Group>
  
 <div><Table striped bordered hover responsive><thead>
    <tr>
      <th>Folio</th>
      <th> Nombre Tienda</th>
      <th>TDA</th>
      <th>Vendedor</th>
      <th>Fecha </th>
      <th>Existencia</th>
      <th>Altas </th>
      <th>Bajas </th>
      

      
      
      {pta.map(p => {
          return(<><th className= 'bg-info' >Existencia {p.nombre}</th>
           <th className= 'bg-danger' key='-'>Bajas {p.nombre}</th> 
           <th className= 'bg-success ' key='-'>Altas {p.nombre}</th></>)})}
           <th>Rotacion </th>
           <th>Estatus </th>

    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        return(
      
      
        <tr key='-'>
          <td key='-' name='folio'>{d.folio}</td>
          <td key='-' name='nombreTienda'>{d.nombreTienda}</td>
          <td key='-' name='TDA'>{d.TDA}</td>
          <td key='-' name='promotor'>{d.promotor}</td>
          <td key='-' name='fecha'>{d.fecha}</td>
          <td key='-' name='totalP'>{d.totalP}</td>
          <td key='-' name='altasG'>{d.altasG}</td>
          <td key='-' name='bajasG'>{d.bajasG}</td>         
          {d.productos.map(p => {
              return(<>
                <td key='-' name='existencia'>{p.existencia}</td>
                <th key='-' name='bajas'>{p.bajas}</th>
                <th key='-' name='alta'>{p.alta}</th>
                </>)
            })}
            <td>{d.rotacion}</td>
        <td>
        
          <Form >
            {d.estatus ==='liberado' && (<Form.Group className="mb-3">       
        <Form.Control disabled value={d.estatus} id='estatus' >
         
        </Form.Control>
        </Form.Group>)}
        {!d.estatus || d.estatus === 'pendiente' && (<Form.Group className="mb-3">       
        <Form.Select id='estatus' onChange={() => updVisita(d._id)}>
          <option key='-'>pendiente</option>
          <option key='-'>liberado</option>
        </Form.Select>
        </Form.Group>)}
        </Form>
        </td>
        </tr> 
    )
  })}
    </tbody>
    </Table>
    </div>
    <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar
    </Button></div>
   </Form>  
  </>)
}
//pedidos
const CrearPedido= ({user}) => {
  const [prdlen, setPrdlen] = useState(0)
      const Rtienda = () => {
        const [isLoading, setLoading] = useState(false)
        const [tienda, setTienda] = useState(null)
        fetch(`${process.env.IP}/api/v1/tienda`)
        .then((res) => res.json())
        .then((data) => {
          setTienda(data.data)
          setLoading(false)
        })
        
        if (isLoading) return <p>Loading...</p>
          if (!tienda) return <p>No profile data</p>
          return(
              <>
                  <Form.Group className="mb-3" name='nombretienda' >
                  <Form.Label className='text-dark'>Nombre Tienda</Form.Label>
                  <Form.Select  name='nombreTienda' >
                    {tienda.map((t) => {
                      return(<option key='-' name='canal'>{t.nombreTienda}</option>)
                    })}
                  </Form.Select>
                  <Form.Text>
                      Nombre Tienda
                  </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" >
                        <Form.Label className='text-dark'>TDA</Form.Label>
                        <Form.Select   name='TDA'>
                    {tienda.map((t) => {
                      return(<option key='-' name='canal' >{t.TDA}</option>)
                    })}
                  </Form.Select>
  
                      </Form.Group>
              </>
          )
      }
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
                            <Form.Label id= {`prodn${count}`} className='text-dark'>{d.nombre}</Form.Label>
                          

                            <Form.Control type="Text" placeholder='Numero' id={`entregada${count}`} />
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
      
        
        
        
        prod.push({nombre:value, numero:parseInt(document.getElementById(`entregada${index}`).value)})
        
      }
     

      const data = {
        nombreTienda:e.target.nombreTienda.value,
        TDA:e.target.TDA.value,
        fechaP:e.target.fechaP.value,
        fechaE: e.target.fechaE.value,
        nombre:e.target.nombre.value,
        productos:prod
          
      }
      console.log(data)
      const resp = await axios.post(`${process.env.IP}/api/v1/pedido/as/crear`,data)

    

    }

  return (
    <>
   <Container>
     <Row>
     <Form onSubmit={handleSubmit}>
      
      <Form.Group className="mb-3" >
      <Form.Label className='text-dark'>Nombre Vendedor</Form.Label>
      <Form.Control value={user} disabled name='nombre'/>
    </Form.Group>
      <Rtienda/>
      <Form.Group className="mb-3">
          <Form.Label className='text-dark' >Fecha Pedido</Form.Label>
          <Form.Control type="date" placeholder="Fecha" name='fechaP'/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-dark' >Fecha Entrega</Form.Label>
          <Form.Control  type="date" placeholder="Fecha" name='fechaE'/>
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
const VerPedidos= ({user}) => {
  const initialState = {

    productos:[]
  }
  const [dta, setdta] = useState([initialState])
  const [pta, setpta] = useState([])
  
  const fetchdta = async (d) => {
  var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/pedido/as/${d}`)
  const dtajson = await resp.json()
  const crdta = dtajson.data
   
   console.log(crdta)
    return setdta(crdta); 
   
   
  }
  const fetchdtaH= async () => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/pedido/as`)
    const dtajson = await resp.json()
    const crdta = dtajson.data
     
     console.log(crdta)
      return setdta(crdta); 
     
     
    }
  const fetchptda = async (d) => {
    var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/productos`)
   const dtajson = await resp.json()
   const crdta = dtajson.data
   
   
    return setpta(crdta); 
   
   
  }
  const handlesbmt = async (e) => {
    e.preventDefault()  
    var fechaRemision=  document.getElementById(`fechaRemision`).value
    var monthdate = new Date(fechaRemision)
    console.log(monthdate.getMonth())
    fetchdta(fechaRemision)
    fetchptda()
    
    
   
   
   
  
  }
  const handlesubmt = async (e) => {
    e.preventDefault()  
  
    fetchdtaH()
    fetchptda()
    
    
   
   
   
  
  }
  
  return(<>
  <Form  >
  <Form.Group className="mb-3">
     <Form.Label >Fecha Pedido</Form.Label>
     <Form.Control type="date" placeholder="Fecha" id='fechaRemision'/>
     <Form.Text className="text-muted">
         Fecha
       </Form.Text>
   </Form.Group>
   <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar por fecha
    </Button></div>

 <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar Todos
    </Button></div>
 <div><Table striped bordered hover responsive><thead>
    <tr>
      
      <th> Nombre Tienda</th>
      <th>TDA</th>

      <th>Fecha Pedido </th>
      <th>Fecha Entrega</th>
      
      {pta.map(p => {
        return(<th key='-'>{p.nombre}</th>)
      })}
      
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        return(
      
      
        <>
        <tr>
          
          <td key='-'>{d.nombreTienda}</td>
          <td key='-'>{d.TDA}</td>

          <td key='-'>{d.fechaE}</td>
          <td key='-'>{d.fechaP}</td>
          
          {d.productos.map(p => {
            return(
              <td key='-'>{p.numero}</td>
              )
          })}

        </tr>

        

        </>
        
      
    )
  })}
    </tbody>
    </Table>
    </div>

   </Form>
   
  </>)
}
//****picking list****
const VerPicking= ({user}) => {
  const initialState = {

    productos:[]
  }
  
  const [dta, setdta] = useState([initialState])
  const [pta, setpta] = useState([])
  const getdata = async () => {
    const resp = await fetch(`${process.env.IP}/api/v1/picking/pendientes/`)
  const dtajson = await resp.json()
  const crdta = dtajson.data
  const respPr = await fetch(`${process.env.IP}/api/v1/productos`)
  const dtajsonPR = await respPr.json()
  const crdtaPR = dtajsonPR.data
  
  
   setpta(crdtaPR); 
   console.log(crdta)
  setdta(crdta);
  }
  useEffect(() => {
    getdata()
  }, [])
  
 
  
  const updPicking = async (e) => {
    let est =  document.getElementById(`estatus`).value
    console.log(est)
    const data = {
     estatus:est
 
     }
    const resp = await axios.put(`${process.env.IP}/api/v1/picking/update/${e}`,data)
 
 
 
 
 
   }
  
  
  return(<>
  
<Form>
 <div><Table striped bordered hover responsive><thead>
    <tr>
      
      <th> Nombre Tienda</th>
      <th>TDA</th>
      <th>Empleado encargado de Entrega</th>
      <th>Fecha Entrega</th>
      
      {pta.map(p => {
        return(<><th key='-'>{p.nombre}</th>
        <th key='-'>Cantidad</th>
        </>)
      })}
      <th>Estatus</th>
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        var fechaP = new Date(d.fecha)

        return(
      
      
        <>
        <tr>
          
          <td key='-'>{d.tienda}</td>
          <td key='-'>{d.TDA}</td>
          <td key='-'>{d.empleadoEntrega}</td>
          <td key='-'>{fechaP.toLocaleDateString()}</td>
          
          
          {d.productos.map(p => {

            return(<>
              <td key='-'></td>
              <td key='-'>{p.cantidad}</td>
              </>
              )
          })}
<td>
<Form >
        {!d.estatus || d.estatus === 'pendiente' && (<Form.Group className="mb-3">       
        <Form.Select  onChange={() => updPicking(d._id)}>
          <option key='-'>pendiente</option>
          <option id='estatus'  key='-'>liberado</option>
        </Form.Select>
        </Form.Group>)}
        </Form>
</td>
        </tr>

        

        </>
        
      
    )
  })}
    </tbody>
    </Table>
    </div>

   </Form>
   
  </>)
}
const VerPickingTD= ({user}) => {
  const initialState = {

    productos:[]
  }
  
  const [dta, setdta] = useState([initialState])
  const [pta, setpta] = useState([])
  const getdata = async () => {
    const resp = await fetch(`${process.env.IP}/api/v1/picking/`)
  const dtajson = await resp.json()
  const crdta = dtajson.data
  const respPr = await fetch(`${process.env.IP}/api/v1/productos`)
  const dtajsonPR = await respPr.json()
  const crdtaPR = dtajsonPR.data
  
  
   setpta(crdtaPR); 
   console.log(crdta)
  setdta(crdta);
  }
  useEffect(() => {
    getdata()
  }, [])
  
 
  
const updPicking = async (e) => {
    let est =  document.getElementById(`estatus`).value
    console.log(est)
    const data = {
     estatus:est
 
     }
    const resp = await axios.put(`${process.env.IP}/api/v1/picking/update/${e}`,data)
}
  
  
  return(<>
  
<Form>
 <div><Table striped bordered hover responsive><thead>
    <tr>
      
      <th>Nombre Tienda</th>
      <th>TDA</th>

      <th>Fecha Entrega</th>
      <th>Empleado encargado Entrega</th>
      
      {pta.map(p => {
        return(<><th key='-'>{p.nombre}</th>
        <th key='-'>Cantidad</th>
        </>)
      })}
      <th>Estatus</th>
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        var fechaP = new Date(d.fecha)

        return(
      
      
        <>
        <tr>
          
          <td key='-'>{d.tienda}</td>
          <td key='-'>{d.TDA}</td>
          <td key='-'>{d.empleadoEntrega}</td>
          <td key='-'>{fechaP.toLocaleDateString()}</td>
          
          
          {d.productos.map(p => {

            return(<>
              <td key='-'></td>
              <td key='-'>{p.cantidad}</td>
              </>
              )
          })}
<td>
<Form >
            {d.estatus ==='liberado' && (<Form.Group className="mb-3">       
        <Form.Control disabled value={d.estatus} id='estatus' >
         
        </Form.Control>
        </Form.Group>)}
        {!d.estatus || d.estatus === 'pendiente' && (<Form.Group className="mb-3">       
        <Form.Select  onChange={() => updPicking(d._id)}>
          <option key='-'>pendiente</option>
          <option key='-' id='estatus'>liberado</option>
        </Form.Select>
        </Form.Group>)}
        </Form>
</td>
        </tr>

        

        </>
        
      
    )
  })}
    </tbody>
    </Table>
    </div>

   </Form>
   
  </>)
}
//configuracion base
function CrearProducto() {
  const handleSubmit = async (e) => {
      // Stop the form from submitting and refreshing the page.
      e.preventDefault()
  
      // Get data from the form.
      const data = {
        nombre: e.target.producto.value,
        codigoBarras: e.target.codigoB.value,
        descripcion: e.target.desc.value,
        
      }
      console.log(data)
      const resp = await axios.post(`${process.env.IP}/api/v1/productos/crear`,data)

    

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
    
    
    <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Crear
    </Button></div>
  </Form>
   </Row>
 </Container>
  </>
)
}
const CrearCliente = ({user}) => {
  const [prdlen, setPrdlen] = useState(0)
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
        
        clave:e.target.clave.value,
        nombreCliente:e.target.nombreCliente.value,
       razonSocial:e.target.razonSocial.value,
       productos:prod
    }
    console.log(data)
    const resp = await axios.post(`${process.env.IP}/api/v1/cliente/crear`,data)
    Router.reload()
  

  }
return (
<>
<Container>
 <Row>
 <Form onSubmit={handleSubmit}>
   <h1 className='text-dark text-center'>Datos</h1>
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
    
<div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Crear
    </Button></div>
</Form>
 </Row>
</Container>
</>
)
}
function CrearUsuarioAd() {
  const handleSubmit = async (e) => {
      // Stop the form from submitting and refreshing the page.
      e.preventDefault()
  
      // Get data from the form.
      const data = {
        nombre: e.target.nombre.value,
        clave: e.target.clave.value,
        telefono:e.target.telefono.value,
        numLicencia:e.target.numLicencia.value,
        diasActivo:"",
        role: e.target.role,
        password: e.target.password,
      }
      console.log(data)
      const resp = await axios.post(`${process.env.IP}/api/v1/auth/register`,data)

    

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
      <Form.Group className="mb-3">
        <Form.Label  className='text-dark' >Rol</Form.Label>
        <Form.Select name='role' >
 
          <option>vendedor</option>
          <option>distribuidor</option>
          <option>almacen</option>

        </Form.Select>
          <Form.Text className="text-muted">
          Rol Empleado
          </Form.Text>
      </Form.Group>
      
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label  className='text-dark'>Password </Form.Label>
      <Form.Control type="password" placeholder="Password" name='password'/>
      
    </Form.Group>
    <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Crear
    </Button></div>
  </Form>
   </Row>
 </Container>
  </>
)
}
function CrearTienda({user}) {
  const handleSubmit = async (e) => {
      // Stop the form from submitting and refreshing the page.
      e.preventDefault()
  
      // Get data from the form.
      const data = {
        canal: e.target.canal.value,
        claveCliente: e.target.codigoC.value,
        TDA: e.target.tda.value,
        nombreTienda: e.target.nombreTienda.value,
       
        empleadoEncargado: e.target.encargado.value,
        facturable: e.target.facturable.value,
        horario:e.target.horario.value,
        calle:e.target.calle.value,
        numeroC:e.target.numeroC.value,
        colonia:e.target.colonia.value,
        telefono:e.target.telefono.value,
        contacto:e.target.contacto.value,
      }
      console.log(data)
      var days  = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      console.log(days.indexOf(e.target.diaP.value))
      data.diaP = days.indexOf(e.target.diaP.value)
      data.diaE = days.indexOf(e.target.diaE.value)
      const resp = await axios.post(`${process.env.IP}/api/v1/tienda/crear`,data)
      Router.reload()

    

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
      <Form.Select name='canal'>
          <option>Autoservicio</option>
          <option>Especializadas</option>
          <option>Detalle</option>
          <option>Venta directa</option>
          <option>Conveniencia</option>
          <option>Mayoristas</option>
          <option>Distribución</option>
          <option>eCommerce</option>
        </Form.Select>
      <Form.Text className="text-muted">
          Canal de venta 
      </Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Codigo Cliente</Form.Label>
      <Form.Control type="Text" placeholder="Codigo Cliente" name='codigoC'/>
      <Form.Text className="text-muted">
      Si el cliente pertenece a una cadena ya existente, favor de colocar la clave alfabética que le fue previamente asignada. 
      Si es nuevo elija una clave de 2 o 3 caracteres. 
      Esta clave se concatenará con el número de tienda.
      </Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>TDA</Form.Label>
      <Form.Control type="Text" placeholder="Descripcion" name='tda'/>
      <Form.Text className="text-muted">
        TDA de la tienda
      </Form.Text>
      
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Nombre</Form.Label>
      <Form.Control type="Text" placeholder="Nombre" name='nombreTienda'/>
      <Form.Text className="text-muted">
        Nombre de la tienda
      </Form.Text>
      
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label className='text-dark' >Dia Entrega</Form.Label>
        <Form.Select name='diaE'>
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miercoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
          <option>Sabado</option>
          <option>Domingo</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='text-dark' >Dia Promotoria</Form.Label>
        <Form.Select name='diaP'>
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miercoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
          <option>Sabado</option>
          <option>Domingo</option>
        </Form.Select>
      </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label className='text-dark' >Facturable</Form.Label>
        <Form.Select name='facturable'>
          <option>Si</option>
          <option>No</option>
          <option>Si, global</option>
        </Form.Select>
      </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Horario</Form.Label>
      <Form.Control type="Text" placeholder="Horario" name= 'horario'/>
      <Form.Text className="text-muted">
        Horario de recepcion de productos
      </Form.Text>
    </Form.Group>
    <h3 className='text-dark text-center'>Direccion</h3>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Calle</Form.Label>
      <Form.Control type="Text" placeholder="Calle" name= 'calle'/>

    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Numero</Form.Label>
      <Form.Control type="Text" placeholder="numero" name= 'numeroC'/>

    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Colonia</Form.Label>
      <Form.Control type="Text" placeholder="colonia" name= 'colonia'/>

    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Telefono</Form.Label>
      <Form.Control type="Text" placeholder="telefono" name= 'telefono'/>

    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label  className='text-dark'>Contacto</Form.Label>
      <Form.Control type="Text" placeholder="contacto" name= 'contacto'/>

    </Form.Group>
    <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Crear
    </Button></div>
  </Form>
      </Col>
    </Row>
  </Container>
  </>
)
}

//liquidaciones
const CrearLiquidacion = ({user}) => {
  console.log(user)
  const [prdlen, setPrdlen] = useState(0)
      const Rtienda = () => {
        const [isLoading, setLoading] = useState(false)
        const [tienda, setTienda] = useState(null)
        fetch(`${process.env.IP}/api/v1/tienda`)
        .then((res) => res.json())
        .then((data) => {
          setTienda(data.data)
          setLoading(false)
        })
        
        if (isLoading) return <p>Loading...</p>
          if (!tienda) return <p>No profile data</p>
          return(
              <>
                  <Form.Group className="mb-3" name='nombretienda' >
                  <Form.Label className='text-dark'>Nombre Tienda</Form.Label>
                  <Form.Select  name='nombreTienda' >
                    {tienda.map((t) => {
                      return(<option key='-' name='canal'>{t.nombreTienda}</option>)
                    })}
                  </Form.Select>
                  <Form.Text className="text-muted">
                      Nombre Tienda
                  </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" >
                        <Form.Label className='text-dark'>TDA</Form.Label>
                        <Form.Select   name='TDA'>
                    {tienda.map((t) => {
                      return(<option key='-' name='canal'>{t.TDA}</option>)
                    })}
                  </Form.Select>
  
                      </Form.Group>
              </>
          )
      }
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
                            <Form.Label id= {`prodn${count}`}>{d.nombre}</Form.Label>
                          

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
          numeroLiquidacion:e.target.clave.value,
          TDA:e.target.TDA.value,
          nombreTienda:e.target.nombreTienda.value,
          vendedor:e.target.vendedor.value,
          fechaLiquidacion:e.target.fechaLiquidacion.value,
          montoFactura:e.target.montoFacturado.value,
          folioLiquidacion: e.target.folioLiquidacion.value,
          piezasEntregadas: existenciaF,
          producto:prod
          
      }
      console.log(data)
      const resp = await axios.post(`${process.env.IP}/api/v1/liquidacion/crear`,data)

    

    }

  return (
    <>
   <Container>
     <Row>
     <Form onSubmit={handleSubmit}>
     <Form.Group className="mb-3">
          <Form.Label  className='text-dark'>Folio Liquidación</Form.Label>
          <Form.Control type="text" placeholder="Folio Liquidacion" name='folioLiquidacion'/>
        </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label  className='text-dark' >Nombre Vendedor</Form.Label>
      <Form.Control value={user} disabled name='vendedor'/>
    </Form.Group>
      <Rtienda/>
      <Form.Group className="mb-3">
          <Form.Label  className='text-dark' >Fecha</Form.Label>
          <Form.Control type="date" placeholder="Fecha" name='fechaLiquidacion'/>
          <Form.Text className="text-muted">
              Fecha Liquidacion
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-dark'>Monto Facturado</Form.Label>
          <Form.Control type="number" placeholder="Monto Facturado" name='montoFacturado'/>
        </Form.Group>

     
        <Render/>
        <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Crear
    </Button></div>
    </Form>
     </Row>
   </Container>
    </>
  )
}
const LiquidacionAdmin = (user) => {
  const initialState = {
    numeroLiquidacion:"",
  TDA:"",
  nombreTienda:"",
  vendedor:"",
  fechaLiquidacion:"",
  folioLiquidacion:"",
  montoFactura:2,
  piezasEntregadas:"",
  producto:[{}]
  }
  const [dta, setdta] = useState([initialState])
  const [pta, setpta] = useState([])
  const [liqdate, setliqdate] = useState(null)
  const [montose, setmontose] = useState(0)
  const [piezasT, setpiezasT] = useState(0)
  const [On, setOn] = useState(false)
var monto;
  const fetchdta = async (d) => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/liquidacion/`)
    const dtajson = await resp.json()
    const crdta = dtajson.data
    console.log(crdta.length)
    let mont = lodash.sumBy(crdta, (o) => {
      return parseFloat(o.montoFactura)
    })
    let piez = lodash.sumBy(crdta, (o) => {
      return parseFloat(o.piezasEntregadas)
    })
    
 
    setmontose(mont)
    setpiezasT(piez)
     
  
   
  }
  const fetchdtaP = async (d) => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/liquidacion/unica/${d}`)
    const dtajson = await resp.json()
    const crdta = dtajson.data
    console.log(crdta.length)
    return setdta(crdta); 
  
   
  }
  const fetchptda = async (d) => {
    var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/productos`)
   const dtajson = await resp.json()
   const crdta = dtajson.data
   
   
    return setpta(crdta); 
   
   
  }
  const handlesbmt = async (e) => {
    e.preventDefault()  
    var fechaRemision=  document.getElementById(`fechaRemision`).value
    fetchdtaP(fechaRemision)
    fetchdta()
    fetchptda()
    setOn(true)
    
  
   
   
   
  
  }
const Accor = () => {
  return( <>
   <div>
 <Accordion>
      <Accordion.Item   eventKey="0">
        <Accordion.Header><Table striped bordered hover><thead>
        <tr>
 
      <th>Monto Total Facturas</th>
      
      <th>Piezas Total Entregadas</th>
     
      
      
 
    </tr>
    <tr>
    <td> ${montose}</td>
    <td> {piezasT}</td>
    </tr>
  </thead>
  </Table> 
  </Accordion.Header>
        <Accordion.Body><Table striped bordered hover>
        <thead>
        <tr>
      <th>Numero Liquidacion</th>
      <th> Nombre Tienda</th>
      <th>TDA</th>
      <th>Vendedor</th>
      <th>Fecha Liquidacion</th>
      <th>Monto Factura</th>
      <th>Piezas Entregadas</th>
      
      
      {pta.map(p => {
          return(<th key='-'>{p.nombre}</th>)
        })}
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
      console.log(d)

      
        return(
      
          <>
           
            <tr>
              <td key='-'>{d.numeroLiquidacion}</td>
              <td key='-'>{d.nombreTienda}</td>
              <td key='-'>{d.TDA}</td>
              <td key='-'>{d.vendedor}</td>
              <td key='-'>{d.fechaLiquidacion}</td>
              <td key='-'>{d.montoFactura}</td>
              <td key='-'>{d.piezasEntregadas}</td>
              
              
              {d.producto.map(p => {
                  return(
                    <td key='-'>{p.existencia}</td>
                    )
                })}
    
            </tr>
            
            </>
        )
      
        
  })}
    </tbody>
    </Table> 
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
    

    
    </div>
  </>)
}
  return(<>





  <Form onSubmit={handlesbmt} >
  <Form.Group className="mb-3">
     <Form.Label className='text-dark' >Fecha</Form.Label>
     <Form.Control type="date" placeholder="Fecha" id='fechaRemision'/>
     <Form.Text className="text-muted">
        Fecha Liquidacion
      </Form.Text>
   </Form.Group>
 {On && (
   <Accor/>
 )}

    <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar
    </Button></div>
   </Form>
   
  </>)
}
//remision
const CrearRemision = ({user}) =>{  
  const [prdlen, setPrdlen] = useState(0)
  const Renderon = () => {
    const [isLoading, setLoading] = useState(false)
    const [tienda, setTienda] = useState(null)
    fetch(`${process.env.IP}/api/v1/cliente `)
    .then((res) => res.json())
    .then((data) => {
      setTienda(data.data)
      setLoading(false)
    })
    if (isLoading) return <p>Loading...</p>
      if (!tienda) return <p>No profile data</p>
      let count=1


    return(<>{tienda.map((d)=>{
      return(<>
      {d.productos.map(p=>{
        return(<><Form.Group className="mb-3">
        <Form.Label className='text-dark' id= {`prodn${count}`}>{p.nombre}</Form.Label>
      

        <Form.Control type="Text" placeholder='Cantidad' id={`cantidad${count}`} />
        <Form.Text className='text-dark' id= {`precio${count}`}>{p.precio}</Form.Text>
        <br/>
        <Form.Text className='text-dark' id= {`codigoBarras${count}`}>{p.codigoBarras}</Form.Text>
  </Form.Group>
  {count= count+1}
</>)
      }) }
      </>) 
  })}</>)
  }

  const Rcliente = () => {
    const [isLoading, setLoading] = useState(false)
    const [cliente, setcliente] = useState(null)
    const [isproducto, setisproducto] = useState(false)
    const [producto, setproducto] = useState(null)
    fetch(`${process.env.IP}/api/v1/cliente `)
    .then((res) => res.json())
    .then((data) => {
      setcliente(data.data)
      setLoading(false)
    })
    if (isLoading) return <p>Loading...</p>
      if (!cliente) return <p>No profile data</p>
      let count=1
      const onchangehandler = (e) => {
    
      setisproducto(true)
      setproducto(e.target.value)
     
      
      }
      
      
      return(
          <>
          <h2 className='text-center text-dark'>Datos</h2>
              <Form.Group className="mb-3" name='nombretienda' >
              <Form.Label className='text-dark' >Nombre Cliente</Form.Label>
              <Form.Select onChange={ onchangehandler} id='nombreCliente' >
                <option>-</option>
                {cliente.map((t) => {

                  return(<option  key='-'>{t.nombreCliente}</option>)
                })}
              </Form.Select>
              </Form.Group>
            
                {isproducto && (<>
                  <Form.Group className="mb-3" controlId="formBasicEmail" >
       <Form.Label className='text-dark'>Numero Remision</Form.Label>
       <Form.Control type="Text" placeholder="Remision" controlId='numero' id='numeroRemision' />
       <Form.Text className="text-muted">
           Numero de remision
       </Form.Text>
     </Form.Group>
     <Form.Group className="mb-3">
         <Form.Label className='text-dark'>Fecha</Form.Label>
         <Form.Control type="date" placeholder="Fecha" controlId='fecha' id='fechaRemision'/>
         <Form.Text className="text-muted">
             Fecha Liquidacion
           </Form.Text>
       </Form.Group>
       <Form.Group className="mb-3">
         <Form.Label className='text-dark' >Folio Liquidación</Form.Label>
         <Form.Control type="text" placeholder="Folio Liquidacion" controlId='folio'id='folioLiquidacion'/>
       </Form.Group>
                {cliente.map((p) => {
                  setPrdlen(p.productos.length)

                  if ( p.nombreCliente === producto) return(<>
                 <span className='text-dark'>RFC: </span> <h5 id='rfc' className='text-dark'>{p.razonSocial}</h5>
                 <br/>
                  <h2 className='text-center text-dark'>Productos</h2>   
                  {p.productos.map(p => (<><Form.Group className="mb-3">
     
        <Form.Label className='text-dark ' id= {`prodn${count}`}>{p.nombre}</Form.Label>
      

        <Form.Control type="Text" placeholder='Cantidad'  controlId='cantidad' id={`cantidad${count}`} />
        <Form.Text className='text-dark' type='text' controlId='precio' id= {`precio${count}`}>{p.precio}</Form.Text>
        <br/>
        <Form.Text className='text-dark' controlId='codigoBarras' id= {`codigoBarras${count}`}>{p.codigoBarras}</Form.Text>
  </Form.Group>
  {count= count+1}
  </>))
  
  }
  <Button type='submit'> Crear</Button>
  </>)
                  
                })}
                </>)}
          </>
      )
}

const [onClient, setonClient] = useState(true)
const [dataC, setdataC] = useState(null)
const handleSubmit = async (e) => {
  // Stop the form from submitting and refreshing the page.
  e.preventDefault()
  console.log(prdlen)
  let prod =[]
  // Get data from the form.
  var importe = 0
  for (let index = 1; index <= prdlen; index++) {
 console.log(index)
    var value = document.getElementById(`prodn${index}`).innerHTML
    var cant = parseInt(document.getElementById(`cantidad${index}`).value)
    var precio = parseFloat(document.getElementById(`precio${index}`).innerHTML).toFixed(2)
    var resul = cant * precio
    var result = parseFloat(resul).toFixed(2)
    console.log(value)
     prod.push({nombreProducto:value,cantidad:cant,precioUnitario:precio,codigoBarras:document.getElementById(`codigoBarras${index}`).innerHTML,importe:result})
   

    
  
    
    
    
    
    
  }

  let sub = lodash.sumBy(prod, (o) => {
    return parseFloat(o.importe)
  })

  console.log(sub)

  
  const data = {
    numeroRemision:document.getElementById('numeroRemision').value,
    rfc:document.getElementById('rfc').innerHTML,
    fechaRemision:document.getElementById('fechaRemision').value,
    folioLiquidacion:document.getElementById('folioLiquidacion').value,
    nombreCliente:document.getElementById('nombreCliente').value,
    
    productos: prod,
    subtotal:parseFloat(sub).toFixed(2),

    
}


  console.log(data)


  setdataC(data)
  //const resp = await axios.post(`${process.env.IP}/api/v1/remision/crear`,data)
  
  
  
  return setonClient(false)

}
const RenderPDF = ({data}) => {
  const refpdf = React.useRef()
  return(<>

  
    
   <Row><Col>
   <br/>
   <div style={{width: 720, height:4500 }} ref={refpdf} className='mt-5'>
        <Pdf  
        numero={data.numeroRemision}
        fecha={data.fechaRemision}
        cliente={data.nombreCliente}
        rfc={data.rfc}
        productos={data.productos}
        subtotal={data.subtotal}
        />
        
    </div></Col><Col> <ReactPDF targetRef={refpdf} filename={`remision${data.numeroRemision}.pdf`}>
      {({ toPdf }) => <Button onClick={toPdf} type='button'>Generate Pdf</Button>}
  </ReactPDF></Col></Row>
    </>)
}


return(<>
  <Container>
    <Row>
    <Form onSubmit={handleSubmit}>
     

     
     
      {onClient && ( <Rcliente/>)}
      {!onClient && (<RenderPDF data={dataC}/>)}

      
  
   </Form>
    </Row>
  </Container>
  </>)
}

const VerRemisionD = () => {
  const initialState = {
    numeroRemision:"",
    TDA:"",
    nombreTienda:"",
    vendedor:"",
    fechaRemision:"",
    folioLiquidacion:"",
    totalsinieps:"",
    ieps:"",
    total:"",
    producto:[{nombre:""}]
  }
  const [dta, setdta] = useState([initialState])
  const [pta, setpta] = useState([])
  
  const fetchdta = async (d) => {
    var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/remision/unica/${d}`)
   const dtajson = await resp.json()
   const crdta = dtajson.data
   
   
    return setdta(crdta); 
   
   
  }
  const fetchptda = async (d) => {
    var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/productos`)
   const dtajson = await resp.json()
   const crdta = dtajson.data
   
   
    return setpta(crdta); 
   
   
  }
  const handlesbmt = async (e) => {
    e.preventDefault()  
    var fechaRemision=  document.getElementById(`fechaRemision`).value
    fetchdta(fechaRemision)
    fetchptda()
    
    
   
   
   
  
  }
  return(<>
  <Form onSubmit={handlesbmt} >
  <Form.Group className="mb-3">
     <Form.Label className='text-dark'>Fecha</Form.Label>
     <Form.Control type="date" placeholder="Fecha" id='fechaRemision'/>
     <Form.Text className="text-muted">
         Fecha Liquidacion
       </Form.Text>
   </Form.Group>
   <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar
    </Button></div>
 <div><Table striped bordered hover responsive><thead>
    <tr>
      <th>Numero Remision</th>
      <th> Nombre Tienda</th>
      <th>TDA</th>
      <th>Vendedor</th>
      <th>Fecha Remision</th>
      <th>Folio Liquidacion</th>
      <th>Total sin IEPS</th>
      <th>IEPS</th>
      <th>Total</th>
      
      {pta.map(p => {
        return(<th key='-'>{p.nombre}</th>)
      })}
      
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        return(
      
      
        <>
        <tr>
          <td key='-'>{d.numeroRemision}</td>
          <td key='-'>{d.nombreTienda}</td>
          <td key='-'>{d.TDA}</td>
          <td key='-'>{d.vendedor}</td>
          <td key='-'>{d.fechaRemision}</td>
          <td key='-'>{d.folioLiquidacion}</td>
          <td key='-'>${d.totalsinieps}</td>
          <td key='-'>${d.ieps}</td>
          <td key='-'>${d.total}</td>
          {d.producto.map(p => {
            return(
              <td key='-'>{p.numero}</td>
              )
          })}

        </tr>

        

        </>
        
      
    )
  })}
    </tbody>
    </Table>
    </div>

   </Form>
   
  </>)
}

//cambios
const CrearCambio = ({user}) =>{  const [prdlen, setPrdlen] = useState(0)
  const Rtienda = () => {
    const [isLoading, setLoading] = useState(false)
    const [tienda, setTienda] = useState(null)
    fetch(`${process.env.IP}/api/v1/tienda `)
    .then((res) => res.json())
    .then((data) => {
      setTienda(data.data)
      setLoading(false)
    })
    
    if (isLoading) return <p>Loading...</p>
      if (!tienda) return <p>No profile data</p>
      return(
          <>
              <Form.Group className="mb-3" name='nombretienda' >
              <Form.Label className='text-dark'>Nombre Tienda</Form.Label>
              <Form.Select  name='nombreTienda' >
                {tienda.map((t) => {
                  return(<option  key='-'name='canal'>{t.nombreTienda}</option>)
                })}
              </Form.Select>
              <Form.Text className="text-muted">
                  Nombre Tienda
              </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" >
                    <Form.Label className='text-dark'>TDA</Form.Label>
                    <Form.Select   name='TDA'>
                {tienda.map((t) => {
                  return(<option  key='-' name='canal'>{t.TDA}</option>)
                })}
              </Form.Select>

                  </Form.Group>
          </>
      )
  }
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
    
    console.log(data.length)
    setPrdlen(data.length)
    
    
    
    return(
        <>
            <div>
               {data.map((d)=>{
                 
                   return(<>
                    <br/>
                   <Form.Group className="mb-3">
                        <Form.Label className='text-dark' id={`prodn${count}`}>{d.nombre}</Form.Label>
                      

                        <Form.Control type="Text" placeholder='numero de piezas' id={`numero${count}`} />
                        
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
  let prod =[]
  // Get data from the form.
  for (let index = 1; index <= prdlen; index++) {
 
    var value = document.getElementById(`prodn${index}`).innerHTML
    
      
      prod.push({nombre:value, numero:parseInt(document.getElementById(`numero${index}`).value)})

    
  
    
    
    
    
    
  }
  console.log(prod)

  const data = {
   
    fecha:e.target.fecha.value,
    TDA:e.target.TDA.value,
    tipoMovimiento:e.target.tipoMovimiento.value,
    nombreTienda:e.target.nombreTienda.value,
    nombre:e.target.nombre.value,
    producto:prod
    
}
  
  const resp = await axios.post(`${process.env.IP}/api/v1/cambios/crear`,data)
  console.log(resp)
  


}

  return(<>
  <Container>
    <Row>
    <Form onSubmit={handleSubmit}>
     
     <Form.Group className="mb-3" >
     <Form.Label>Nombre Empleado</Form.Label>
     <Form.Control value={user} disabled name='nombre'/>
   </Form.Group>
     <Rtienda/>
     <Form.Group className="mb-3">
         <Form.Label className='text-dark' >Fecha</Form.Label>
         <Form.Control type="date" placeholder="Fecha" name='fecha'/>
         <Form.Text className="text-muted">
             Fecha cambio
           </Form.Text>
       </Form.Group>
       <Form.Group className="mb-3"  >
      <Form.Label className='text-dark'>Tipo Movimiento</Form.Label>
      <Form.Select name='tipoMovimiento'>
          <option>cambio</option>
          <option>devolucion</option>
        </Form.Select>
    </Form.Group>

       <Render/>
       <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Crear
    </Button></div>
   </Form>
    </Row>
  </Container>
  </>)
}
const VerCambios = ({user}) => {
  const initialState = {

    producto:[]
  }
  const [dta, setdta] = useState([initialState])
  const [pta, setpta] = useState([])
  
  const fetchdta = async (d) => {
  var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/cambios/${d}`)
  const dtajson = await resp.json()
  const crdta = dtajson.data
   
   console.log(crdta)
    return setdta(crdta); 
   
   
  }
  const fetchdtaH= async () => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/cambios/`)
    const dtajson = await resp.json()
    const crdta = dtajson.data
     
     console.log(crdta)
      return setdta(crdta); 
     
     
    }
  const fetchptda = async (d) => {
    var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/productos`)
   const dtajson = await resp.json()
   const crdta = dtajson.data
   
   
    return setpta(crdta); 
   
   
  }
  const handlesbmt = async (e) => {
    e.preventDefault()  
    var fechaRemision=  document.getElementById(`fechaRemision`).value
    var monthdate = new Date(fechaRemision)
    console.log(monthdate.getMonth())
    fetchdta(fechaRemision)
    fetchptda()
    
    
   
   
   
  
  }
  const handlesubmt = async (e) => {
    e.preventDefault()  
  
    fetchdtaH()
    fetchptda()
    
    
   
   
   
  
  }
  
  return(<>
  <Form  >
  <Form.Group className="mb-3">
     <Form.Label >Fecha</Form.Label>
     <Form.Control type="date" placeholder="Fecha" id='fechaRemision'/>
     <Form.Text className="text-muted">
         Fecha Liquidacion
       </Form.Text>
   </Form.Group>
   <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar por fecha
    </Button></div>

 <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar Todos
    </Button></div>
 <div><Table striped bordered hover responsive><thead>
    <tr>
      
      <th> Nombre Tienda</th>
      <th>TDA</th>
      <th>Empleado</th>
      <th>Fecha </th>
      <th>Tipo Movimiento</th>
      
      {pta.map(p => {
        return(<th key='-'>{p.nombre}</th>)
      })}
      
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        return(
      
      
        <>
        <tr key='-'>
          
          <td key='-'>{d.nombreTienda}</td>
          <td key='-'>{d.TDA}</td>
          <td key='-'>{d.nombre}</td>
          <td key='-'>{d.fecha}</td>
          <td key='-'>{d.tipoMovimiento}</td>
          {d.producto.map(p => {
            return(
              <td key='-'> {p.numero}</td>
              )
          })}

        </tr>

        

        </>
        
      
    )
  })}
    </tbody>
    </Table>
    </div>

   </Form>
   
  </>)
}
//facturacion
const CrearFactura = ({user}) =>{  
  const [prdlen, setPrdlen] = useState(0)
  const Rtienda = () => {
    const [isLoading, setLoading] = useState(false)
    const [tienda, setTienda] = useState(null)
    fetch(`${process.env.IP}/api/v1/tienda `)
    .then((res) => res.json())
    .then((data) => {
      setTienda(data.data)
      setLoading(false)
    })
    
    if (isLoading) return <p>Loading...</p>
      if (!tienda) return <p>No profile data</p>
      return(
          <>
              <Form.Group className="mb-3" name='nombretienda' >
              <Form.Label className='text-dark'>Nombre Tienda</Form.Label>
              <Form.Select  name='nombreTienda' >
                {tienda.map((t) => {
                  return(<option key='-' name='canal'>{t.nombreTienda}</option>)
                })}
              </Form.Select>
              <Form.Text className="text-muted">
                  Nombre Tienda
              </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" >
                    <Form.Label className='text-dark'>TDA</Form.Label>
                    <Form.Select   name='TDA'>
                {tienda.map((t) => {
                  return(<option key='-' name='canal'>{t.TDA}</option>)
                })}
              </Form.Select>

                  </Form.Group>
          </>
      )
  }
  const Rcliente = () => {
    const [isLoading, setLoading] = useState(false)
    const [tienda, setTienda] = useState(null)
    fetch(`${process.env.IP}/api/v1/cliente `)
    .then((res) => res.json())
    .then((data) => {
      setTienda(data.data)
      setLoading(false)
    })
    
    if (isLoading) return <p>Loading...</p>
      if (!tienda) return <p>No profile data</p>
      return(
          <>
              <Form.Group className="mb-3" name='nombretienda' >
              <Form.Label className='text-dark'>Nombre Cliente</Form.Label>
              <Form.Select  name='nombreCliente' >
                {tienda.map((t) => {
                  return(<option key='-' name='nombreCliente'>{t.nombreCliente}</option>)
                })}
              </Form.Select>
            
              </Form.Group>
              
          </>
      )
  }
const handleSubmit = async (e) => {
  // Stop the form from submitting and refreshing the page.
  e.preventDefault()
  let prod =[]
  // Get data from the form.
 

  const data = {
   
    folioLiquidacion:e.target.folioLiquidacion.value,
    folioInterno:e.target.folioInterno.value,
    fechaLiquidacion:e.target.fechaLiquidacion.value,
    fechaFacturacion:e.target.fechaFacturacion.value,
    TDA:e.target.TDA.value,
    nombreTienda:e.target.nombreTienda.value,
    montoFactura:e.target.montoFactura.value,
    numeroFactura:e.target.numeroFactura.value,
    nombreCliente:e.target.nombreCliente.value,
    piezasEntregadas:e.target.piezasEntregadas.value
}
  console.log(data)
  const resp = await axios.post(`${process.env.IP}/api/v1/facturacion/crear`,data)
  Router.reload('/')
  
  


}

  return(<>
  <Container>
    <Row>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" >
     <Form.Label className='text-dark'>Numero Factura</Form.Label>
     <Form.Control type='number'  name='numeroFactura'/>
   </Form.Group>
     <Form.Group className="mb-3" >
     <Form.Label className='text-dark'>Nombre Empleado</Form.Label>
     <Form.Control value={user} disabled name='nombre'/>
   </Form.Group>
   <Form.Group className="mb-3" >
     <Form.Label className='text-dark'>Folio Liquidacion</Form.Label>
     <Form.Control   name='folioLiquidacion'/>
   </Form.Group>
     <Rtienda/>
     <Rcliente/>
     <Form.Group className="mb-3">
         <Form.Label className='text-dark' >Fecha Liquidacion</Form.Label>
         <Form.Control type="date" placeholder="Fecha" name='fechaLiquidacion'/>
         <Form.Text className="text-muted">
             Fecha Liquidacion
           </Form.Text>
       </Form.Group>
       <Form.Group className="mb-3">
         <Form.Label className='text-dark' >Fecha Facturacion</Form.Label>
         <Form.Control type="date" placeholder="Fecha" name='fechaFacturacion'/>
         <Form.Text className="text-muted">
             Fecha Facturacion
           </Form.Text>
       </Form.Group>
       <Form.Group className="mb-3" >
     <Form.Label className='text-dark'>Piezas Entregadas</Form.Label>
     <Form.Control type='number'  name='piezasEntregadas'/>
   </Form.Group>
   <Form.Group className="mb-3" >
     <Form.Label className='text-dark'>Monto Facturado</Form.Label>
     <Form.Control type='number'  name='montoFactura'/>
   </Form.Group>
  
   


   <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Crear
    </Button></div>
   </Form>
    </Row>
  </Container>
  </>)
}
const VerFactura = ({user}) => {
  const initialState = {

    producto:[]
  }
  const [dta, setdta] = useState([initialState])

  
  const fetchdta = async (d) => {
  var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/facturacion/${d}`)
  const dtajson = await resp.json()
  const crdta = dtajson.data
   
   console.log(crdta)
    return setdta(crdta); 
   
   
  }
  const fetchdtaH= async () => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/facturacion/`)
    const dtajson = await resp.json()
    const crdta = dtajson.data
     
     console.log(crdta)
      return setdta(crdta); 
     
     
    }

  const handlesbmt = async (e) => {
    e.preventDefault()  
    var fechaRemision=  document.getElementById(`fechaRemision`).value
    fetchdta(fechaRemision)

    
    
   
   
   
  
  }
  const handlesubmt = async (e) => {
    e.preventDefault()  
  
    fetchdtaH()

    
    
   
   
   
  
  }
  
  return(<>
  <Form  >
  <Form.Group className="mb-3">
     <Form.Label >Fecha</Form.Label>
     <Form.Control type="date" placeholder="Fecha" id='fechaRemision'/>
     <Form.Text className="text-muted">
         Fecha Liquidacion
       </Form.Text>
   </Form.Group>
   <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar por Fecha
    </Button></div>

 <div className='text-center mt-2'><Button variant="dark" type="submit" className='text-center text-danger' size='lg'>
     Consultar Todos
    </Button></div>
 <div><Table striped bordered hover responsive><thead>
    <tr>
      
      <th> Nombre Tienda</th>
      <th>TDA</th>
      <th>Folio Liquidacion</th>
      <th>Folio Interno</th>
      <th>Fecha Liquidacion</th>
      <th>Fecha Facturacion</th>
      <th>Monto Factura</th>
      <th>Numero Factura</th>
      <th>Empleado</th>
      <th>Piezas Entregadas</th>
      
     
      
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        return(
      
      
        <>
        <tr>
        <td>{d.nombreTienda}</td>
          <td>{d.TDA}</td>
        <td>{d.folioLiquidacion}</td>
        <td>{d.folioInterno}</td>
        <td>{d.fechaLiquidacion}</td>
        <td>{d.fechaFacturacion}</td>
        
          <td>{d.montoFactura}</td>
          <td>{d.numeroFactura}</td>
          <td>{d.nombre}</td>
          <td>{d.piezasEntregadas}</td>
          

        </tr>

        

        </>
        
      
    )
  })}
    </tbody>
    </Table>
    </div>

   </Form>
   
  </>)
}
//***cobranza***/
export default function Index({user}) {
    function VerProductosModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen
            className='text-white'
          >
            <Modal.Header closeButton className='bg-dark' closeVariant='white'>
              <Modal.Title id="contained-modal-title-vcenter " className='text-white'>
                {props.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.body}
              
            </Modal.Body>
          </Modal>
        );
      }
    function VerClientesModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen
            className='text-white'
          >
            <Modal.Header closeButton className='bg-dark' closeVariant='white'>
              <Modal.Title id="contained-modal-title-vcenter " className='text-white'>
                Clientes
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.body}
              
            </Modal.Body>
          </Modal>
        );
      }
      const [verproducto, setverproducto] = useState(false)
      const [vercliente, setvercliente] = useState(false)
      const [vertienda, setvertienda] = useState(false)
      const [crearvisita, setcrearvisita] = useState(false)
      const [vervisita, setvervisita] = useState(false)

      const [crearpedido, setcrearpedido] = useState(false)
      const [verpedido, setverpedido] = useState(false)
      const [crearproducto, setcrearproducto] = useState(false)
      const [crearcliente, setcrearcliente] = useState(false)
      const [creartienda, setcreartienda] = useState(false)
      const [crearempleado, setcrearempleado] = useState(false)
      const [crearfolio, setcrearfolio] = useState(false)
      const [verfolio, setverfolio] = useState(false)
      const [crearcambio, setcrearcambio] = useState(false)
      const [vercambio, setvercambio] = useState(false)
      const [crearfactura,setcrearfactura] = useState(false)
      const [crearRemision,setcrearRemision] = useState(false)
      const [verfactura,setverfactura] = useState(false)
      const [verpickingtd,setverpickingtd] = useState(false)
      const [verpicking,setverpicking] = useState(false)
  return (
   <div style={{height: '120vh',
   position: 'relative',
   backgroundSize: '',
   backgroundImage: `url('/backg.webp')` }}>
<Navb title='Comercializacion'/>
<div style={{display:'block',marginLeft:'auto',marginRight:'auto', width: '20%'}} className='mb-4'>
  <Image src="/torologo.webp"
      alt="Picture of the author"
      width={700}
      height={500} />
</div>
<Container className='text-center' >
      <Row>
        {/*datos maestros*/}
        <Col sm={4} md={4}className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item className='bg-dark text-danger font-weight-bold'>Datos Maestros</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setverproducto(true)} variant="secondary">
              Productos
            </ListGroup.Item>
            <ListGroup.Item action variant="secondary"  onClick={()=> setvertienda(true)}  >
              Tiendas
            </ListGroup.Item  >
            <ListGroup.Item action variant="secondary"  onClick={()=> setvercliente(true)}>
              Clientes
            </ListGroup.Item>
          </ListGroup>

          {/* modals datos maestros*/}
          <VerProductosModal
      show={verproducto}
      onHide={() => setverproducto(false)}
      body={<ProductosUser user={user}/>}
      title='Productos'
    />
      <VerProductosModal
      show={vercliente}
      onHide={() => setvercliente(false)}
      body={<ClienteAdmin user={user}/>}
      title='Clientes'
    />
     <VerProductosModal
      show={vertienda}
      onHide={() => setvertienda(false)}
      body={<TiendaUser user={user}/>}
      title='Tiendas'
    />
        </Col>
        {/*captura visitas*/}
        <Col sm={4} className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item  className='bg-dark text-danger font-weight-bold'>Capturas visitas/pedidos</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearvisita(true)} variant="secondary">
              Visita
            </ListGroup.Item>
            <ListGroup.Item action variant="secondary" onClick={()=> setcrearpedido(true)} >
              Pedido
            </ListGroup.Item>
          </ListGroup>
          <VerProductosModal
      show={crearvisita}
      onHide={() => setcrearvisita(false)}
      body={<CrearVisita user={user}/>}
      title='Visita Promotoria'
    />
    
        </Col>
        {/***promotoria pendiente***/}
        <Col sm={4} className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item  className='bg-dark text-danger font-weight-bold'>Promotoria</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setvervisita(true)} variant="secondary">
            Consultar visitas
            </ListGroup.Item>
          </ListGroup>
          <VerProductosModal
          show={vervisita}
          onHide={() => setvervisita(false)}
          body={<VerVisitaAdmin user={user}/>}
          title='Visita Promotoria'
          />
        </Col>
        {/*pedidos*/}
        <Col sm={4} className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item  className='bg-dark text-danger font-weight-bold'>Pedidos</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setverpedido(true)} variant="secondary">
            Consulta de Pedidos
            </ListGroup.Item>
            
          </ListGroup>
          <ListGroup>
          <ListGroup.Item action variant="secondary" onClick={()=> setcrearpedido(true)} >
              Pedido
            </ListGroup.Item>
          </ListGroup>
          <VerProductosModal
      show={crearpedido}
      onHide={() => setcrearpedido(false)}
      body={<CrearPedido user={user}/>}
      title='CrearPedido'
    />
          <VerProductosModal
      show={verpedido}
      onHide={() => setverpedido(false)}
      body={<VerPedidos user={user}/>}
      title='Ver Pedidos'
    />
        </Col>
        {/*picking list*/}
        <Col sm={4} className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
        <ListGroup>
        <ListGroup.Item  className='bg-dark text-danger font-weight-bold'>Picking List</ListGroup.Item>
        <ListGroup.Item action onClick={()=> setverpickingtd(true)} variant="secondary">
            Consultar picking list 
        </ListGroup.Item>
        <ListGroup.Item action onClick={()=> setverpicking(true)} variant="secondary">
            Consultar picking list sin liberar
        </ListGroup.Item>
            
        </ListGroup>
    <VerProductosModal
      show={verpicking}
      onHide={() => setverpicking(false)}
      body={<VerPicking />}
      title='Ver Picking'
    />
    <VerProductosModal
      show={verpickingtd}
      onHide={() => setverpickingtd(false)}
      body={<VerPickingTD />}
      title='Ver Picking'
    />
    </Col>
         {/*configuracion base*/}
        <Col sm={4} className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item  className='bg-dark text-danger font-weight-bold' >Configuracion Base</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearcliente(true)} variant="secondary">
            Agregar Cliente 
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearproducto(true)} variant="secondary">
            Agregar Producto
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcreartienda(true)} variant="secondary">
            Agregar Tienda
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearempleado(true)} variant="secondary">
            Agregar Empleado
            </ListGroup.Item>
          </ListGroup>
          <VerProductosModal
          show={crearproducto}
          onHide={() => setcrearproducto(false)}
          body={<CrearProducto user={user}/>}
          title='Agregar Producto'
          />
        <VerProductosModal
          show={crearcliente}
          onHide={() => setcrearcliente(false)}
          body={<CrearCliente user={user}/>}
          title='Agregar Cliente'
          />
         <VerProductosModal
            show={creartienda}
            onHide={() => setcreartienda(false)}
            body={<CrearTienda user={user}/>}
            title='Agregar Tienda'
            />
         <VerProductosModal
            show={crearempleado}
            onHide={() => setcrearempleado(false)}
            body={<CrearUsuarioAd user={user}/>}
            title='Agregar Empleado'
            />
        </Col>
         {/*liquidaciones*/}
        <Col sm={4} className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item  className='bg-dark text-danger font-weight-bold'>Liquidaciones</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearfolio(true)} variant="secondary" >
            Captura de folios
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setverfolio(true)} variant="secondary">
            Liquidaciones diarias
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearRemision(true)}  variant="secondary">
           Remision
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearcambio(true)} variant="secondary">
           Capturar Cambio Fisico
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setvercambio(true)} variant="secondary">
           Consulta de cambios 
            </ListGroup.Item>
           
            
          </ListGroup>
          <VerProductosModal
      show={verfolio}
      onHide={() => setverfolio(false)}
      body={<LiquidacionAdmin user={user}/>}
      title='Liquidaciones diarias'
    />
     <VerProductosModal
      show={crearRemision}
      onHide={() => setcrearRemision(false)}
      body={<CrearRemision />}
      title='Remision'
    />
    <VerProductosModal
      show={crearfolio}
      onHide={() => setcrearfolio(false)}
      body={<CrearLiquidacion user={user}/>}
      title='Captura de folios'
    />
    <VerProductosModal
      show={crearcambio}
      onHide={() => setcrearcambio(false)}
      body={<CrearCambio user={user}/>}
      title='Captura de Cambios'
    />
     <VerProductosModal
      show={vercambio}
      onHide={() => setvercambio(false)}
      body={<VerCambios user={user}/>}
      title='Consulta de Cambios'
    />
        </Col>
         {/*facturacion*/}
        <Col sm={4} className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item  className='bg-dark text-danger font-weight-bold'>Facturacion</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearfactura(true)} variant="secondary">
            Captura de Facturas
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setverfactura(true)} variant="secondary">
           Facturacion por mes 
            </ListGroup.Item>

           
            
          </ListGroup>
          <VerProductosModal
      show={crearfactura}
      onHide={() => setcrearfactura(false)}
      body={<CrearFactura user={user}/>}
      title='Captura de facturas'
    />
       <VerProductosModal
      show={verfactura}
      onHide={() => setverfactura(false)}
      body={<VerFactura user={user}/>}
      title='Facturacion por mes'
    />
        </Col>

        
      </Row>
</Container>

 
    
</div>
  )
}
