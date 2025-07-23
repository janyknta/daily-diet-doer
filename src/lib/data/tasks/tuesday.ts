import { Task } from '../../types';

const tuesdayTasks: Task[] = [
  { id: 'tue-1', day: 2, time: '5:00', title: 'Wake Up', description: 'Start the day fresh', type: 'personal', completed: false, reminder: true },
  { id: 'tue-2', day: 2, time: '5:15', title: 'Deep Learning Session', description: 'No distraction focused learning (90 min)', type: 'learning', completed: false, reminder: true },
  { id: 'tue-3', day: 2, time: '6:00', title: 'Morning Soaked Combo', description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana', type: 'meal', completed: false, reminder: true },
  { id: 'tue-4', day: 2, time: '7:00', title: 'Gym Session', description: 'Workout (75 min)', type: 'exercise', completed: false, reminder: true },
  { id: 'tue-5', day: 2, time: '7:30', title: 'Post-Workout Breakfast', description: 'Oats with milk + 2 boiled eggs + Greek yogurt + Berries', type: 'meal', completed: false, reminder: true },
  { id: 'tue-6', day: 2, time: '8:15', title: 'Grocery Shopping', description: 'Buy weekly groceries, fresh produce', type: 'shopping', completed: false, reminder: true },
  { id: 'tue-7', day: 2, time: '8:40', title: 'Morning Prep', description: 'Shower, get ready, organize day', type: 'prep', completed: false, reminder: true },
  { id: 'tue-8', day: 2, time: '9:30', title: 'Work Session 1', description: 'Focused work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'tue-9', day: 2, time: '11:00', title: 'Mid-Morning Snack', description: 'Green smoothie + 1 apple + Chia seeds', type: 'meal', completed: false, reminder: true },
  { id: 'tue-10', day: 2, time: '11:30', title: 'Work Session 2', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'tue-11', day: 2, time: '13:00', title: 'Lunch', description: 'Roti + Chicken curry + Mixed vegetables + Raita', type: 'meal', completed: false, reminder: true },
  { id: 'tue-12', day: 2, time: '14:00', title: 'Bathroom Cleaning', description: 'Deep clean bathroom, organize toiletries', type: 'chore', completed: false },
  { id: 'tue-13', day: 2, time: '14:30', title: 'Work Session 3', description: 'Focused work block (90 min)', type: 'work', completed: false, reminder: true },
  { id: 'tue-14', day: 2, time: '16:00', title: 'Evening Snack', description: 'Green tea + Energy balls + Almonds', type: 'meal', completed: false, reminder: true },
  { id: 'tue-15', day: 2, time: '16:30', title: 'Work Session 4', description: 'Final work block (2 hours)', type: 'work', completed: false, reminder: true },
  { id: 'tue-16', day: 2, time: '18:30', title: 'Personal Development', description: 'Read, learn new skills, online course', type: 'personal', completed: false },
  { id: 'tue-17', day: 2, time: '19:30', title: 'Dinner', description: 'Grilled paneer + Quinoa + Roasted vegetables + Green salad', type: 'meal', completed: false, reminder: true },
  { id: 'tue-18', day: 2, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Wednesday', type: 'personal', completed: false }
];

export default tuesdayTasks; 