// src/lib/data/types.ts

export interface Task {
    id: string;
    time: string;
    title: string;
    description: string;
    type: 'meal' | 'work' | 'prep' | 'shopping' | 'exercise' | 'personal' | 'chore' | 'learning';
    completed: boolean;
    reminder?: boolean;
    day: number; // 0 = Sunday, 1 = Monday, etc.
  }
  
  export interface Meal {
    time: string;
    name: string;
    foods: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    day: number;
  }
  
  export type TaskType = Task['type'];
  export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;