import React, { useState, useEffect } from 'react';
import { Form, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Image from 'next/image';
import Router from 'next/router';

export default function ProductosUser(user) {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedProduct, setEditedProduct] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`${process.env.IP}/api/v1/productos`);
      setProducts(resp.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClients = async () => {
    try {
      const resp = await axios.get(`${process.env.IP}/api/v1/cliente`);
      setClients(resp.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchClients();
    if (submitted) {
      alert('Informacion Agregada');
      setSubmitted(false);
    }
  }, [submitted]);

  const handleEditClick = (product, index) => {
    setEditIndex(index);
    setEditedProduct(product);
  };
const handleDelete = () => {
  
}
  const handleEditInputChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };
  const [img, setimg] = useState(null)
const handleImage = (e) => {
  console.log(e.target.files)
  setimg(e.target.files[0])
}
const handleSaveClick = async () => {
  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(editedProduct)) {
      formData.append(key, value);
    }
    formData.append('img', img);
    await axios.put(`${process.env.IP}/api/v1/productos/actualizar/${editedProduct._id}`, formData);
    setEditIndex(-1);
    setEditedProduct({});
    setimg(null);
    fetchProducts();
  } catch (err) {
    console.error(err);
  }
  setSubmitted(true);

};


  const handleCancelClick = () => {
    setEditIndex(-1);
    setEditedProduct({});
  };

  return (
    <>
      <Form>
        <div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre Producto</th>
                <th>Codigo de Barras</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const isEditing = index === editIndex;
                return (
                  <tr key={product._id}>
                    <td>
                      {isEditing ? (
                        <Form.Control type="text" name="nombre" value={editedProduct.nombre} onChange={handleEditInputChange} />
                      ) : (
                        product.nombre
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <Form.Control type="text" name="codigoBarras" value={editedProduct.codigoBarras} onChange={handleEditInputChange} />
                      ) : (
                        product.codigoBarras
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <Form.Control type="text" name="descripcion" value={editedProduct.descripcion} onChange={handleEditInputChange} />
                      ) : (
                        product.descripcion
                      )}
                    </td>
                    <td className="text-center">
                      {isEditing ? (
                       <Form.Control className='m-4' type="file" name="img" label="Imagen del producto" onChange={handleImage}  />
                      ): ( <img
                        src={product.img}
                        alt="Picture of the author"
                        width={60}
                        height={233}
        /> )}
                   
                    </td>
                    <td>
                      {isEditing ? (
                        <>
                          <Button variant="success" onClick={handleSaveClick}>
                            Guardar
                          </Button>
                          <Button variant="secondary" onClick={handleCancelClick}>
                            Cancel
                            </Button>
                            <Button variant="danger" onClick={() => setEditIndex(-1)}>
                        Borrar
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => handleEditClick(product, index)}>
                      Editar
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  </Form>
</>
);
}
