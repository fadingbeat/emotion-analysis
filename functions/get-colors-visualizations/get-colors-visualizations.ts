import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

require('dotenv').config();

export const handler: Handler = async (event, context) => {
    // const apiGuard: string = API_SECRET !== undefined ? API_SECRET : '';
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const emotionParamsList =
        event.multiValueQueryStringParameters?.detectedEmotions || [];

    const prompt =
        `Store in typescript array colors associated with emotions ${emotionParamsList}. Example array: const emotionsColors: { [key: string]: string[] } = {
        "joy": ["yellow", "orange", "pink"],
        "surprise": ["blue", "purple"]};` ||
        'Describe how colors can affect our emotions';
    try {
        const data = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'assistant', content: prompt }],
            temperature: 0.01,
            max_tokens: 85,
            top_p: 0.31,
            frequency_penalty: 0.86,
            presence_penalty: 0,
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ data }),
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
