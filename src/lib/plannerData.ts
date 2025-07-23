import { getTaskCompletion } from './storage';
import weeklyMeals from './data/meals';
import weeklyTasks from './data/tasks';
import type { Task, Meal, TaskType, DayOfWeek } from './types';

export const getCurrentDate = (): Date => {
  return new Date();
};

export const getTasksForDay = (day: number): Task[] => {
  return weeklyTasks.filter(task => task.day === day);
};

export const getMealsForDay = (day: number): Meal[] => {
  return weeklyMeals.filter(meal => meal.day === day);
};

// Updated to accept a specific date with proper validation
export const getTaskCompletionPercentage = (day: number, date?: Date): number => {
  const targetDate = date || new Date();
  
  // Validate the date
  if (isNaN(targetDate.getTime())) {
    console.warn('Invalid date provided to getTaskCompletionPercentage, using current date');
    const currentDate = new Date();
    return getTaskCompletionPercentage(day, currentDate);
  }
  
  const tasksForDay = getTasksForDay(day);
  if (tasksForDay.length === 0) return 0;
  
  const completedTasks = tasksForDay.filter(task => {
    try {
      return getTaskCompletion(task.id, targetDate);
    } catch (error) {
      console.error('Error checking task completion:', error);
      return false;
    }
  }).length;
  
  return Math.round((completedTasks / tasksForDay.length) * 100);
};

export const getCompletionColor = (percentage: number): string => {
  if (percentage === 0) return 'hsl(0, 0%, 0%)'; // black
  if (percentage === 100) return 'hsl(142, 76%, 36%)'; // green (success color)
  if (percentage >= 80) return 'hsl(38, 92%, 50%)'; // yellow (warning color)
  return 'hsl(0, 84.2%, 60.2%)'; // red (destructive color)
};

export const getDayName = (day: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day] || 'Unknown';
};