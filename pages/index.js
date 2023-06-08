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
import { useCookies } from 'react-cookie';

export default function Home({data}) {
  
  const [cookies, setCookie] = useCookies(['token']);

  const [user, setUser] = useState(null);
    console.log(cookies)
    if (data === undefined) { 
      // User not logged in
      return(    <div  style={{height: '100vh',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundImage: `url('/backg.jpg')`}}>
    <Login/>
  </div>)
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
        {!data && <Login />}
        {data && data[0].role === 'admin' && <Layout user={user} />}
        {data && data[0].role === 'vendedor' && <LayoutE user={user} />}
        {data && data[0].role === 'promotor' && <Layout />}
      </div>
    </div>
  );
}


Home.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const cookie = req && req.headers ? req.headers.cookie : null;
  const token = getCookieValue(cookie, 'token');

  if (token) {
    try {
      const response = await axios.get(`${process.env.IP}/api/v1/auth/me?token=${token}`);
      const json = await response.data;
      const jsonData = json.data;

      if (jsonData[0] === undefined) {
        // User not logged in
        return {
          data: null,
        };
      } else {
        return {
          data: jsonData,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  // User not logged in
  return {
    data: null,
  };
};

function getCookieValue(cookie, name) {
  if (!cookie) {
    return null;
  }

  const value = cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${name}=`));

  if (!value) {
    return null;
  }

  return value.split('=')[1];
}