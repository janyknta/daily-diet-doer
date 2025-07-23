import { Task } from '../../types';

const fridayTasks: Task[] = [
  { id: 'fri-1', day: 5, time: '5:00', title: 'Wake Up', description: 'Start the day fresh', type: 'personal', completed: false, reminder: true },
  { id: 'fri-2', day: 5, time: '5:15', title: 'Deep Learning Session', description: 'No distraction focused learning (90 min)', type: 'learning', completed: false, reminder: true },
  { id: 'fri-3', day: 5, time: '6:00', title: 'Morning Soaked Combo', description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana', type: 'meal', completed: false, reminder: true },
  { id: 'fri-4', day: 5, time: '7:00', title: 'Gym Session', description: 'Workout (75 min)', type: 'exercise', completed: false, reminder: true },
  { id: 'fri-5', day: 5, time: '7:30', title: 'Post-Workout Breakfast', description: 'Sattu shake + 3 boiled eggs + Greek yogurt', type: 'meal', completed: false, reminder: true },
  { id: 'fri-6', day: 5, time: '8:15', title: 'Weekend Prep Shopping', description: 'Buy groceries for weekend, special items', type: 'shopping', completed: false, reminder: true },
  { id: 'fri-7', day: 5, time: '8:40', title: 'Morning Prep', description: 'Shower, get ready, final weekday prep', type: 'prep', completed: false, reminder: true },
  { id: 'fri-8', day: 5, time: '9:30', title: 'Work Session 1', description: 'Focused work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'fri-9', day: 5, time: '11:00', title: 'Mid-Morning Snack', description: 'Fresh juice + Roasted seeds mix + 1 kiwi', type: 'meal', completed: false, reminder: true },
  { id: 'fri-10', day: 5, time: '11:30', title: 'Work Session 2', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'fri-11', day: 5, time: '13:00', title: 'Lunch', description: 'Fish curry + Brown rice + Okra sabzi + Buttermilk', type: 'meal', completed: false, reminder: true },
  { id: 'fri-12', day: 5, time: '14:00', title: 'House Tidying', description: 'Quick tidy up, prepare for weekend', type: 'chore', completed: false },
  { id: 'fri-13', day: 5, time: '14:30', title: 'Work Session 3', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'fri-14', day: 5, time: '16:00', title: 'Evening Snack', description: 'Green tea + Homemade granola + Yogurt', type: 'meal', completed: false, reminder: true },
  { id: 'fri-15', day: 5, time: '16:30', title: 'Work Session 4', description: 'Final work block (1.5 hours)', type: 'work', completed: false, reminder: true },
  { id: 'fri-16', day: 5, time: '18:00', title: 'Week Review', description: 'Review week accomplishments, plan weekend', type: 'personal', completed: false },
  { id: 'fri-17', day: 5, time: '19:30', title: 'Dinner', description: 'Grilled chicken + Roti + Dal + Mixed vegetables', type: 'meal', completed: false, reminder: true },
  { id: 'fri-18', day: 5, time: '21:00', title: 'Weekend Planning', description: 'Plan weekend activities and relaxation', type: 'personal', completed: false }
];

export default fridayTasks; 