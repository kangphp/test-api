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
      'Cookie': 'ci_session=xxxxxxxx_NILAI_COOKIE_VALID_TERBARU_ANDA_xxxxxxxxx'
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
