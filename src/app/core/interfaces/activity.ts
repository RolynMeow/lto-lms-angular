import { Question } from "./question";

export interface Activity {
    id: number;
    title: string;
    description: string;
    module_id: number;
    image: string; 
    questions: Question[];
}
