import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TextToEmotionService {
    constructor(private http: HttpClient) {}
    public sentence = '';
    getEmotions = async (sentence: string) => {
        const url = `.netlify/functions/analyze-sentence?prompt=${sentence}`;
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    getEmotionDescription = async (emotionName: string) => {
        const url = `.netlify/functions/get-emotion-description?emotion_name=${emotionName}`;
        try {
            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // we use this method to get our mocked data
    getEmotionsMock = () => {
        return this.http.get(`${environment.base_url}/api/analyze-sentence`);
    };
}
