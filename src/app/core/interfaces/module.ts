import { Lesson } from "./lesson";
import { Progress } from "./progress";

export interface Mdule {
    id: number;
    title: string;
    description: string;
    image: string | null;  // Optional, based on your requirements
    lessons: Lesson[];
    progress: Progress;
    is_bookmarked: boolean;
}
