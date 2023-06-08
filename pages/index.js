
import { useState,useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import cookie from 'js-cookie';
import Link from 'next/link'
import Router from 'next/router';

import Login from './login'

import Layout from '../components/Layout'
import LayoutE from '../components/Layout/LayoutEmpleados'
export default function Home() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.IP}/api/v1/auth/me`,{
          method: 'GET',
          headers: {
            cookie: cookie.get('token')
        }
        })
        const json = await response.json();
        const jsonData = json.data;
        if (jsonData[0] === undefined) {
          return(    <div  style={{height: '100vh',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundImage: `url('/backg.jpg')`}}>
            <Login/>
          </div>)
        }

        setUser(jsonData[0].nombre);
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

 
   

 

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
        {!data && <Login />}
        {data && data[0].role === 'admin' && <Layout user={user} />}
        {data && data[0].role === 'vendedor' && <LayoutE user={user} />}
        {data && data[0].role === 'promotor' && <Layout />}
      </div>
    </div>
  );
}

