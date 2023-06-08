import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Login from './login';
import Layout from '../components/Layout';
import LayoutE from '../components/Layout/LayoutEmpleados';
import { useCookies } from 'react-cookie';

export default function Home({ data }) {
  const [cookies, setCookie] = useCookies(['token']);
  const [user, setUser] = useState(data && data[0] ? data[0].nombre : null);

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
        {!user && <Login />}
        {user && data && data[0].role === 'admin' && <Layout user={user} />}
        {user && data && data[0].role === 'vendedor' && <LayoutE user={user} />}
        {user && data && data[0].role === 'promotor' && <Layout />}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;

  if (token) {
    try {
      const response = await axios.get(`${process.env.IP}/api/v1/auth/me?token=${token}`);
      const json = await response.data;
      const jsonData = json.data;

      if (jsonData[0] === undefined) {
        // User not logged in
        return {
          props: {
            data: null,
          },
        };
      } else {
        return {
          props: {
            data: jsonData,
          },
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  // User not logged in
  return {
    props: {
      data: null,
    },
  };
}
