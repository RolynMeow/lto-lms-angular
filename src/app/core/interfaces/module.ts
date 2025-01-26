import { Lesson } from "./lesson";

export interface Mdule {
    id: number;
    title: string;
    description: string;
    image: string | null;  // Optional, based on your requirements
    lessons: Lesson[];
}
