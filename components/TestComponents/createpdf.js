import React,{useState,useEffect} from 'react'
import ReactPDF from 'react-to-pdf'
import Pdf from './Pdf'
import Link from 'next/link'
import axios from 'axios'
import lodash from 'lodash'
import {Container,Col,Row,Modal,ListGroup,Button,Form} from 'react-bootstrap'


const CrearRemision = ({user}) =>{  
  const [prdlen, setPrdlen] = useState(0)
  const Renderon = () => {
    const [isLoading, setLoading] = useState(false)
    const [tienda, setTienda] = useState(null)
    fetch(`${process.env.IP}:5000/api/v1/cliente `)
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
    fetch(`${process.env.IP}:5000/api/v1/cliente `)
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

                  return(<option key='-' >{t.nombreCliente}</option>)
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
  for (let index = 1; index <= prdlen; index++) {
 console.log(index)
    var value = document.getElementById(`prodn${index}`).innerHTML

    console.log(value)
     prod.push({nombreProducto:value,cantidad:parseInt(document.getElementById(`cantidad${index}`).value),precioUnitario:parseInt(document.getElementById(`precio${index}`).innerHTML),codigoBarras:document.getElementById(`codigoBarras${index}`).innerHTML})
   

    
  
    
    
    
    
    
  }
  console.log(prod)

  
  const data = {
    numeroRemision:document.getElementById('numeroRemision').value,
    rfc:document.getElementById('rfc').innerHTML,
    fechaRemision:document.getElementById('fechaRemision').value,
    folioLiquidacion:document.getElementById('folioLiquidacion').value,
    nombreCliente:document.getElementById('nombreCliente').value,
    productos: prod
    
}


  console.log(data)


  setdataC(data)
  //const resp = await axios.post(`${process.env.IP}:5000/api/v1/remision/crear`,data)
  
  
  
  return setonClient(false)

}
const RenderPDF = ({data}) => {
  return(<>

  
    <div style={{width: 720, height:1080 }} ref={refpdf}>
        <Pdf  
        numero={data.numeroRemision}
        fecha={data.fechaRemision}
        cliente={data.nombreCliente}
        rfc={data.rfc}
        productos={data.productos}
         
        />
    </div>
    <ReactPDF targetRef={refpdf} filename="remision.pdf">
      {({ toPdf }) => <Button onClick={toPdf} type='button'>Generate Pdf</Button>}
  </ReactPDF>
    </>)
}
const refpdf = React.useRef()

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
const crearpdf = (props) => {
  const refpdf = React.createRef()
  const prod = [{codigoBarras:'8888', cantidad:1,nombreProducto:'yeah',precioUnitario:300},{codigoBarras:'7777', cantidad:3,nombreProducto:'yeah2',precioUnitario:200}]
return (
  <>
  
  
  </>
)
}






export default function Createpdf() {
  function ViewModal(props) {
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
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [crearRemision,setcrearRemision] = useState(false)

  return (
    <>
    <Container className='text-center' >
      <Row>
        {/*datos maestros*/}
        <Col sm={4} md={4}className='mb-3' style={{fontFamily:'tahoma',fontWeight:'bold',fontSize:'1.1rem'}}>
          <ListGroup>
          <ListGroup.Item className='bg-dark text-danger font-weight-bold'>Datos Maestros</ListGroup.Item>
            <ListGroup.Item action onClick={()=> setcrearRemision(true)} variant="secondary">
              Crear Remision
            </ListGroup.Item>
            </ListGroup> 
          </Col>
          <ViewModal
          show={crearRemision}
          onHide={() => setcrearRemision(false)}
          body={<CrearRemision />}
          title='Remision'
          />
          </Row>
          </Container>
    </>
  )
 
}
