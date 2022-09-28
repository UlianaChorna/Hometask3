export enum Category {
    TASK = "Task",
    RANDOM_THOUGHT = "Random Thought",
    IDEA = "Idea",
    QUOTE = "Quote"
};

export interface ICategoryStatistic {
    category: string;
    active: number;
    archived: number;
}