export interface Feedback {
    id?: number;       // Optional because it's auto-generated
    rating: number;   // Rating (1-5)
    comment: string;  // User feedback
    follow_up: boolean; // Whether follow-up is needed
    user_id: number;   // ID of the user who submitted the feedback
    created_at?: string; // Timestamp
    updated_at?: string; // Timestamp
}