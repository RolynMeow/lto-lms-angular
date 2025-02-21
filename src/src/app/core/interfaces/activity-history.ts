import { Activity } from "./activity";

export interface ActivityHistory {
    id: number;
    user_id: number;
    activity_id: number;
    score: number;
    duration: number;  // Duration in seconds or your preferred time unit
    is_completed: boolean;
    created_at: string;
    activity: Activity;
}

