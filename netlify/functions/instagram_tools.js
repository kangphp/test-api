// File: netlify/functions/instagram_tools.js

import axios from 'axios';

export const handler = async (event, context) => {
  const username = event.queryStringParameters.username;

  if (!username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Username is required' }),
    };
  }

  try {
    const targetUrl = `https://sprintpedia.id/page/instagram_tools`;
    const headers = {
      'User-Agent': 'Mozilla/5.0',
      // PENTING: Pastikan Anda menggunakan cookie yang valid dan terbaru di sini!
      'Cookie': 'cw_conversation=eyJhbGciOiJIUzI1NiJ9.eyJzb3VyY2VfaWQiOiIwMmQyOGI0Zi00ODA3LTQ2NTMtOWY1ZS1jZDNlYmFiZTRjNWYiLCJpbmJveF9pZCI6MX0.wAXs3_d_STfrhpGQ-CH0Ug2fkQ5A1gC7-HYzVq1GNoI;ci_session=9o9job87hmg9skfat8cap41t788ildhk;csrf_cookie=2cfc4b4fe9aec692dfbf2c9dae471140'
    };

    const apiResponse = await axios.get(targetUrl, {
      params: { username },
      headers: headers
    });

    return {
      statusCode: 200,
      body: JSON.stringify(apiResponse.data),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
