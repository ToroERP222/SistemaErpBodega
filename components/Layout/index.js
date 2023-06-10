import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
import ProductosUser from '../DatosMaestros/ProductoUser'
import ClienteAdmin from '../DatosMaestros/ClienteAdmin'
import TiendaUser from '../DatosMaestros/TiendaUser'
import CrearProducto from '../Crear/CrearProducto'
import CrearVisita from '../Promotoria/CrearVisita'
import VerVisitaAdmin from '../Promotoria/VerVisitaAdmin'
import CrearCliente from '../Crear/CrearCliente'
import CrearUsuarioAd from '../Crear/CrearUsuarioAd'
import CrearTienda from '../Crear/CrearTienda'
import CrearLiquidacion from '../Crear/CrearLiquidaciones'
import Almacen from '../Almacen/Almacen'
import Fabricante from '../Almacen/Fabricante'
import VerPedidos from '../Almacen/VerPedido'
//funciones datos maestros



//promotoria



const CrearPedido = ({user}) => {
  const [pta, setpta] = useState(null)
  const [clientes, setclientes] = useState([{nombreCliente:'',canal:''}])
  const [tiendas, settiendas] = useState(null)
  const [nomcliente, setnomcliente] = useState(null)
  const [tda, settda] = useState(null)
const [canal, setcanal] = useState(null)
const [activeclient, setactiveclient] = useState(false)
const [prdlen, setPrdlen] = useState(0)
let count=1
  const handlecanal= (e) => {
      
    setactiveclient(true)
    setcanal(e.target.value)
    
  }
  const handletienda= (e) => {
      
    
    setnomcliente(e.target.value)
    
  }
  const handleTDA= (e) => {
      
    
    settda(e.target.value)
    
  }
  const fetchptda = async (d) => {
    var result = [];
  const resp = await fetch(`${process.env.IP}/api/v1/productos`)
   const dtajson = await resp.json()
   const crdta = dtajson.data
   setPrdlen(crdta.length)
    return setpta(crdta);  
  }
  const getclients = async () => {
    const res = await fetch(`${process.env.IP}/api/v1/cliente`)
    const dta = await res.json() 
    const crdta = dta.data
    console.log(crdta)
    return setclientes(crdta)
  }
  const getTiendas = async () => {
    const res = await fetch(`${process.env.IP}/api/v1/tienda`)
    const dta = await res.json() 
    const crdta = dta.data
    console.log(crdta)
    return settiendas(crdta)
  }
  useEffect(() => {
    fetchptda()
    getclients()
    getTiendas()
  }, [])
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
     
      TDA:e.target.TDA.value,
      fechaP:e.target.fechaP.value,
      fechaE: e.target.fechaE.value,
      nombreCliente:e.target.nombreCliente.value,
      canal: e.target.canal.value,
      productos:prod
        
    }
    console.log(data)
    const resp = await axios.post(`${process.env.IP}/api/v1/pedido/crear`,data)
  

  }
  return(<>
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
           <Form.Select name='nombreCliente' onChange={handletienda}>
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

           <Form.Group className="mb-3"  >
           <Form.Label  className='text-dark'>TDA</Form.Label>
           <Form.Select name='TDA' onChange={handleTDA}>
       {tiendas.map(d=> {
         
         return(<>
         { nomcliente=== d.nombreCliente && (<>
           <option>-</option>
           <option>{d.TDA}</option>
         
       </>)}
           

         </>)
       })}
      
       </Form.Select>
           
           </Form.Group>
        {tiendas.map(d => {
          return(<>
          {tda === d.TDA && (<>
          <Form.Group className="mb-3">
                   
                  
          <Form.Label  className='text-dark'>Nombre Tienda</Form.Label>
                    <Form.Control type="Text"  value={d.nombreTienda} disabled name='nombreTienda' />
              </Form.Group>
          </>)}
          </>)
        })}


<Form.Group className="mb-3">
          <Form.Label className='text-dark' >Fecha Pedido</Form.Label>
          <Form.Control type="date" placeholder="Fecha" name='fechaP'/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='text-dark' >Fecha Entrega</Form.Label>
          <Form.Control  type="date" placeholder="Fecha" name='fechaE'/>
        </Form.Group>
        <h2 className='text-dark text-center'>Productos</h2>
           {pta.map((d)=>{
               
               return(<>
                <br/>
               <Form.Group className="mb-3">
                    <Form.Label id= {`prodn${count}`} className='text-dark'>{d.nombre}</Form.Label>
                  

                    <Form.Control type="Text" placeholder='Numero' id={`entregada${count}`} />
              </Form.Group>

               {count= count+1}
               </>)
               
           })}


 

   <Button variant="primary" type="submit">
     Submit
   </Button>
  </>)}
    </Form>
    </Col>
    </Row>
    </Container>
  </>)
  
}



//****picking list****
const VerPicking= ({user}) => {
  const initialState = {

    productos:[],
    fecha:[]
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
  const handlePedido = async (d) => {
    console.log(d)
    const update = {
      estatus:'pendiente'
    }
    const updatePedido = await axios.put(`${process.env.IP}/api/v1/almacen/pedido/update/${d.idPedido}`,update)
    console.log(updatePedido)
    const data = {
      estatus:'no enviado'
  
      }
     const resp = await axios.put(`${process.env.IP}/api/v1/picking/update/${d._id}`,data)
  }
  const handleEliminarPedido = async (d) => {
   
   
    const eliminarPedido = await axios.delete(`${process.env.IP}/api/v1/picking/delete/${d._id}`)
    alert('Picking Eliminado')
  }
  return(<>
  
<Form>
 <div><Table striped bordered hover responsive><thead>
    <tr>
      
      
      <th>TDA</th>
      <th>Empleado encargado de Entrega</th>
      <th>Fecha Entrega</th>
      
      {pta.map(p => {
        return(<><th key='-'> Cantidad a entregar de {p.nombre} </th>
        
        </>)
      })}
      <th>Estatus</th>
      <th>Regresar  a pedidos promotoria</th>
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        

        return(
      
      
        <>
        <tr>
          
          
          <td key='-'>{d.TDA}</td>
          <td key='-'>{d.empleadoEntrega}</td>
          <td key='-'><Form.Select>{d.fecha.map(f => (<>
          <option>{f.fechaE}</option>
          
          </>))}</Form.Select></td>
          
          
          {d.productos.map(p => {

            return(<>
              
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
<td><Button onClick={() => handlePedido(d)}>Regresar</Button></td>
<td><Button bg='danger' onClick={() => handleEliminarPedido(d)}>Eliminar</Button></td>
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
    fecha:[],
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
      
     
      <th>TDA</th>

      
      <th>Empleado encargado Entrega</th>
      <th>Fecha Entrega</th>
      {pta.map(p => {
        return(<><th key='-'>{p.nombre}</th>
       
        </>)
      })}
      <th>Estatus</th>
    </tr>
  </thead>
  <tbody>
    {dta.map(d => {
        

        return(
      
      
        <>
        <tr>
          
         
          <td key='-'>{d.TDA}</td>
          <td key='-'>{d.empleadoEntrega}</td>
          <td key='-'><Form.Select>{d.fecha.map(f => (<>
          <option>{f.fechaE}</option>
          
          </>))}</Form.Select></td>
          
          
          {d.productos.map(p => {

            return(<>
              
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


//liquidaciones

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
    console.log(mont)
    console.log(piez)
  
   
  }
const fetchdtaP = async (d) => {
    var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/liquidacion/`)
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
  useEffect(() => {
    fetchdtaP()
    fetchdta()
    fetchptda()
    setOn(true)
  }, [])
  

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
    {dta.map((d,index) => {
      console.log(d)

      
        return(
      
          <>
           
            <tr>
              <td key='-'>{index+1}</td>
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






 {On && (
   <><Accor/></>
 )}

    
   
  </>)
}
//remision
const CrearRemision = ({ user }) => {
  const [prdlen, setPrdlen] = useState(0);

  const Rcliente = () => {
    const [isLoading, setLoading] = useState(false);
    const [clientes, setClientes] = useState([{ nombreCliente: '', canal: '', productos: [] }]);
    const [isProducto, setIsProducto] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [producto, setProducto] = useState(null);
    const [canal, setCanal] = useState(null);

    const getClients = async () => {
      const res = await fetch(`${process.env.IP}/api/v1/cliente`);
      const dta = await res.json();
      const crdta = dta.data;
      console.log(crdta);
      setClientes(crdta);
    };

    useEffect(() => {
      getClients();
    }, []);

    let count = 1;

    const onChangeHandler = (e) => {
      setIsProducto(true);
      setProducto(e.target.value);
    };

    const onChangeHandlerCanal = (e) => {
      setCanal(e.target.value);
      setIsClient(true);
      setIsProducto(true);
    };

    return (
      <>
        <h2 className='text-center text-dark'>Datos</h2>
        <Form.Group className='mb-3' name='nombretienda'>
          <Form.Label className='text-dark'>Canal</Form.Label>
          <Form.Select onChange={onChangeHandlerCanal} id='canal'>
            <option>-</option>
            <option>Autoservicio</option>
            <option>Horeca</option>
          </Form.Select>
        </Form.Group>
        {isClient && (
          <>
            <Form.Group className='mb-3' name='nombretienda'>
              <Form.Label className='text-dark'>Nombre Cliente</Form.Label>
              <Form.Select onChange={onChangeHandler} id='nombreCliente'>
                <option>-</option>
                {clientes.map((t) => {
                  if (canal === t.canal) {
                    return <option key='-'>{t.nombreCliente}</option>;
                  }
                })}
              </Form.Select>
            </Form.Group>
          </>
        )}

        {isProducto && (
          <>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label className='text-dark'>Numero Remision</Form.Label>
              <Form.Control type='Text' placeholder='Remision' controlId='numero' id='numeroRemision' />
              <Form.Text className='text-muted'>Numero de remision</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='text-dark'>Fecha</Form.Label>
              <Form.Control type='date' placeholder='Fecha' controlId='fecha' id='fechaRemision' />
              <Form.Text className='text-muted'>Fecha Liquidacion</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='text-dark'>Folio Liquidación</Form.Label>
              <Form.Control type='text' placeholder='Folio Liquidacion' controlId='folio' id='folioLiquidacion' />
            </Form.Group>
            {clientes.map((p) => {
              setPrdlen(p.productos.length - 1);
              if (p.nombreCliente === producto) {
                return (
                  <>
                    <span className='text-dark'>RFC: </span>
                    <h5 id='rfc' className='text-dark'>
                      {p.razonSocial}
                    </h5>
                    <br />
                    <h2 className='text-center text-dark'>Productos</h2>
                    {p.productos.map((d) => {
                      return (
                        <>
                          {d != null ? (
                            <>
                              <Form.Group className='mb-3'>
                                <Form.Label className='text-dark' id={`prodn${count}`}>
                                  {d.nombre}
                                </Form.Label>
                                <Form.Control
                                  type='Text'
                                  placeholder='Cantidad'
                                  controlId='cantidad'
                                  id={`cantidad${d.nombre}`}
                                />
                                <Form.Text className='text-white' type='text' controlId='precio' id={`precio${d.nombre}`}>
                                  {p.precio}
                                </Form.Text>
                                <br />
                                <Form.Text className='text-white' controlId='codigoBarras' id={`codigoBarras${count}`}>
                                  {p.codigoBarras}
                                </Form.Text>
                              </Form.Group>
                              {count++}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                  </>
                );
              }
            })}
            <Button onClick={() => handleSubmit(clientes)}>Crear</Button>
          </>
        )}
      </>
    );
  };

  const [onClient, setOnClient] = useState(true);
  const [dataC, setDataC] = useState(null);

  const handleSubmit = async (c) => {
    // Stop the form from submitting and refreshing the page.
    let prod = [];

    // Get data from the form.
    var importe = 0;
    c.map((d) => {
      d.productos.map((p) => {
        if (p != null) {
          let preciof = parseFloat(p.precio).toFixed(2);
          let cantidadF = parseInt(document.getElementById(`cantidad${p.nombre}`).value);
          let result = preciof * cantidadF;

          prod.push({
            nombreProducto: p.nombre,
            cantidad: cantidadF,
            precioUnitario: preciof,
            codigoBarras: p.codigoBarras,
            importe: result,
          });
        }
      });
    });

    console.log(prod);

    let sub = lodash.sumBy(prod, (o) => {
      return parseFloat(o.importe);
    });

    console.log(sub);

    const data = {
      numeroRemision: document.getElementById('numeroRemision').value,
      rfc: document.getElementById('rfc').innerHTML,
      fechaRemision: document.getElementById('fechaRemision').value,
      folioLiquidacion: document.getElementById('folioLiquidacion').value,
      nombreCliente: document.getElementById('nombreCliente').value,
      productos: prod,
      subtotal: parseFloat(sub).toFixed(2),
    };

    console.log(data);

    setDataC(data);
    setOnClient(false);
  };

  const RenderPDF = ({ data }) => {
    const refpdf = React.useRef();

    return (
      <>
        <Row>
          <Col>
            <br />
            <div style={{ width: 720, height: 4500 }} ref={refpdf} className='mt-5'>
              <Pdf
                numero={data.numeroRemision}
                fecha={data.fechaRemision}
                cliente={data.nombreCliente}
                rfc={data.rfc}
                productos={data.productos}
                subtotal={data.subtotal}
              />
            </div>
          </Col>
          <Col>
            <ReactPDF targetRef={refpdf} filename={`remision${data.numeroRemision}.pdf`}>
              {({ toPdf }) => <Button onClick={toPdf} type='button'>Generate Pdf</Button>}
            </ReactPDF>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Form onSubmit={handleSubmit}>
            {onClient && <Rcliente />}
            {!onClient && <RenderPDF data={dataC} />}
          </Form>
        </Row>
      </Container>
    </>
  );
};
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
   <Button variant="primary" type="submit">
   Submit
 </Button>
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
     <Button variant="primary" type="submit">
       Submit
     </Button>
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
   <Button variant="primary"  onClick={handlesbmt}>
   Ver por Fecha
 </Button>

 <Button variant="primary"  onClick={handlesubmt} style={{marginLeft:5}}>
   Ver Todos
 </Button>
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
  
   


     <Button variant="primary" type="submit">
       Submit
     </Button>
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
   <Button variant="primary"  onClick={handlesbmt}>
   Ver por Fecha
 </Button>

 <Button variant="primary"  onClick={handlesubmt} style={{marginLeft:5}}>
   Ver Todos
 </Button>
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
      const [verAlmacen, setverAlmacen] = useState(false)
  return (
   <div style={{height: '160vh',
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
           
          </ListGroup>
          <VerProductosModal
      show={crearvisita}
      onHide={() => setcrearvisita(false)}
      body={<CrearVisita user={user}/>}
      title='Visita Promotoria'
    />
   
        </Col>
       
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
          <ListGroup.Item  className='bg-dark text-danger font-weight-bold'>Almacen</ListGroup.Item>
          <ListGroup.Item action variant="secondary" onClick={()=> setcrearpedido(true)} >
              Fabricante
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setverpedido(true)} variant="secondary">
            Consulta de Pedidos Promotoria
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> setverAlmacen(true)} variant="secondary">
            Ver productos en almacen
            </ListGroup.Item>          
          </ListGroup>
      <VerProductosModal
      show={crearpedido}
      onHide={() => setcrearpedido(false)}
      body={<Fabricante user={user}/>}
      title='Crear Pedido a Fabricante'
      />
       <VerProductosModal
      show={verAlmacen}
      onHide={() => setverAlmacen(false)}
      body={<Almacen user={user}/>}
      title='Almacen'
    />
          <VerProductosModal
      show={verpedido}
      onHide={() => setverpedido(false)}
      body={<VerPedidos user={user}/>}
      title='Ver Pedidos Promotoria'
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
