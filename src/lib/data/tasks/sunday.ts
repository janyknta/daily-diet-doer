import { Task } from '../../types';

const sundayTasks: Task[] = [
  { id: 'sun-1', day: 0, time: '5:00', title: 'Wake Up', description: 'Start the day fresh', type: 'personal', completed: false, reminder: true },
  { id: 'sun-2', day: 0, time: '5:15', title: 'Deep Learning Session', description: 'No distraction focused learning (90 min)', type: 'learning', completed: false, reminder: true },
  { id: 'sun-3', day: 0, time: '6:00', title: 'Morning Soaked Combo', description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana', type: 'meal', completed: false, reminder: true },
  { id: 'sun-4', day: 0, time: '7:00', title: 'Gym Session', description: 'Workout (75 min)', type: 'exercise', completed: false, reminder: true },
  { id: 'sun-5', day: 0, time: '7:30', title: 'Post-Workout Breakfast', description: 'Sattu shake + 3 boiled eggs + Greek yogurt', type: 'meal', completed: false, reminder: true },
  { id: 'sun-6', day: 0, time: '8:15', title: 'Shopping & Return', description: 'Buy chicken (200g), eggs (5), return from gym', type: 'shopping', completed: false, reminder: true },
  { id: 'sun-7', day: 0, time: '8:40', title: 'Breakfast Prep', description: 'Boil eggs, prepare breakfast, lunch prep, shower', type: 'prep', completed: false, reminder: true },
  { id: 'sun-8', day: 0, time: '10:00', title: 'House Cleaning', description: 'Weekly deep cleaning - vacuum, mop, dust', type: 'chore', completed: false, reminder: true },
  { id: 'sun-9', day: 0, time: '11:00', title: 'Mid-Morning Snack', description: 'Chia pudding + 2 soaked figs + pomegranate', type: 'meal', completed: false, reminder: true },
  { id: 'sun-10', day: 0, time: '12:00', title: 'Laundry', description: 'Wash, dry and fold clothes', type: 'chore', completed: false, reminder: true },
  { id: 'sun-11', day: 0, time: '13:00', title: 'Lunch', description: 'Rice + Dal + Mixed vegetables + Salad', type: 'meal', completed: false, reminder: true },
  { id: 'sun-12', day: 0, time: '14:00', title: 'Rest & Personal Time', description: 'Reading, relaxation, family time', type: 'personal', completed: false },
  { id: 'sun-13', day: 0, time: '16:00', title: 'Evening Snack', description: 'Green tea + 1 apple + Mixed nuts', type: 'meal', completed: false, reminder: true },
  { id: 'sun-14', day: 0, time: '17:00', title: 'Meal Prep for Week', description: 'Prepare meals and snacks for upcoming week', type: 'prep', completed: false, reminder: true },
  { id: 'sun-15', day: 0, time: '19:30', title: 'Dinner', description: 'Grilled chicken + Quinoa + Steamed broccoli + Avocado salad', type: 'meal', completed: false, reminder: true },
  { id: 'sun-16', day: 0, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Monday', type: 'personal', completed: false }
];

export default sundayTasks; 