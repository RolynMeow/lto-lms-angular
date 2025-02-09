export interface Module {
    id: number;
    title: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface History {
    id: number;
    user_id: number;
    activity_id: number;
    duration: number;
    score: number;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface Bookmark {
    id: number;
    user_id: number;
    module_id: number;
    created_at: string;
    updated_at: string;
    module: Module;
}

export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email_verified_at: string | null;
    google_id: string | null;
    profile_picture: string | null;
    address: string | null;
    role: string | null;
    created_at: string;
    updated_at: string;
    history: History[];
    bookmarks: Bookmark[];
}


export interface Badge {
  name: string;
  image: string;
}