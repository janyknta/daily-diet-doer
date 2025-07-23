import { Task } from '../../types';

const wednesdayTasks: Task[] = [
  { id: 'wed-1', day: 3, time: '5:00', title: 'Wake Up', description: 'Start the day fresh', type: 'personal', completed: false, reminder: true },
  { id: 'wed-2', day: 3, time: '5:15', title: 'Deep Learning Session', description: 'No distraction focused learning (90 min)', type: 'learning', completed: false, reminder: true },
  { id: 'wed-3', day: 3, time: '6:00', title: 'Morning Soaked Combo', description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana', type: 'meal', completed: false, reminder: true },
  { id: 'wed-4', day: 3, time: '7:00', title: 'Gym Session', description: 'Workout (75 min)', type: 'exercise', completed: false, reminder: true },
  { id: 'wed-5', day: 3, time: '7:30', title: 'Post-Workout Breakfast', description: 'Sattu shake + 3 boiled eggs + Greek yogurt', type: 'meal', completed: false, reminder: true },
  { id: 'wed-6', day: 3, time: '8:15', title: 'Quick Shopping', description: 'Buy fresh items, quick errands', type: 'shopping', completed: false, reminder: true },
  { id: 'wed-7', day: 3, time: '8:40', title: 'Morning Prep', description: 'Shower, get ready, plan day', type: 'prep', completed: false, reminder: true },
  { id: 'wed-8', day: 3, time: '9:30', title: 'Work Session 1', description: 'Focused work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'wed-9', day: 3, time: '11:00', title: 'Mid-Morning Snack', description: 'Coconut water + 1 pear + Walnuts', type: 'meal', completed: false, reminder: true },
  { id: 'wed-10', day: 3, time: '11:30', title: 'Work Session 2', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'wed-11', day: 3, time: '13:00', title: 'Lunch', description: 'Brown rice + Rajma curry + Aloo gobi + Pickle', type: 'meal', completed: false, reminder: true },
  { id: 'wed-12', day: 3, time: '14:00', title: 'Bedroom Organization', description: 'Organize bedroom, change sheets', type: 'chore', completed: false },
  { id: 'wed-13', day: 3, time: '14:30', title: 'Work Session 3', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'wed-14', day: 3, time: '16:00', title: 'Evening Snack', description: 'Masala chai + Roasted makhana + Dates', type: 'meal', completed: false, reminder: true },
  { id: 'wed-15', day: 3, time: '16:30', title: 'Work Session 4', description: 'Final work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'wed-16', day: 3, time: '18:30', title: 'Exercise/Walk', description: 'Evening walk or light exercise', type: 'exercise', completed: false },
  { id: 'wed-17', day: 3, time: '19:30', title: 'Dinner', description: 'Grilled chicken + Millet khichdi + Sautéed spinach + Yogurt', type: 'meal', completed: false, reminder: true },
  { id: 'wed-18', day: 3, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Thursday', type: 'personal', completed: false }
];

export default wednesdayTasks; 