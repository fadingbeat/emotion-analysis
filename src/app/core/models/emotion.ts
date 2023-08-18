export interface Emotion {
    emotions_normalized: EmotionsNormalized;
}

export interface EmotionsNormalized {
    surprise: number;
    joy: number;
    fear: number;
    disgust: number;
    sadness: number;
    anger: number;
}
