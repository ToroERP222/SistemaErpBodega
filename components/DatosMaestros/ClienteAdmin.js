import React,{useState,useEffect,useRef} from 'react'
import Navb from '../Navb'
import {Alert,Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion} from 'react-bootstrap'
import lodash from 'lodash'
import Pdf from '../TestComponents/Pdf'
import ReactPDF from 'react-to-pdf'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
import useSWR from 'swr';
const fetcherCliente = (url) => fetch(url).then((res) => res.json()); // SWR fetcher function for cliente API
const fetcherProducts = (url) => axios.get(url).then((res) => res.data); // SWR fetcher function for productos API
export default function ClienteAdmin(user) {

  const { data: cli, error: cliError } = useSWR(`${process.env.IP}/api/v1/cliente`, fetcherCliente); // Use the SWR hook for cliente
  const { data: products, error: productsError } = useSWR(`${process.env.IP}/api/v1/productos`, fetcherProducts); // Use the SWR hook for productos

  
    const [selectedClient, setSelectedClient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedValues, setUpdatedValues] = useState({
      clave: '',
      canal: '',
      nombreCliente: '',
      razonSocial: ''
    });
    const [updatedProducts, setUpdatedProducts] = useState([]);
  
  
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
   
    const [getcanal, setgetcanal] = useState(null)
    const [activeInfo, setactiveInfo] = useState(false)
     const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleProductPriceChange = (index, e) => {
    const { value } = e.target;
    setUpdatedProducts((prevProducts) => {
      const updated = [...prevProducts];
      updated[index].precio = value;
      return updated;
    });
  };

  const handleEdit = (d) => {
    setSelectedClient(d);
    setUpdatedValues({
      clave: d.clave,
      canal: d.canal,
      nombreCliente: d.nombreCliente,
      razonSocial: d.razonSocial
    });
    setUpdatedProducts([...d.productos]);
    setShowModal(true);
  };

  const handleUpdate = () => {
    const updatedClient = {
      ...selectedClient,
      clave: updatedValues.clave,
      canal: updatedValues.canal,
      nombreCliente: updatedValues.nombreCliente,
      razonSocial: updatedValues.razonSocial,
      productos: updatedProducts
    };

    axios
      .put(`${process.env.IP}/api/v1/cliente/actualizar/${updatedClient._id}`, updatedClient)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setSelectedClient(null);
        setUpdatedValues({
          clave: '',
          canal: '',
          nombreCliente: '',
          razonSocial: ''
        });
        setUpdatedProducts([]);
        fetchClients();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEliminar = async (d) => {
    try {
      const res = await axios.delete(`${process.env.IP}/api/v1/cliente/eliminar/${d._id}`);
      console.log(res);
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };
    const handlecanal = (e) => {

      setgetcanal(e.target.value)
      setactiveInfo(true)

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
    <> <div><Table striped bordered hover><thead>
        <tr>  
          
          <th>Clave</th>
          <th>Canal</th>
          <th>Nombre Cliente</th>
          <th>Razon Social</th>
          {products.data.map(p => (<>
          <th>{p.nombre}</th>
          </>))}
      
        </tr>
      </thead>
      <tbody>
        {cli.data.map(d => {
            return(
          <>
          {getcanal === d.canal && (
            <>
             <tr key='1'>
                        
                        <td >  <p  >{d.clave} </p></td>
                        <td key={d.canal}> <p >{d.canal} </p></td>              
                        <td key={d.canal}><p >{d.nombreCliente} </p></td>
                        <td key={d.canal}> <p >{d.razonSocial} </p></td>   
                        {d.productos.map(p => (<>
                      {p.precio && (<>
                      {products.data.map(prod => (<>
                      {p.nombre === prod.nombre && (<>
                        <td>${p.precio}</td>
                      </>)}
                      </>))}
                       
                      </>)}
                        </>))} 
 <td>
                <Button variant="primary" onClick={() => handleEdit(d)}>
                  Editar
                </Button>{' '}
                
              </td>
              <td><Button variant="danger" onClick={() => handleEliminar(d)}>
                  Eliminar
                </Button></td>
                      </tr>
            </>
          )}
             
        
          </>
        )
      })}
        </tbody>
        </Table>
        </div></>
      
  </>)}
      
      
       </Form>
       
       <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='bg-dark text-white'>
          <Modal.Title>{updatedValues.nombreCliente}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Clave</Form.Label>
              <Form.Control
                type="text"
                name="clave"
                value={updatedValues.clave}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Canal</Form.Label>
              <Form.Control
                type="text"
                name="canal"
                value={updatedValues.canal}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre Cliente</Form.Label>
              <Form.Control
                type="text"
                name="nombreCliente"
                value={updatedValues.nombreCliente}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Razon Social</Form.Label>
              <Form.Control
                type="text"
                name="razonSocial"
                value={updatedValues.razonSocial}
                onChange={handleInputChange}
              />
            </Form.Group>

            <h4>Products:</h4>
            {updatedProducts.map((product, index) => (
              <Form.Group key={product._id}>
                <Form.Label>{product.nombre}</Form.Label>
                <Form.Control
                  type="number"
                  value={product.precio}
                  onChange={(e) => handleProductPriceChange(index, e)}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            actualizar
          </Button>
        </Modal.Footer>
      </Modal>
      </>)
  }
