import { Task } from '../../types';

const mondayTasks: Task[] = [
  { id: 'mon-1', day: 1, time: '5:00', title: 'Wake Up', description: 'Start the day fresh', type: 'personal', completed: false, reminder: true },
  { id: 'mon-2', day: 1, time: '5:15', title: 'Deep Learning Session', description: 'No distraction focused learning (90 min)', type: 'learning', completed: false, reminder: true },
  { id: 'mon-3', day: 1, time: '6:00', title: 'Morning Soaked Combo', description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana', type: 'meal', completed: false, reminder: true },
  { id: 'mon-4', day: 1, time: '7:00', title: 'Gym Session', description: 'Workout (75 min)', type: 'exercise', completed: false, reminder: true },
  { id: 'mon-5', day: 1, time: '7:30', title: 'Post-Workout Breakfast', description: 'Sattu shake + 3 boiled eggs + Greek yogurt', type: 'meal', completed: false, reminder: true },
  { id: 'mon-6', day: 1, time: '8:15', title: 'Shopping & Return', description: 'Buy fresh groceries, return from gym', type: 'shopping', completed: false, reminder: true },
  { id: 'mon-7', day: 1, time: '8:40', title: 'Breakfast Prep', description: 'Prepare breakfast, shower, get ready', type: 'prep', completed: false, reminder: true },
  { id: 'mon-8', day: 1, time: '9:30', title: 'Work Session 1', description: 'Focused work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'mon-9', day: 1, time: '11:00', title: 'Mid-Morning Snack', description: 'Protein smoothie + Berries + Honey', type: 'meal', completed: false, reminder: true },
  { id: 'mon-10', day: 1, time: '11:30', title: 'Work Session 2', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'mon-11', day: 1, time: '13:00', title: 'Lunch', description: 'Brown rice + Lentil curry + Spinach sabzi + Cucumber salad', type: 'meal', completed: false, reminder: true },
  { id: 'mon-12', day: 1, time: '14:00', title: 'Kitchen Cleanup', description: 'Clean dishes, organize kitchen', type: 'chore', completed: false },
  { id: 'mon-13', day: 1, time: '14:30', title: 'Work Session 3', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'mon-14', day: 1, time: '16:00', title: 'Evening Snack', description: 'Herbal tea + 1 orange + Roasted chickpeas', type: 'meal', completed: false, reminder: true },
  { id: 'mon-15', day: 1, time: '16:30', title: 'Work Session 4', description: 'Final work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'mon-16', day: 1, time: '18:30', title: 'Personal Time', description: 'Relaxation, reading, hobbies', type: 'personal', completed: false },
  { id: 'mon-17', day: 1, time: '19:30', title: 'Dinner', description: 'Grilled fish + Sweet potato + Green beans + Mixed salad', type: 'meal', completed: false, reminder: true },
  { id: 'mon-18', day: 1, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Tuesday', type: 'personal', completed: false }
];

export default mondayTasks; 