import { Module } from "../../interfaces/user";

export interface Bookmark {
    id: number;
    user_id: number;
    module_id: number;
    created_at: string;
    module: Module;
}

export interface BookmarkHistory {
    id: number;
    module: Module;
    total_lessons: number;
    viewed_lessons: number
    created_at: string;
}
