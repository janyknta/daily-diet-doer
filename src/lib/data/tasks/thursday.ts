import { Task } from '../../types';

const thursdayTasks: Task[] = [
  { id: 'thu-1', day: 4, time: '5:00', title: 'Wake Up', description: 'Start the day fresh', type: 'personal', completed: false, reminder: true },
  { id: 'thu-2', day: 4, time: '5:15', title: 'Deep Learning Session', description: 'No distraction focused learning (90 min)', type: 'learning', completed: false, reminder: true },
  { id: 'thu-3', day: 4, time: '6:00', title: 'Morning Soaked Combo', description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana', type: 'meal', completed: false, reminder: true },
  { id: 'thu-4', day: 4, time: '7:00', title: 'Gym Session', description: 'Workout (75 min)', type: 'exercise', completed: false, reminder: true },
  { id: 'thu-5', day: 4, time: '7:30', title: 'Post-Workout Breakfast', description: 'Protein pancakes + Greek yogurt + Honey + Berries', type: 'meal', completed: false, reminder: true },
  { id: 'thu-6', day: 4, time: '8:15', title: 'Weekly Planning', description: 'Plan upcoming week, review goals', type: 'personal', completed: false, reminder: true },
  { id: 'thu-7', day: 4, time: '8:40', title: 'Morning Prep', description: 'Shower, get ready, organize tasks', type: 'prep', completed: false, reminder: true },
  { id: 'thu-8', day: 4, time: '9:30', title: 'Work Session 1', description: 'Focused work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'thu-9', day: 4, time: '11:00', title: 'Mid-Morning Snack', description: 'Green tea + Banana + Peanut butter', type: 'meal', completed: false, reminder: true },
  { id: 'thu-10', day: 4, time: '11:30', title: 'Work Session 2', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'thu-11', day: 4, time: '13:00', title: 'Lunch', description: 'Quinoa salad + Grilled vegetables + Chickpeas + Tahini dressing', type: 'meal', completed: false, reminder: true },
  { id: 'thu-12', day: 4, time: '14:00', title: 'Kitchen Deep Clean', description: 'Deep clean kitchen, organize pantry', type: 'chore', completed: false },
  { id: 'thu-13', day: 4, time: '14:30', title: 'Work Session 3', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'thu-14', day: 4, time: '16:00', title: 'Evening Snack', description: 'Herbal tea + Apple slices + Almonds', type: 'meal', completed: false, reminder: true },
  { id: 'thu-15', day: 4, time: '16:30', title: 'Work Session 4', description: 'Final work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'thu-16', day: 4, time: '18:30', title: 'Creative Time', description: 'Art, music, creative hobbies', type: 'personal', completed: false },
  { id: 'thu-17', day: 4, time: '19:30', title: 'Dinner', description: 'Baked salmon + Brown rice + Steamed broccoli + Lemon salad', type: 'meal', completed: false, reminder: true },
  { id: 'thu-18', day: 4, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Friday', type: 'personal', completed: false }
];

export default thursdayTasks; 