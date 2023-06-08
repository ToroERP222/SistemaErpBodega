import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import cookie from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';

import Login from './login';
    
import Layout from '../components/Layout';
import LayoutE from '../components/Layout/LayoutEmpleados';

export default function Home({  }) {
  const [user, setuser] = useState(null);
  const [data, setdata] = useState([]);
 const getUser = async (token) => {
  if(token){
    let url = `${process.env.IP}/api/v1/auth/me?token=${token}`;
  
  console.log(url);
      const response = await fetch(url, {
        method: 'GET',
      });

     

      const json = await response.json();

      const jsondta = json.data;
      console.log(jsondta)
      setdata(jsondta)
  }else{
    setdata([])
  }
      
 }
  useEffect(() => {
    console.log(data);
    getUser(cookie.get('token'))
    if(cookie.get('token')){
      getUser(cookie.get('token'))
    }
    if (data[0] === undefined) {
      if(cookie.get('token')){
        getUser(cookie.get('token'))
      }
     
    
    } else {
      setuser(data[0].nombre);
    }
  }, []);

  const [info, setinfo] = useState({});
  let vendedor;
  let admin;
  let promotor;
  let almacen;
  let init = false;
  if (data[0] != undefined) {
    if (data[0].role === 'vendedor') {
      vendedor = true;
      init = true;
    } else if (data[0].role === 'admin' || data[0].role === 'distribuidor' || data[0].role === 'almacen') {
      admin = true;
      init = true;
    } else if (data[0].role === 'promotor') {
      promotor = true;
      init = true;
    }
  }

  return (
    <div
      style={{
        height: '100vh',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundImage: `url('/backg.jpg')`,
      }}
    >
      <div>
        <Head>
          <title>Comercialización</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {!init && <Login />}
        {admin && (
          <>
            <Layout user={user} />
          </>
        )}
        {vendedor && (
          <>
            <LayoutE user={user} />
          </>
        )}
        {promotor && (
          <>
            <Layout />
          </>
        )}
      </div>
    </div>
  );
}

Home.getInitialProps = async ({ req }) => {
  const result = [];
  let token = null;
  if (req && req.headers && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('token'));
    if (tokenCookie) {
      token = tokenCookie.split('=')[1];
    }
    console.log(tokenCookie);
    try {
      if (token) { // Check if token is not null or empty
        let url = `${process.env.IP}/api/v1/auth/me?token=${token}`;
  
    console.log(url);
        const response = await fetch(url, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
  
        const json = await response.json();
  
        const jsondta = json.data;
        for (var i in jsondta) {
          result.push(jsondta[i]);
        }
      }
  
      return { data: result };
    } catch (error) {
      console.log('Error:', error.message);
      // Handle the error
      return { data: result }; // Return an empty result or handle the error response
    }
  }else{
    return { data: result }
  }

  

  
};

