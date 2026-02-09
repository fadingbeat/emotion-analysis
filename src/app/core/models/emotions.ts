// ✅ Enum for emotion names (matches your API keys exactly)
export enum EmotionType {
    JOY = 'joy',
    SADNESS = 'sadness',
    ANGER = 'anger',
    FEAR = 'fear',
    DISGUST = 'disgust',
    SURPRISE = 'surprise',
}

// ✅ Type for visualization shapes
export type VisualizationShape =
    | 'circle'
    | 'wave'
    | 'flame'
    | 'spiral'
    | 'hexagon'
    | 'star';

// ✅ Interface for a single emotion's color config
export interface EmotionColorConfig {
    emotionName: string;
    primaryColor: string;
    alternateColors: string[];
    visualization: {
        text: string;
        affirmation: string;
        shape: VisualizationShape;
    };
}

// ✅ Interface for what the component needs (this replaces transformedColorsList)
export interface EmotionDropdownOption {
    emotionName: string;
    colorOptions: string[];
    selectedValue: string;
    selectedHex: string;
    hexValues: string[];
}

// Keep your existing interface (used for API response)
export interface EmotionColor {
    emotionName: string;
    colorValue: string[];
}
