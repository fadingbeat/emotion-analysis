import { VisualizationShape } from './emotions';

export interface ShapeConfig {
    svg: string;
    animation: string;
    description: string;
}

// ✅ SVG shapes za svaku emociju
export const VISUALIZATION_SHAPES: Record<VisualizationShape, ShapeConfig> = {
    circle: {
        svg: '<circle cx="50%" cy="50%" r="80" fill="currentColor" />',
        animation: 'pulse',
        description: 'Breathing circle',
    },
    wave: {
        svg: `<path d="M 0,50 Q 12.5,30 25,50 T 50,50 T 75,50 T 100,50" 
              stroke="currentColor" stroke-width="3" fill="none" />`,
        animation: 'wave',
        description: 'Flowing wave',
    },
    flame: {
        svg: `<path d="M 50,10 Q 40,30 45,50 Q 35,60 50,80 Q 65,60 55,50 Q 60,30 50,10" 
              fill="currentColor" />`,
        animation: 'flicker',
        description: 'Dancing flame',
    },
    spiral: {
        svg: `<path d="M 50,50 Q 60,40 70,50 Q 60,60 50,70 Q 40,60 35,50 Q 45,40 55,45" 
              stroke="currentColor" stroke-width="2" fill="none" />`,
        animation: 'rotate',
        description: 'Spiraling energy',
    },
    hexagon: {
        svg: `<polygon points="50,10 90,30 90,70 50,90 10,70 10,30" 
               fill="currentColor" />`,
        animation: 'pulse',
        description: 'Grounding hexagon',
    },
    star: {
        svg: `<polygon points="50,10 61,40 90,40 67,60 78,90 50,70 22,90 33,60 10,40 39,40" 
               fill="currentColor" />`,
        animation: 'twinkle',
        description: 'Shining star',
    },
};

// ✅ CSS animations
export const VISUALIZATION_ANIMATIONS = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
    }

    @keyframes wave {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(10px); }
    }

    @keyframes flicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
`;

export const COLOR_AFFIRMATIONS: Record<string, string> = {
    '#FFD700': 'You radiate warmth and light',
    '#FFA500': 'Embrace your creative energy',
    '#FFFF00': 'Let joy fill your spirit',
    '#4B7BA7': 'Find peace in stillness',
    '#87CEEB': 'Flow with your emotions',
    '#B0E0E6': 'Breathe deeply and let go',
    '#E53935': 'Channel your inner strength',
    '#FF6347': 'Transform passion into power',
    '#DC143C': 'Feel your power rising',
    '#7B68EE': 'You are protected and safe',
    '#9932CC': 'Embrace the mystery within',
    '#8A2BE2': 'Trust your intuition',
    '#6B8E23': 'Release what no longer serves',
    '#808000': 'Ground yourself in stillness',
    '#556B2F': 'Find clarity and renewal',
    '#FF69B4': 'Celebrate your uniqueness',
    '#FF1493': 'Shine with confidence',
    '#FFB6C1': 'Love yourself fully',
};
