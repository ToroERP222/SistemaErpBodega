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

export default function Home() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  const getUser = async (token) => {
    if (token) {
      let url = `${process.env.IP}/api/v1/auth/me?token=${token}`;

      console.log(url);
      try {
        const response = await fetch(url, {
          method: 'GET',
        });

        if (response.status === 401) {
          console.log('Unauthorized');
          cookie.remove('token');
          return;
        }

        const json = await response.json();
        const jsondta = json.data;
        console.log(jsondta);
        setData(jsondta);
      } catch (error) {
        console.error(error);
      }
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    console.log(data);
    const token = cookie.get('token');
    getUser(token);

    if (token && data[0] === undefined) {
      getUser(token);
    } else {
      setUser(data[0].nombre);
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const { role } = data[0];
      if (role === 'vendedor') {
        setUser(true);
      } else if (role === 'admin' || role === 'distribuidor' || role === 'almacen') {
        setUser(true);
      } else if (role === 'promotor') {
        setUser(true);
      }
    }
  }, [data]);

  return (
    <>
      <div
        style={{
          height: '100vh',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundImage: `url('/backg.jpg')`,
        }}
      >
        <Head>
          <title>Comercialización</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {!user && <Login />}
        {user && (
          <>
            {data.length > 0 && (
              <>
                {data[0].role === 'admin' || data[0].role === 'distribuidor' || data[0].role === 'almacen' ? (
                  <Layout user={user} />
                ) : (
                  <LayoutE user={user} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
