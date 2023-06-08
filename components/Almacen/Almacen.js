import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Card,Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion,} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

export default function Almacen() {
  const [pta, setpta] = useState([])
  const [prodlen, setprodlen] = useState(0)

const fetchptda = async (d) => {
  var result = [];
const resp = await fetch(`${process.env.IP}:5000/api/v1/productos`)
 const dtajson = await resp.json()
 const crdta = dtajson.data
 setprodlen(crdta.length)
 
  return setpta(crdta); 
 
 

}
const [dta, setdta] = useState([])
const [sumapr, setsumapr] = useState([])
const handleAgregar = async (p) => {
var can = document.getElementById(`cantidad${p.nombre}`).value
var data = {
  cantidadAlmacen: can
}
const res = await axios.put(`${process.env.IP}:5000/api/v1/productos/actualizarAlmacen/${p._id}`,data)
console.log(res)
}
const fetchdtaH= async () => {
  var result = [];
  const resp = await fetch(`${process.env.IP}:5000/api/v1/almacen/pedido/`)
  const dtajson = await resp.json()
  const crdta = dtajson.data
  


    setdta(crdta); 
    var productosTotal= []

  dta.map(d => {
    if(d.estatus=== 'pendiente'){
      d.productos.map(p => {
        productosTotal.push(p)
      })
    }
 
      })
    console.log(productosTotal)
    
    const sum = productosTotal.reduce((acc, curr) => {
      let existing = acc.find(item => item.nombre === curr.nombre);
      if (!existing) {
        acc.push({nombre: curr.nombre, numero: curr.numero || 0});
      } else {
        existing.numero += curr.numero || 0;
      }
      return acc;
    }, []);
    console.log(sum)
   setsumapr(sum)
   
  }

useEffect(() => {
  
  fetchptda()
   
}, [])

const [activePedido, setactivePedido] = useState([])
const [image, setimage] = useState(null)

const PedidoFabricante =  () => {
  let prod = []
  const handlesubmit = async(d) => {
    console.log(document.getElementById(`cantidad1`).value)
    d.map( (p,index) => {
      
      prod.push({nombre:p.nombre,cantidad:Number(document.getElementById(`cantidad${index}`).value)})
    })
    let data = {
      fecha:document.getElementById('fecha').value,
      productos:prod
    }
    console.log(data)
    const resp = await axios.post(`${process.env.IP}:5000/api/v1/almacen/pedidoF/crear`,data)
  }
  return(
    <>
        <div>
        <Form.Group controlId="fecha">
        <Form.Label className='text-dark h2 m-2'>Fecha</Form.Label>
        <Form.Control type="date" id="fecha"   required />
      </Form.Group>
          <h1 className='text-danger  container d-flex justify-content-center my-1'>Pedido</h1>
           {pta.map((d,index)=>{
             
               return(<>
                <br/>
               <Form.Group className="mb-3">
                    <Form.Label className='text-dark h2 container d-flex justify-content-center mt-1' id= {`${d.nombre}`}>{d.nombre}</Form.Label>
                    <br/>
                    <Form.Label className='text-dark container d-flex justify-content-center mt-2'>Cantidad a pedir al fabricante</Form.Label>
                    <Form.Control  placeholder='Pedido' id={`cantidad${index}`} />
                   
              </Form.Group>

              
               </>)
               
           })}
           <Button variant='dark' className='text-danger  container d-flex justify-content-center mt-1' onClick={() => handlesubmit(pta)}>Crear Pedido</Button>
        </div>
    </>
)
}
const Revision= () => {
  const [formDataB, setFormDataB] = useState({
    fecha: '',
    productos: [{nombre:'',img:''}]
  });
let namesP = [{nombre:'',img:''}]
  const handleSubmit =  async  (event,index,) => {
    event.preventDefault();
    const formData = new FormData()
    console.log(formDataB)
    

    const data = {
      fecha: event.target.fecha.value,
      
    }
    
    formData.append('fecha',data.fecha)
    formDataB.productos.forEach((producto, index) => {
      formData.append('nombre', producto.nombre);
      formData.append('img', producto.img);
    });
 console.log(formData.getAll('img'))
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
   const resp = await axios.post(`${process.env.IP}:5000/api/v1/almacen/estatusA/crear`,formData,config)
   
     
  };
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
  
    if (name === 'nombre') {
      const nuevosProductos = [...formDataB.productos];
      nuevosProductos[index] = {
        ...nuevosProductos[index],
        [name]: value
      };
      setFormDataB({
        ...formDataB,
        productos:nuevosProductos
      });
    } else if (name === 'img') {
      const nuevosProductos = [...formDataB.productos];
      const nombre = pta[index].nombre;
      nuevosProductos[index] = {
        nombre: nombre,
        img: event.target.files[0]
      };
      setFormDataB({
        ...formDataB,
        productos: nuevosProductos
      });
  
    
    } else {
      setFormDataB({
        ...formDataB,
        [name]: value
      });
    }
    console.log(formDataB)
  };
  

  return(
    <>
       <Form onSubmit={handleSubmit}>
      <Form.Group controlId="fecha">
        <Form.Label className='text-dark h2 m-2'>Fecha</Form.Label>
        <Form.Control type="date" name="fecha" value={formDataB.fecha} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label className='text-dark h2 m-2'>Productos</Form.Label>
        <br/>
        {pta.map((producto, index) => (
          <>
        <br/>
          <Form.Label className='text-dark h6 m-2 mb-3' name="nombre" onChange={(event) => handleInputChange(event, index)}>{producto.nombre}</Form.Label>
          
              <Form.Control className='m-4' type="file" name="img" label="Imagen del producto" onChange={(event) => handleInputChange(event, index)}  />
          
          
          </>
        ))}
      </Form.Group>

      <Button type="submit" variant="dark" className='text-danger  container d-flex justify-content-center mt-1'>Enviar</Button>
    </Form>
    </>
)
}
function PedidoFabricanteModal(props) {
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
const agregarAlmacen = (p) =>  {
  const date = new Date()
const query = document.getElementById( `cantidad${p.nombre}`).value
console.log(date)

}
let count = 1;
const [verpedido, setverpedido] = useState(false)
const [verRevision, setverRevision] = useState(false)
  return (
    <>
   <div className= 'container d-flex justify-content-center mt-4 '>

   <tr >
    <td className= 'm-3 p-3'><Button variant="primary" onClick={fetchdtaH}>Pedidos Promotoria</Button></td>

    <td className= 'm-3 p-3'><Button variant="primary" onClick={() => setverpedido(true)} >Crear Pedido Fabricante</Button></td>
    <td className= 'm-3 p-3'><Button variant="primary" onClick={() => setverRevision(true)} >Revision Almacen </Button></td>
 
    </tr>
   </div>
    <div className={'m-5'}>
      <Row>
    {pta.map(p => {
      return(<>
      <Col>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={p.img} />
      <Card.Body>

        <Card.Title className= 'text-dark'>{p.nombre}</Card.Title>
        <p className='text-dark h6'>Piezas en Almacen: {p.cantidadAlmacen}</p>
        {console.log(sumapr)}
        {sumapr.map(d => {
          console.log(p)
          if(d.nombre === p.nombre){
            return(
        <Card.Text className={'text-dark'}>
          Pedidos en Promotoria: {d.numero} piezas
        </Card.Text>

            )
          }
        })}
       
<tr>
  <td><Form.Control  type="Text" id={`cantidad${p.nombre}`} placeholder='Cantidad' /> </td>
</tr>
<td><Button variant='success' onClick={() => handleAgregar(p)} className='mt-2'> Actualizar cantidad</Button></td>

      </Card.Body>
    </Card>
    </Col>
    {count= count+1}
      </>)
    })}
        <PedidoFabricanteModal
      show={verpedido}
      onHide={() => setverpedido(false)}
      body={<PedidoFabricante />}
      title='Pedido a fabricante'
    />
        <PedidoFabricanteModal
      show={verRevision}
      onHide={() => setverRevision(false)}
      body={<Revision />}
      title='Revision Almacen'
    />
    </Row>

    </div>
    </>
  )

}
