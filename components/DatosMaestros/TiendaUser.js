
import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash, { set } from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
function VerProductosModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
export default function TiendaUser(user){ 
  const [tda, setda] = useState([])
  const [cliente, setcliente] = useState([])
  const fetchptda = async (d) => {
      var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/tienda`)
     const dtajson = await resp.json()
     const crdta = dtajson.data
     console.log(crdta)
      return setda(crdta);  
    }
    const fetchcl = async (d) => {
      var result = [];
    const resp = await fetch(`${process.env.IP}/api/v1/cliente`)
     const dtajson = await resp.json()
     const crdta = dtajson.data
     console.log(crdta)
      return setcliente(crdta);  
    }
    const [users, setusers] = useState([{role:'',nombre:''}])
    const getuser = async () => {
      const res = await fetch(`${process.env.IP}/api/v1/auth/users`)
      const dta = await res.json()
      const crdta = dta.data
     return setusers(crdta)
    }
  useEffect(() => {
    fetchptda()
    fetchcl()
    getuser()
   
  }, [])
  const [modal, setmodal] = useState(false)
  const [clienteactive, setclienteactive] = useState(null)
  const [activetienda, setactivetienda] = useState(false)
  const [getcanal, setgetcanal] = useState(null)
  const [activecanal, setactivecanal] = useState(false)
  const [activeruta, setactiveruta] = useState(false)
  const [ruta, setRuta] = useState({promotoria:[],entrega:[],tda:null,id:null})
  const [activarEdicionE, setactivarEdicionE] = useState(false)
  const [counterE, setcounterE] = useState(0)
  const [counter, setcounter] = useState(0)
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activarEdicionP, setactivarEdicionP] = useState(false)
  const EditTienda = () => {
    return(<>
    <Form>
          <Form.Group controlId="formNombre">
            <Form.Label  className='text-dark my-2'> Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre"
              
              id='nombre'
            />
          </Form.Group>
  
          <Form.Group controlId="formCargo">
            <Form.Label className='text-dark my-2'>TDA</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese tda"
              id='tda'
              
            />
          </Form.Group>
          
          <Form.Group controlId="formCargo">
            <Form.Label className='text-dark my-2'>Empleado encargado entrega</Form.Label>
           <Form.Select id='empleadoE'>
            <option>-</option>
            {users.map(u => <>
            <option>{u.nombre}</option>
            </>)}
           </Form.Select>
          </Form.Group>
          <Form.Group controlId="formCargo">
            <Form.Label className='text-dark my-2'>Empleado encargado promotoria</Form.Label>
           <Form.Select id='empleadoP'>
            <option>-</option>
            {users.map(u => <>
            <option>{u.nombre}</option>
            </>)}
           </Form.Select>
          </Form.Group>
  
        <div className='my-3'>
        <Button variant="secondary" onClick={handleCloseUpdateModal}>
          Cerrar
        </Button>
        <Button variant="primary" onC  className=' mx-2' onClick={handleUpdateTienda}>
          Guardar cambios
        </Button>
        </div>
        </Form>
    </>)
    }
  
  var days  = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];



  const [tienda, settienda] = useState({_id:"",nombre:"",TDA:""});

  const handleShowUpdateModal = (tienda) => {
    setShowUpdateModal(true);
    settienda(tienda);
  };
  const deleteTienda = async (tiendas) => {
    const response = await axios.delete(`${process.env.IP}/api/v1/tienda/eliminar/${tiendas._id}`)
   console.log(response)
  }
  const handleUpdateTienda = (e) => {
const  tda = document.getElementById('tda').value
const nombre  = document.getElementById('nombre').value
const empleadoE  = document.getElementById('empleadoE').value
const empleadoP  = document.getElementById('empleadoP').value

   
  fetch(`${process.env.IP}/api/v1/tienda/${tienda._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombreTienda: nombre,
      TDA: tda,
      empleadoPromotoria: empleadoP,
      empleadoEntrega: empleadoE
    }),
  })
    .then((response) => response.json())
   }

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    settienda(null)
  };


  const RutasE = () =>{
    const components = [];
    
    const addday = () => {
      setcounterE(counterE + 1);
      var num = counterE
      const newComponent = <TableDay dia={1} number={num} />;
      components.push(newComponent);
    }
    const TableDay = (props) =>{

      return(<>
     
        {(activarEdicionE) ?<>
        <td><Form.Select id={`diaE${props.number}`}>
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miercoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
          <option>Sabado</option>
          <option>Domingo</option>
          </Form.Select></td>
        </> :<td>{days[props.dia]}</td>}
        </>)
      
    }
    const handledays = () => {
      if(counterE === ruta.entrega.length || counterE === 0|| counterE >6){
        setcounterE(ruta.entrega.length)
      }
     
    let daysE = [ruta.entrega.map(e => e.dia)]
    console.log(daysE)
      
      for (let i = 0; i < counterE; i++) {
        
        components.push(<TableDay dia={daysE[0][i]} number={i}/> );
      }
      return components
      
    }
    const ParentComponent = () => {
      useEffect(() => {
        
      
        
      }, [counterE])
      
      return(<>
      {console.log(counterE)}
      {handledays()
      
      }
      </>)
    }
const handlesubmit = () => {
  var data= {
      diaE:[]
    }
  for (let index = 0; index < counterE; index++) {
    console.log(document.getElementById(`diaE${index}`).value)
    data.diaE.push({dia:days.indexOf(document.getElementById(`diaE${index}`).value)})
    
    
  }
  console.log(data)
  axios.put(`${process.env.IP}/api/v1/tienda/diaE/${ruta.id}`,data )
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
 
  
}
    return(
      <>
      {activeruta && (<>
        <Table striped bordered hover responsive>
     <thead>
      <tr>  
      {ruta.entrega.map(e => {
        return(<>
        <th>Dia entrega</th>     
        </>)
      })}
      
      </tr>
    </thead>      
      <tbody>
      <tr >
     <ParentComponent/>
    
      {activarEdicionE ?<><td><Button onClick={handlesubmit}>Actualizar</Button></td><td><Button onClick={() => {setactivarEdicionE(false);setcounterE(ruta.entrega.length)}}>Regresar</Button></td><td><Button onClick={() => addday()}>Agregar dia</Button></td><td><Button onClick={() => {components.pop();setcounterE(counterE-1)}}>eliminar dia</Button></td></>:<td><Button onClick={() => setactivarEdicionE(true)}>editar</Button></td> }
        </tr>
  </tbody>
         </Table>
      </>)}  
      </>
    )
  }

  const RutasP = () =>{
    const components = [];
    
    const addday = () => {
      setcounter(counter + 1);
      var num = counter
      const newComponent = <TableDay dia={1} number={num} />;
      components.push(newComponent);
    }
    const TableDay = (props) =>{

      return(<>
     
        {(activarEdicionP) ?<>
        <td><Form.Select id={`diaP${props.number}`}>
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miercoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
          <option>Sabado</option>
          <option>Domingo</option>
          </Form.Select></td>
        </> :<td>{days[props.dia]}</td>}
        </>)
      
    }
    const handledays = () => {
      if(counter === ruta.promotoria.length || counter === 0|| counter >6){
        setcounter(ruta.promotoria.length)
      }
     
    let daysP = [ruta.promotoria.map(e => e.dia)]
    console.log(daysP)
      
      for (let i = 0; i < counter; i++) {
        
        components.push(<TableDay dia={daysP[0][i]} number={i}/> );
      }
      return components
      
    }
    const ParentComponent = () => {
      useEffect(() => {
        
      
        
      }, [counter])
      
      return(<>
      {console.log(counter)}
      {handledays()
      
      }
      </>)
    }
const handlesubmit = () => {
  var data= {
      diaP:[]
    }
  for (let index = 0; index < counter; index++) {
    console.log(document.getElementById(`diaP${index}`).value)
    data.diaP.push({dia:days.indexOf(document.getElementById(`diaP${index}`).value)})
    
    
  }
  console.log(data)
  axios.put(`${process.env.IP}/api/v1/tienda/diaP/${ruta.id}`,data )
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });



}



    return(
      <>
      {activeruta && (<>
        <Table striped bordered hover responsive>
     <thead>
      <tr>  
      {ruta.promotoria.map(e => {
        return(<>
        <th>Dia Promotoria</th>     
        </>)
      })}
      
      </tr>
    </thead>      
      <tbody>
      <tr >
     <ParentComponent/>
    
      {activarEdicionP ?<><td><Button onClick={handlesubmit}>Actualizar</Button></td><td><Button onClick={() => {setactivarEdicionP(false);setcounter(ruta.promotoria.length)}}>Regresar</Button></td><td><Button onClick={() => addday()}>Agregar dia</Button></td><td><Button onClick={() => {components.pop();setcounter(counter-1)}}>eliminar dia</Button></td></>:<td><Button onClick={() => setactivarEdicionP(true)}>editar</Button></td> }
        </tr>
  </tbody>
         </Table>
      </>)}  
      </>
    )
  }
  const handlecliente = (e) => {
    console.log(e.target.value)
    setclienteactive(e.target.value)
    setactivetienda(true)

  }
  const handlecanal = (e) => {
    setgetcanal(e.target.value)
    setactivecanal(true)
    setactivetienda(false)
  }
  const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
    return(<>
    <Form >
    <Form.Group className="mb-3" >
    <Form.Label className='text-dark'>Canal</Form.Label>
      <Form.Select onChange={handlecanal} >
        <option>-</option>
        <option>Autoservicio</option>
        <option>Horeca</option>
      </Form.Select>
      </Form.Group>
     {activecanal && (<>
      <Form.Group className="mb-3" >
      <Form.Label className='text-dark'>Nombre Cliente</Form.Label>
      <Form.Select onChange={handlecliente} >
      <option>-</option>
        {cliente.map(c => {
          return(<>
          
          {getcanal === c.canal && (<>
         
            <option>{c.nombreCliente}</option>
          </>)}
          </>)
        })}
      </Form.Select>
      </Form.Group>
     </>)}
     <br/>
    {activetienda && (<>
      <div><Table striped bordered hover responsive><thead>
      <tr>  
        <th>Nombre Tienda</th>
        <th>TDA</th>
        <th>canal</th>
        <th>Empleado encargado de Entregas</th>
        <th>Empleado encargado de Promotoria</th>
        <th>Ver Ruta/Promotoria</th>
        <th>Editar</th>
        <th>Eliminar</th>
      </tr>
    </thead>
    <tbody>
      {tda.map(d => {
        return(<>
        {clienteactive === d.nombreCliente && (
          <>
          <tr >
            <td key={d.nombreTienda}>{d.nombreTienda}</td>
            <td key={d.TDA}>{d.TDA}</td>
            <td key={d.canal}>{d.canal}</td>
            <td key={d.empleadoEntrega}>{d.empleadoEntrega}</td>
            <td key={d.empleadoPromotoria}>{d.empleadoPromotoria}</td>
            <td><Button onClick={()=> {setactiveruta(true); setRuta({promotoria:d.diaP,entrega:d.diaE,tda:d.TDA,id:d._id});setmodal(true)}}>Ver Entrega</Button></td>
            <td><Button onClick={() => handleShowUpdateModal(d)}>Editar</Button></td>
            <td><Button onClick={() => deleteTienda(d)}>Elminar</Button></td>
          </tr>
          </>
      )}
        </>)      
    })}
      </tbody>
      </Table>
      </div>
    </>)}
    <VerProductosModal
      show={modal}
      onHide={() => setmodal(false)}
      body={<><RutasE/><RutasP/></>}
      title={ruta.tda}
    />
        <VerProductosModal
      show={showUpdateModal}
      onHide={handleCloseUpdateModal}
      body={<><EditTienda/></>}
      
    />
     </Form>

     
    </>)
    
}