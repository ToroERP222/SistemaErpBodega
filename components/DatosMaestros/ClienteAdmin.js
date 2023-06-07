import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Alert,Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

export default function ClienteAdmin(user) {
    const [cli, setcli] = useState([])
    const fetchptda = async (d) => {
      const resp = await fetch(`http://${process.env.IP}:5000/api/v1/cliente`)
       const dtajson = await resp.json()
       const crdta = dtajson.data
       console.log()
        return setcli(crdta);  
      }
      
     useEffect(() => {
       
     fetchptda()
       
     }, [])
     
     const [editors, setEditors] = useState({
      editor1: false,
      editor2: false,
      editor3: false,
      editor4: false
    });
    const [activebutton, setActiveButton] = useState(false);
    const [activeEdition, setactiveEdition] = useState(false)
    const claveInput = useRef();
    const canalInput = useRef();
    const nombreClienteInput = useRef();
    const razonSocialInput = useRef();
  
    function handleUpdate(editor) {
      setEditors({ ...editors, [editor]: true });
      setActiveButton(true);
     
    }
    function checkEmptyInput(data) {
        const value = data
        if (value.trim() === '') {
          console.log('Input is empty');
          return true
        } else {
          console.log('Input is not empty');
          return false
        }
    }
    const [show, setShow] = useState(false);
    const AlertInput = () => {
        return(<>
            <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p>
            Ingresa  todos los campos
              
            </p>
          </Alert>
            </>)
    }
    const updateClient = (e) => {
       
      var clv;
      var cnl;
      var nmbrClnt;
      var rznScl;
      clv = e.clave
      cnl = e.canal
      nmbrClnt = e.nombreCliente
      rznScl = e.razonSocial
      console.log(e)
      if (editors.editor2) {
        const value = document.getElementById(e.clave).value
       if(checkEmptyInput(value) === true){
            return setShow(true)
       
       }
         clv = document.getElementById(e.clave).value
         
      } if(editors.editor){
        const value2 = document.getElementById(e.canal).value
        if(checkEmptyInput(value2) === true){
           return setShow(true)
        }
         cnl = document.getElementById(value2).value
       
      } if(editors.editor3){
        const value3 = document.getElementById(e.nombreCliente).value
        console.log(value3)
        if(checkEmptyInput(value3) === true){
           return setShow(true)
        }
         nmbrClnt = document.getElementById(e.nombreCliente).value
         
      }if(editors.editor4){
         
         rznScl = document.getElementById(e.razonSocial).value
      }
      console.log(nmbrClnt)
  
      var data = {
        clave: clv,
        canal: cnl,
       nombreCliente: nmbrClnt,
       razonSocial: rznScl
        
      }
      
    
      axios.put(`http://${process.env.IP}:5000/api/v1/cliente/actualizar/${e._id}`,data )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });


      setEditors({
        editor1: false,
        editor2: false,
        editor3: false,
        editor4: false
      })
      
        fetchptda()
      
        
    
      
      
    }
    const [getcanal, setgetcanal] = useState(null)
    const [activeInfo, setactiveInfo] = useState(false)
    const handlecanal = (e) => {

      setgetcanal(e.target.value)
      setactiveInfo(true)

    }
    const handleEliminar = async (d) => {
     const res = await axios.delete(`http://${process.env.IP}:5000/api/v1/cliente/eliminar/${d._id}`)
     console.log(res)
    }
  
      return(<>
      <Form  >
        <Form.Group>
        <Form.Label className='text-dark'>Canal</Form.Label>
        <Form.Select onChange={handlecanal}>
          <option>-</option>
          <option>Autoservicio</option>
          <option>HORECA</option>
        </Form.Select>

        </Form.Group>
  {activeInfo && (<>
    <div className='m-3'> 
       {(!activeEdition) && (<> <td> <Button onClick={()=> setactiveEdition(true)}>Editar</Button></td></>)}
       {(activeEdition) && (<><td> <Button onClick={()=> setactiveEdition(false)}>Regresar</Button></td></>)}
       </div>
        {(activeEdition) ? <div><Table striped bordered hover><thead>
        <tr>  
          
          <th>Clave</th>
          <th>Canal</th>
          <th>Nombre Cliente</th>
          <th>Razon Social</th>
  
        </tr>
      </thead>
      <tbody>
        {cli.map(d => {
            return(
          <>
             {getcanal === d.canal && (<>
              <tr key='1'>
                        
            <td onClick={()=>handleUpdate('editor2')}  key={d.clave}>{ (editors.editor2) ? <Form.Control  id={d.clave} placeholder={d.clave}/>  : <p  >{d.clave} </p>}</td>
            <td onClick={()=>handleUpdate('editor1')}  key={d.canal}>{ (editors.editor1) ? <Form.Select  id={d.canal} ><option>Autoservicio</option><option>Horeca</option></Form.Select>  : <p  >{d.canal} </p>}</td>
  
            <td onClick={() => handleUpdate('editor3')}  key={d.canal}>{ (editors.editor3) ? <Form.Control  id={d.nombreCliente} placeholder={d.nombreCliente}/>  : <p  >{d.nombreCliente} </p>}</td>
            <td onClick={()=>handleUpdate('editor4')}  key={d.canal}>{ (editors.editor4) ? <Form.Control  id={d.razonSocial} placeholder={d.razonSocial} />  : <p  >{d.razonSocial} </p>}</td>
  
              
          {(activebutton) ? <><td><Button  variant="outline-primary" onClick={()  => updateClient(d)}>Actualizar</Button> </td></>:  ""}
          <td><Button variant='danger' onClick={() =>handleEliminar(d)}>Eliminar</Button></td>
          </tr>
             </>)}
        
          </>
        )
      })}
        </tbody>
        </Table>
        </div> :<> <div><Table striped bordered hover><thead>
        <tr>  
          
          <th>Clave</th>
          <th>Canal</th>
          <th>Nombre Cliente</th>
          <th>Razon Social</th>
  
        </tr>
      </thead>
      <tbody>
        {cli.map(d => {
            return(
          <>
          {getcanal === d.canal && (
            <>
             <tr key='1'>
                        
                        <td >  <p  >{d.clave} </p></td>
                        <td key={d.canal}> <p  >{d.canal} </p></td>
              
                        <td   key={d.canal}><p  >{d.nombreCliente} </p></td>
                        <td key={d.canal}> <p  >{d.razonSocial} </p></td>
              
                          
                       
                      </tr>
            </>
          )}
             
        
          </>
        )
      })}
        </tbody>
        </Table>
        </div></>}
  </>)}
      
      
       </Form>
       
    <AlertInput/>
      </>)
  }
