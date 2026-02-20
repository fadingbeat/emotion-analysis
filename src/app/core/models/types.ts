import {
    EmotionColorConfig,
    EmotionType,
    VisualizationShape,
    ColorVisualization,
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

// ✅ Get color visualization for a specific hex code
export function getColorVisualization(
    hexCode: string,
): ColorVisualization | null {
    for (const emotion of Object.values(EMOTION_COLOR_MAP)) {
        if (emotion.primaryColor.hexCode === hexCode) {
            return emotion.primaryColor;
        }

        const alt = emotion.alternateColors.find((c) => c.hexCode === hexCode);
        if (alt) return alt;
    }
    return null;
}

// ✅ Updated: Get color name from hex
export const HEX_TO_COLOR_NAME: Record<string, string> = {
    '#FFD700': 'Gold',
    '#FFA500': 'Orange',
    '#FFFF00': 'Yellow',
    '#4B7BA7': 'Deep Blue',
    '#87CEEB': 'Turquoise',
    '#B0E0E6': 'Powder Blue',
    '#E53935': 'Crimson',
    '#FF6347': 'Vermillion',
    '#DC143C': 'Dark Red',
    '#7B68EE': 'Medium Purple',
    '#9932CC': 'Dark Orchid',
    '#8A2BE2': 'Violet',
    '#6B8E23': 'Olive',
    '#808000': 'Dark Olive',
    '#556B2F': 'Sage Green',
    '#FF69B4': 'Hot Pink',
    '#FF1493': 'Deep Pink',
    '#FFB6C1': 'Light Pink',
};

// ✅ Helper function to get color name from hex
export function getColorName(hexCode: string): string {
    return HEX_TO_COLOR_NAME[hexCode] || hexCode; // Fallback to hex if not found
}

// ✅ Determine if color is light or dark
export function isLightColor(hexColor: string): boolean {
    // Remove # if present
    const hex = hexColor.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance (brightness)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // If luminance > 0.5, it's a light color
    return luminance > 0.5;
}

export type ReadonlyEmotionColorMap = Readonly<
    Record<EmotionType, EmotionColorConfig>
>;

// ✅ The mock database — your color/emotion/visualization data
export const EMOTION_COLOR_MAP: Record<EmotionType, EmotionColorConfig> = {
    [EmotionType.JOY]: {
        emotionName: 'Joy',
        primaryColor: {
            colorName: 'Gold',
            hexCode: '#FFD700',
            description:
                "Gold connects to joy by radiating warmth and celebrating life's golden moments.",
            visualization: {
                text: 'A luminous gold bathes your entire being in warmth and light. It fills your chest with radiance, awakening your capacity for celebration and gratitude.',
                affirmation:
                    'I embrace joy and celebrate the beauty in my life',
                shape: 'circle',
            },
        },
        alternateColors: [
            {
                colorName: 'Orange',
                hexCode: '#FFA500',
                description:
                    'Orange amplifies joy through creative expression and social connection.',
                visualization: {
                    text: 'A warm, radiant orange fills your lungs with life-giving energy. It promotes joy, enthusiasm, and a sense of lightness that radiates outward.',
                    affirmation: 'I radiate warmth and joy to those around me',
                    shape: 'wave',
                },
            },
            {
                colorName: 'Yellow',
                hexCode: '#FFFF00',
                description:
                    'Yellow elevates joy by bringing mental clarity and optimistic energy.',
                visualization: {
                    text: 'A luminous yellow illuminates your mind, bringing clarity and focus. It enhances your intellect, sharpens your intuition, and fosters wisdom and inner brightness.',
                    affirmation:
                        'I choose lightness and optimism in every moment',
                    shape: 'circle',
                },
            },
        ],
    },

    [EmotionType.SADNESS]: {
        emotionName: 'Sadness',
        primaryColor: {
            colorName: 'Deep Blue',
            hexCode: '#4B7BA7',
            description:
                'Deep blue honors sadness by creating space for reflection and emotional depth.',
            visualization: {
                text: 'A deep, indigo blue descends upon you, bringing a sense of profound calm and inner stillness. It gently holds your grief, validating your emotions and connecting you to the vastness of shared human experience.',
                affirmation: 'I allow myself to feel and heal at my own pace',
                shape: 'wave',
            },
        },
        alternateColors: [
            {
                colorName: 'Turquoise',
                hexCode: '#87CEEB',
                description:
                    'Turquoise softens sadness with soothing calm and emotional healing.',
                visualization: {
                    text: 'A serene turquoise washes over you, calming your mind and soothing your spirit. It promotes emotional healing, balance, and the gentle restoration of inner peace.',
                    affirmation:
                        'I am safe to feel my emotions and move through them',
                    shape: 'wave',
                },
            },
            {
                colorName: 'Powder Blue',
                hexCode: '#B0E0E6',
                description:
                    'Powder blue brings gentle comfort and hope during difficult times.',
                visualization: {
                    text: 'A gentle powder blue envelops you like a soft blanket, bringing comfort and tenderness. It reminds you that healing is possible and that you are not alone in your sadness.',
                    affirmation:
                        'Healing comes gently with time and self-compassion',
                    shape: 'circle',
                },
            },
        ],
    },

    [EmotionType.ANGER]: {
        emotionName: 'Anger',
        primaryColor: {
            colorName: 'Crimson',
            hexCode: '#E53935',
            description:
                'Crimson channels anger into vitality and strength, grounding intense emotions.',
            visualization: {
                text: 'A deep, resonant crimson washes over you, invigorating your physical body. It strengthens your heart, improves circulation, and transforms raw emotion into powerful vitality and resilient strength.',
                affirmation:
                    'I channel my anger into positive action and strength',
                shape: 'flame',
            },
        },
        alternateColors: [
            {
                colorName: 'Vermillion',
                hexCode: '#FF6347',
                description:
                    'Vermillion honors anger by awakening passion and creative fire.',
                visualization: {
                    text: 'A fiery vermillion ignites your passion and creativity. It awakens your inner fire, helping you overcome fear and self-doubt while transforming anger into purposeful action.',
                    affirmation:
                        'I transform my anger into creative power and purpose',
                    shape: 'flame',
                },
            },
            {
                colorName: 'Dark Red',
                hexCode: '#DC143C',
                description:
                    'Dark red grounds anger, turning intensity into protective boundaries.',
                visualization: {
                    text: 'A bold dark red anchors you in your power, establishing strong boundaries and self-protection. It allows you to stand firm in your truth and honor your needs without compromise.',
                    affirmation: 'I honor my boundaries and protect my energy',
                    shape: 'hexagon',
                },
            },
        ],
    },

    [EmotionType.FEAR]: {
        emotionName: 'Fear',
        primaryColor: {
            colorName: 'Medium Purple',
            hexCode: '#7B68EE',
            description:
                'Medium purple transforms fear into courage by connecting you to inner wisdom.',
            visualization: {
                text: 'A soothing medium purple envelops you, creating a safe container for your fear. It connects you to inner wisdom and courage, reminding you that you have the strength to face uncertainty.',
                affirmation:
                    'I am safe, protected, and capable of facing uncertainty',
                shape: 'spiral',
            },
        },
        alternateColors: [
            {
                colorName: 'Dark Orchid',
                hexCode: '#9932CC',
                description:
                    'Dark orchid deepens the spiritual protection against fear.',
                visualization: {
                    text: 'A mystical dark orchid surrounds you with spiritual protection and inner strength. It awakens your connection to higher wisdom and helps you see fear as an invitation to growth.',
                    affirmation:
                        'Fear is my teacher, guiding me toward growth and wisdom',
                    shape: 'spiral',
                },
            },
            {
                colorName: 'Violet',
                hexCode: '#8A2BE2',
                description:
                    'Violet elevates fear into spiritual awakening and higher consciousness.',
                visualization: {
                    text: 'A mystical violet envelops you, activating your intuition and connecting you to higher realms of consciousness. It transforms fear into spiritual curiosity and opens you to infinite possibilities.',
                    affirmation:
                        'I trust my intuition and embrace the unknown with courage',
                    shape: 'spiral',
                },
            },
        ],
    },

    [EmotionType.DISGUST]: {
        emotionName: 'Disgust',
        primaryColor: {
            colorName: 'Olive',
            hexCode: '#6B8E23',
            description:
                'Olive helps you release disgust by grounding and purifying negative energy.',
            visualization: {
                text: "A grounding olive energy descends upon you, helping you release what no longer serves. It purifies your energy, reconnects you to nature's cycles of renewal, and invites fresh clarity.",
                affirmation:
                    'I release what no longer serves and choose renewal',
                shape: 'hexagon',
            },
        },
        alternateColors: [
            {
                colorName: 'Dark Olive',
                hexCode: '#808000',
                description:
                    'Dark olive deepens the cleansing process, bringing stability and boundaries.',
                visualization: {
                    text: 'A deep dark olive grounds you firmly in the earth, helping you establish clear boundaries and release toxic patterns. It brings stability and clarity to your decision-making.',
                    affirmation:
                        'I honor my boundaries and choose what uplifts me',
                    shape: 'hexagon',
                },
            },
            {
                colorName: 'Sage Green',
                hexCode: '#556B2F',
                description:
                    "Sage green brings wisdom and renewal to the disgust you're experiencing.",
                visualization: {
                    text: 'A wise sage green surrounds you, offering gentle wisdom and the promise of renewal. It helps you understand your disgust as valuable information and guides you toward healthier choices.',
                    affirmation:
                        "My disgust is wisdom guiding me toward what's healthy",
                    shape: 'circle',
                },
            },
        ],
    },

    [EmotionType.SURPRISE]: {
        emotionName: 'Surprise',
        primaryColor: {
            colorName: 'Hot Pink',
            hexCode: '#FF69B4',
            description:
                'Hot pink celebrates surprise by amplifying joy and creative energy.',
            visualization: {
                text: "A vibrant hot pink bursts forth, celebrating the unexpected gift of surprise. It opens you to wonder, playfulness, and the delightful mystery of life's beautiful surprises.",
                affirmation: 'I embrace surprise with curiosity and joy',
                shape: 'star',
            },
        },
        alternateColors: [
            {
                colorName: 'Deep Pink',
                hexCode: '#FF1493',
                description:
                    'Deep pink intensifies surprise by connecting you to passion and authenticity.',
                visualization: {
                    text: 'A striking deep pink radiates authenticity and passionate engagement. It invites you to embrace the unexpected with full presence and celebrate the aliveness that surprise brings.',
                    affirmation:
                        'I am fully alive and open to new possibilities',
                    shape: 'star',
                },
            },
            {
                colorName: 'Light Pink',
                hexCode: '#FFB6C1',
                description:
                    'Light pink softens surprise with gentleness and wonder.',
                visualization: {
                    text: 'A tender light pink welcomes you into childlike wonder and curiosity. It reminds you that surprise is an invitation to see the world with fresh eyes and open heart.',
                    affirmation:
                        'I approach life with wonder and childlike curiosity',
                    shape: 'star',
                },
            },
        ],
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
        return EMOTION_COLOR_MAP[emotionType].primaryColor.hexCode;
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

// ✅ Type guard for Emotion response
export function isValidEmotionResponse(data: unknown): data is Emotion {
    if (!data || typeof data !== 'object') return false;

    const obj = data as Record<string, unknown>;
    if (!('emotions_normalized' in obj)) return false;

    const emotionsNormalized = obj.emotions_normalized;
    if (!emotionsNormalized || typeof emotionsNormalized !== 'object')
        return false;

    const emotions = emotionsNormalized as Record<string, unknown>;

    // Check all 6 emotions exist and are numbers
    return (
        typeof emotions.joy === 'number' &&
        typeof emotions.sadness === 'number' &&
        typeof emotions.anger === 'number' &&
        typeof emotions.fear === 'number' &&
        typeof emotions.disgust === 'number' &&
        typeof emotions.surprise === 'number'
    );
}

// ✅ Custom error type (we talked about this before)
export class EmotionAnalysisError extends Error {
    constructor(
        public code: 'INVALID_INPUT' | 'API_ERROR' | 'INVALID_RESPONSE',
        message: string,
    ) {
        super(message);
        this.name = 'EmotionAnalysisError';
    }
}
