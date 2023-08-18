import { Handler } from '@netlify/functions';
import { Configuration, OpenAIApi } from 'openai';

require('dotenv').config();

export const handler: Handler = async (event, context) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    // const apiGuard: string = API_SECRET !== undefined ? API_SECRET : '';
    const openai = new OpenAIApi(configuration);
    const emotionParam = event.queryStringParameters?.emotion_name || 'love';

    const prompt =
        `Describe human emotion ${emotionParam}.` ||
        'Describe psychological effect of emotions on humans';
    try {
        const data = await openai.createCompletion({
            model: 'text-davinci-002',
            prompt,
            max_tokens: 2000,
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ data: data.data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message,
            }),
        };
    }
};
