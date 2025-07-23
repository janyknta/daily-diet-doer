export interface StorageData {
  tasks: Record<string, boolean>; // "taskId-YYYY-MM-DD" -> completed status
  lastUpdated: string;
}

const STORAGE_KEY = 'daily-diet-doer-data';

// Helper function to format date as YYYY-MM-DD with validation
const formatDate = (date: Date): string => {
  // Validate the date
  if (!date || isNaN(date.getTime())) {
    console.warn('Invalid date provided to formatDate, using current date');
    date = new Date();
  }
  
  try {
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Date().toISOString().split('T')[0];
  }
};

// Helper function to create storage key
const createTaskKey = (taskId: string, date: Date): string => {
  return `${taskId}-${formatDate(date)}`;
};

export const saveTaskProgress = (taskId: string, completed: boolean, date?: Date) => {
  const targetDate = date || new Date();
  const existingData = getStorageData();
  const taskKey = createTaskKey(taskId, targetDate);
  existingData.tasks[taskKey] = completed;
  existingData.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
};

export const getStorageData = (): StorageData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  return {
    tasks: {},
    lastUpdated: new Date().toISOString()
  };
};

export const getTaskCompletion = (taskId: string, date?: Date): boolean => {
  const targetDate = date || new Date();
  const data = getStorageData();
  const taskKey = createTaskKey(taskId, targetDate);
  return data.tasks[taskKey] || false;
};

export const clearStorageData = (daysToKeep?: number) => {
  if (daysToKeep === undefined) {
    // Clear all data
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  const data = getStorageData();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  
  // Filter out tasks older than cutoff date
  const filteredTasks: Record<string, boolean> = {};
  
  Object.keys(data.tasks).forEach(taskKey => {
    // Extract date from taskKey (format: "taskId-YYYY-MM-DD")
    const parts = taskKey.split('-');
    if (parts.length >= 3) {
      // Get the last 3 parts as potential date components
      const datePart = parts.slice(-3).join('-');
      try {
        const taskDate = new Date(datePart);
        if (!isNaN(taskDate.getTime()) && taskDate >= cutoffDate) {
          filteredTasks[taskKey] = data.tasks[taskKey];
        }
      } catch (error) {
        // Keep tasks with invalid date format for backward compatibility
        console.warn('Invalid date format in task key:', taskKey);
        filteredTasks[taskKey] = data.tasks[taskKey];
      }
    } else {
      // Keep tasks with old format for backward compatibility
      filteredTasks[taskKey] = data.tasks[taskKey];
    }
  });

  const updatedData: StorageData = {
    tasks: filteredTasks,
    lastUpdated: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

export const getStorageStats = () => {
  const data = getStorageData();
  const totalTasks = Object.keys(data.tasks).length;
  const completedTasks = Object.values(data.tasks).filter(Boolean).length;
  
  return {
    totalTasks,
    completedTasks,
    lastUpdated: data.lastUpdated
  };
};

// Helper function to get task completion for a specific date
export const getTaskCompletionForDate = (taskId: string, date: Date): boolean => {
  return getTaskCompletion(taskId, date);
};

// Helper function to get all completed tasks for a specific date
export const getCompletedTasksForDate = (date: Date): string[] => {
  const data = getStorageData();
  const dateStr = formatDate(date);
  const completedTasks: string[] = [];
  
  Object.keys(data.tasks).forEach(taskKey => {
    if (taskKey.endsWith(`-${dateStr}`) && data.tasks[taskKey]) {
      // Extract taskId by removing the date suffix
      const taskId = taskKey.replace(`-${dateStr}`, '');
      completedTasks.push(taskId);
    }
  });
  
  return completedTasks;
};