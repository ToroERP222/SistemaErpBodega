import React,{useState,useEffect} from 'react'
import {Card,Container,ListGroup,Row,Col,Modal,Button,Form,Table,Stack,Tab,Accordion,} from 'react-bootstrap'
import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'

export default function Fabricante() {
  const [pta, setpta] = useState([])
  const [prod, setprod] = useState([])
  const getProductos = async () => {
    const resp = await fetch(`${process.env.IP}:5000/api/v1/productos`)
    const dtajson = await resp.json() 
    const crdta = dtajson.data
    return setprod(crdta)
  }
const getPedidos = async () => {
    var result = [];
    const resp = await fetch(`${process.env.IP}:5000/api/v1/almacen/pedidoF`)
     const dtajson = await resp.json()
     const crdta = dtajson.data
     console.log(pta)    
      return setpta(crdta); 
}
useEffect(() => {
  getPedidos()
  getProductos()
}, [])
function FabricanteModal(props) {
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
const EditableCell = ({ value, row, col, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSaveClick = () => {
    setIsEditing(false);
    handleEdit(row, col, inputValue);
  };

  if (isEditing) {
    return (
      <td>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button variant="success" size="sm" onClick={handleSaveClick}>
          Guardar
        </Button>
      </td>
    );
  }

  return (
    <td onClick={() => setIsEditing(true)}>{value}</td>
  );
};

const VerPedidoF = () => {
  const prodIndices = {};
  prod.forEach((product, index) => {
    prodIndices[product.nombre] = index;
  });

  const quantities = new Array(prod.length);
  for (let i = 0; i < prod.length; i++) {
    quantities[i] = new Array(pta.length).fill(0);
  }

  for (let i = 0; i < pta.length; i++) {
    for (let j = 0; j < pta[i].productos.length; j++) {
      const productIndex = prodIndices[pta[i].productos[j].nombre];
      quantities[productIndex][i] = pta[i].productos[j].cantidad;
    }
  }

  const handleEdit = (row, col, value) => {
    const id = pta[row]._id;
    const updatedPta = [...pta];
    updatedPta[row].productos[col].cantidad = value;

    fetch(`${process.env.IP}:5000/api/v1/almacen/pedidoF/actualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPta[row])
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Fecha</th>
            {prod.map((product) => (
              <th key={product.nombre}>{product.nombre}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pta.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.fecha}</td>
              {row.productos.map((product, colIndex) => (
                <EditableCell
                  key={colIndex}
                  value={quantities[prodIndices[product.nombre]][rowIndex]}
                  row={rowIndex}
                  col={colIndex}
                  handleEdit={handleEdit}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
const [verPedidoF, setverPedidoF] = useState(false)
const MenuComponent = () => {
    return (
        <>
         <Container>
            <Row>
                <Col>
                <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title className={'text-dark '}>Pedidos</Card.Title>
        <Card.Text className={'text-dark '}>
        Ver Pedidos a Fabricante
        </Card.Text>
        <Button variant="danger" onClick={() => setverPedidoF(true)}>Ver</Button>
      </Card.Body>
    </Card>
                </Col>
                <Col>
                <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title className={'text-dark '}>Ver Estatus Almacen</Card.Title>
        <Card.Text className={'text-dark '}>
          Ver Estatus Almacen
        </Card.Text>
        <Button variant="danger">Ver</Button>
      </Card.Body>
    </Card>
                </Col>
            </Row>
         </Container>
         <FabricanteModal
          show={verPedidoF}
          onHide={() => setverPedidoF(false)}
          body={<VerPedidoF />}
          title='Pedido Fabricante'/>
        </>

    )
}
  return (
    <>
    <MenuComponent/>
    </>
  )
}
