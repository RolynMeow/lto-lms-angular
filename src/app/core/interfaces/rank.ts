export interface Rank {
    rank: number,
    total_score: number,
    total_ranks: number,
}

export interface Engagement {
    total_lessons: number,
    completed_lessons: number,
    overall_engagement_percentage: number
}

export interface TimeData {
    total_seconds: string;
    total_hours: number;
    total_minutes: number;
    formatted_time: string;
}