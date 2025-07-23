export interface StorageData {
  tasks: Record<string, boolean>; // taskId -> completed status
  lastUpdated: string;
}

const STORAGE_KEY = 'daily-diet-doer-data';

export const saveTaskProgress = (taskId: string, completed: boolean) => {
  const existingData = getStorageData();
  existingData.tasks[taskId] = completed;
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

export const getTaskCompletion = (taskId: string): boolean => {
  const data = getStorageData();
  return data.tasks[taskId] || false;
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
  
  // For now, we'll just clear all if older than cutoff
  // In a more sophisticated implementation, we'd track task dates
  const lastUpdated = new Date(data.lastUpdated);
  if (lastUpdated < cutoffDate) {
    localStorage.removeItem(STORAGE_KEY);
  }
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