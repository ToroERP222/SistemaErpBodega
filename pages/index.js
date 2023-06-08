
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
export default function Home({data}) {
  const [user, setuser] = useState(null)
    console.log(data)
    useEffect(() => {
      if (data[0]=== undefined) {
        return(    <div  style={{height: '100vh',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundImage: `url('/backg.jpg')`}}>
          <Login/>
        </div>)
    
  
  
      
    }else{
      setuser(data[0].nombre)
    }
    
      
    }, [data])
    
   

 

     const [info, setinfo] = useState({})
      let vendedor;
      let admin
      let promotor;
      let almacen;
      let init = false
      if(data[0] != undefined){
        if(data[0].role === 'vendedor'){
        vendedor= true
        init = true
      }else if(data[0].role === 'admin'||'distribuidor'||'almacen'){
        admin = true
        init = true
      }else if(data[0].role === 'promotor'){
        promotor = true
        init = true
      }
    }
      
      
    
      

  return (
    <div  style={{height: '100vh',
      position: 'relative',
      backgroundSize: 'cover',
      backgroundImage: `url('/backg.jpg')`}}>
       
     <div>
      <Head>
        <title>Comercialización</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {!init && (
        <><Login/></>
      )}
      {admin && (
        <>
          <Layout user={user}/>
        </>
      )}
      { vendedor && (
        <>
          <LayoutE user={user}/>
        </>
      )}
       { promotor && (
        <>
          <Layout/>
        </>
      )}

    </div>
    </div>
  )
}
Home.getInitialProps = async (ctx) => {
  const { req, res } = ctx;
  const token = req && req.cookies ? req.cookies.token : null;

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

export default Home;
