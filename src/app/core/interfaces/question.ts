import { Choice } from "./choice";

export interface Question {
    id: number;
    question: string;
    image: string;
    type: 'text' | 'image';  // Enum for the question type
    activity_id: number;
    choices: Choice[];
}
