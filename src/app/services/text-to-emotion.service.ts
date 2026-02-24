import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Emotion } from 'src/app/core/models/types';
import {
    isValidEmotionResponse,
    EmotionAnalysisError,
} from 'src/app/core/models/types';

@Injectable({
    providedIn: 'root',
})
export class TextToEmotionService {
    constructor(private http: HttpClient) {}

    public sentence = '';

    getEmotions = async (sentence: string): Promise<Emotion> => {
        const isNetlifyDev = window.location.port === '8888';

        if (!isNetlifyDev && !environment.production) {
            // LOCAL DEVELOPMENT: Use Mockoon
            return this.http
                .get<Emotion>(`${environment.base_url}/api/analyze-sentence`)
                .toPromise() as Promise<Emotion>;
        } else {
            // NETLIFY DEV or PRODUCTION: Use Netlify Functions
            return this.getEmotionsProduction(sentence);
        }
    };

    private async getEmotionsProduction(sentence: string): Promise<Emotion> {
        if (!sentence || sentence.trim().length === 0) {
            throw new EmotionAnalysisError(
                'INVALID_INPUT',
                'Sentence cannot be empty',
            );
        }

        const url = `.netlify/functions/analyze-sentence?prompt=${encodeURIComponent(sentence)}`;

        try {
            const { data } = await axios.get(url);

            // ✅ Validate response with type guard
            if (!isValidEmotionResponse(data)) {
                throw new EmotionAnalysisError(
                    'INVALID_RESPONSE',
                    'API returned invalid emotion data. Expected emotions_normalized object with all 6 emotions.',
                );
            }

            return data; // ✅ TypeScript knows this is Emotion type
        } catch (error) {
            if (error instanceof EmotionAnalysisError) {
                throw error; // Re-throw our custom error
            }

            throw new EmotionAnalysisError(
                'API_ERROR',
                `Failed to analyze emotions: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        }
    }
}
