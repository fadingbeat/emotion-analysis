import { Handler } from '@netlify/functions';
import axios from 'axios';

require('dotenv').config();

export const handler: Handler = async (event) => {
    const API_SECRET = process.env.RAPID_API_KEY;
    const base_url = process.env.BASE_URL;
    const apiGuard: string = API_SECRET !== undefined ? API_SECRET : '';
    const myHeaders = new Headers();
    myHeaders.append('apikey', apiGuard);

    const prompt =
        event.queryStringParameters?.prompt ||
        'Our team won the coding contest. We were the best of all!';

    const options = {
        method: 'GET',
        url: base_url,
        params: {
            text: prompt,
        },
        headers: {
            'X-RapidAPI-Key': apiGuard,
            'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com',
        },
    };

    const response = await axios.request(options);
    const responseText = await response.data;
    return {
        statusCode: response.status,
        body: JSON.stringify(responseText),
    };
};
