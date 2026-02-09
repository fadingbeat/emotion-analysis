import {
    EmotionColorConfig,
    EmotionType,
    VisualizationShape,
} from './emotions';

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

export interface EmotionColor {
    emotionName: string;
    colorValue: string[];
}

// ✅ Map hex codes to human-readable color names
export const HEX_TO_COLOR_NAME: Record<string, string> = {
    '#FFD700': 'Gold',
    '#FFA500': 'Orange',
    '#FFFF00': 'Yellow',
    '#4B7BA7': 'Deep Blue',
    '#87CEEB': 'Sky Blue',
    '#B0E0E6': 'Powder Blue',
    '#E53935': 'Red',
    '#FF6347': 'Tomato',
    '#DC143C': 'Crimson',
    '#7B68EE': 'Medium Purple',
    '#9932CC': 'Dark Orchid',
    '#8A2BE2': 'Blue Violet',
    '#6B8E23': 'Olive',
    '#808000': 'Dark Olive',
    '#556B2F': 'Dark Khaki',
    '#FF69B4': 'Hot Pink',
    '#FF1493': 'Deep Pink',
    '#FFB6C1': 'Light Pink',
};

// ✅ Helper function to get color name from hex
export function getColorName(hexCode: string): string {
    return HEX_TO_COLOR_NAME[hexCode] || hexCode; // Fallback to hex if not found
}

// ✅ The mock database — your color/emotion/visualization data
export const EMOTION_COLOR_MAP: Record<EmotionType, EmotionColorConfig> = {
    [EmotionType.JOY]: {
        emotionName: 'Joy',
        primaryColor: '#FFD700', // Gold
        alternateColors: ['#FFA500', '#FFFF00'], // Orange, Yellow
        visualization: {
            text: 'You are radiating light and positivity',
            affirmation: 'I embrace joy and lightness',
            shape: 'circle',
        },
    },
    [EmotionType.SADNESS]: {
        emotionName: 'Sadness',
        primaryColor: '#4B7BA7', // Deep blue
        alternateColors: ['#87CEEB', '#B0E0E6'], // Sky blue, Powder blue
        visualization: {
            text: 'Your emotions are flowing through you',
            affirmation: 'I allow myself to feel and heal',
            shape: 'wave',
        },
    },
    [EmotionType.ANGER]: {
        emotionName: 'Anger',
        primaryColor: '#E53935', // Red
        alternateColors: ['#FF6347', '#DC143C'], // Tomato, Crimson
        visualization: {
            text: 'Channel this fire into strength',
            affirmation: 'I transform anger into power',
            shape: 'flame',
        },
    },
    [EmotionType.FEAR]: {
        emotionName: 'Fear',
        primaryColor: '#7B68EE', // Medium slate blue
        alternateColors: ['#9932CC', '#8A2BE2'], // Dark orchid, Blue violet
        visualization: {
            text: 'You are safe and protected',
            affirmation: 'I breathe through this moment',
            shape: 'spiral',
        },
    },
    [EmotionType.DISGUST]: {
        emotionName: 'Disgust',
        primaryColor: '#6B8E23', // Olive drab
        alternateColors: ['#808000', '#556B2F'], // Olive, Dark khaki
        visualization: {
            text: 'Release what no longer serves you',
            affirmation: 'I choose clarity and renewal',
            shape: 'hexagon',
        },
    },
    [EmotionType.SURPRISE]: {
        emotionName: 'Surprise',
        primaryColor: '#FF69B4', // Hot pink
        alternateColors: ['#FF1493', '#FFB6C1'], // Deep pink, Light pink
        visualization: {
            text: 'Embrace the unexpected beauty',
            affirmation: 'I welcome new possibilities',
            shape: 'star',
        },
    },
};

// ✅ Export emotion colors in chart order (matches chart labels)
export const CHART_EMOTION_ORDER = [
    'anger',
    'disgust',
    'fear',
    'joy',
    'sadness',
    'surprise',
] as const;

// ✅ Get hex colors for chart in correct order
export function getChartColors(): string[] {
    return CHART_EMOTION_ORDER.map((emotionKey) => {
        const emotionType = emotionKey as EmotionType;
        return EMOTION_COLOR_MAP[emotionType].primaryColor;
    });
}

// ✅ Get chart labels with emojis (optional, for better UX)
export const CHART_LABELS = [
    'Anger',
    'Disgust',
    'Fear',
    'Joy',
    'Sadness',
    'Surprise',
];
