import axios from 'axios';

export async function getServerSideProps(context) {
  // Retrieve the token from the cookie
  const token = context.req.cookies.token;

  // Fetch the data from your API
  try {
    const response = await axios.get(`${process.env.IP}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    const jsonData = json.data;

    // Parse and return the data as props
    return {
      props: {
        data: jsonData,
      },
    };
  } catch (error) {
    console.error(error);

    // In case of an error, return an empty data object
    return {
      props: {
        data: [],
      },
    };
  }
}
