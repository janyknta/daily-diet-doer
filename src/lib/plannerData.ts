import { getTaskCompletion } from './storage';

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

export const weeklyMeals: Meal[] = [
  // Sunday (day 0)
  {
    day: 0,
    time: '6:00',
    name: 'Morning Soaked Combo',
    foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
    calories: 320,
    protein: 6,
    carbs: 45,
    fats: 14
  },
  {
    day: 0,
    time: '7:30',
    name: 'Post-Workout Breakfast',
    foods: ['Sattu shake (250ml milk + 25g sattu + jaggery + cinnamon)', '3 boiled eggs', 'Greek yogurt (200g)'],
    calories: 850,
    protein: 50,
    carbs: 75,
    fats: 32
  },
  {
    day: 0,
    time: '11:00',
    name: 'Mid-Morning Snack',
    foods: ['Chia pudding (milk 150ml + chia 2 tsp)', '2 soaked figs', 'pomegranate 50g'],
    calories: 220,
    protein: 6,
    carbs: 30,
    fats: 8
  },
  {
    day: 0,
    time: '13:00',
    name: 'Lunch',
    foods: ['Rice (150g)', 'Dal (100g)', 'Mixed vegetables', 'Salad'],
    calories: 450,
    protein: 18,
    carbs: 65,
    fats: 12
  },
  {
    day: 0,
    time: '16:00',
    name: 'Evening Snack',
    foods: ['Green tea', '1 apple', 'Mixed nuts (20g)'],
    calories: 180,
    protein: 4,
    carbs: 25,
    fats: 8
  },
  {
    day: 0,
    time: '19:30',
    name: 'Dinner',
    foods: ['Grilled chicken (150g)', 'Quinoa (100g)', 'Steamed broccoli', 'Avocado salad'],
    calories: 520,
    protein: 38,
    carbs: 35,
    fats: 22
  },

  // Monday (day 1) - Repeat similar pattern
  {
    day: 1,
    time: '6:00',
    name: 'Morning Soaked Combo',
    foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
    calories: 320,
    protein: 6,
    carbs: 45,
    fats: 14
  },
  {
    day: 1,
    time: '7:30',
    name: 'Post-Workout Breakfast',
    foods: ['Sattu shake (250ml milk + 25g sattu + jaggery + cinnamon)', '3 boiled eggs', 'Greek yogurt (200g)'],
    calories: 850,
    protein: 50,
    carbs: 75,
    fats: 32
  },
  {
    day: 1,
    time: '11:00',
    name: 'Mid-Morning Snack',
    foods: ['Protein smoothie', 'Handful of berries', '1 tsp honey'],
    calories: 200,
    protein: 8,
    carbs: 28,
    fats: 6
  },
  {
    day: 1,
    time: '13:00',
    name: 'Lunch',
    foods: ['Brown rice (150g)', 'Lentil curry', 'Spinach sabzi', 'Cucumber salad'],
    calories: 420,
    protein: 16,
    carbs: 62,
    fats: 10
  },
  {
    day: 1,
    time: '16:00',
    name: 'Evening Snack',
    foods: ['Herbal tea', '1 orange', 'Roasted chickpeas (30g)'],
    calories: 160,
    protein: 6,
    carbs: 28,
    fats: 3
  },
  {
    day: 1,
    time: '19:30',
    name: 'Dinner',
    foods: ['Grilled fish (150g)', 'Sweet potato (100g)', 'Green beans', 'Mixed salad'],
    calories: 480,
    protein: 35,
    carbs: 32,
    fats: 18
  },

  // Tuesday (day 2)
  {
    day: 2,
    time: '6:00',
    name: 'Morning Soaked Combo',
    foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
    calories: 320,
    protein: 6,
    carbs: 45,
    fats: 14
  },
  {
    day: 2,
    time: '7:30',
    name: 'Post-Workout Breakfast',
    foods: ['Oats (50g) with milk', '2 boiled eggs', 'Greek yogurt (150g)', 'Berries'],
    calories: 580,
    protein: 28,
    carbs: 52,
    fats: 22
  },
  {
    day: 2,
    time: '11:00',
    name: 'Mid-Morning Snack',
    foods: ['Green smoothie', '1 apple', 'Chia seeds (1 tsp)'],
    calories: 180,
    protein: 4,
    carbs: 32,
    fats: 5
  },
  {
    day: 2,
    time: '13:00',
    name: 'Lunch',
    foods: ['Roti (2 pieces)', 'Chicken curry (100g)', 'Mixed vegetables', 'Raita'],
    calories: 520,
    protein: 28,
    carbs: 48,
    fats: 18
  },
  {
    day: 2,
    time: '16:00',
    name: 'Evening Snack',
    foods: ['Green tea', 'Homemade energy balls (2)', 'Almonds (10)'],
    calories: 220,
    protein: 6,
    carbs: 18,
    fats: 14
  },
  {
    day: 2,
    time: '19:30',
    name: 'Dinner',
    foods: ['Grilled paneer (100g)', 'Quinoa (80g)', 'Roasted vegetables', 'Green salad'],
    calories: 450,
    protein: 25,
    carbs: 35,
    fats: 20
  },

  // Wednesday (day 3)
  {
    day: 3,
    time: '6:00',
    name: 'Morning Soaked Combo',
    foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
    calories: 320,
    protein: 6,
    carbs: 45,
    fats: 14
  },
  {
    day: 3,
    time: '7:30',
    name: 'Post-Workout Breakfast',
    foods: ['Sattu shake (250ml milk + 25g sattu + jaggery + cinnamon)', '3 boiled eggs', 'Greek yogurt (200g)'],
    calories: 850,
    protein: 50,
    carbs: 75,
    fats: 32
  },
  {
    day: 3,
    time: '11:00',
    name: 'Mid-Morning Snack',
    foods: ['Coconut water', '1 pear', 'Walnuts (6 halves)'],
    calories: 190,
    protein: 3,
    carbs: 26,
    fats: 9
  },
  {
    day: 3,
    time: '13:00',
    name: 'Lunch',
    foods: ['Brown rice (120g)', 'Rajma curry', 'Aloo gobi', 'Pickle'],
    calories: 480,
    protein: 18,
    carbs: 68,
    fats: 12
  },
  {
    day: 3,
    time: '16:00',
    name: 'Evening Snack',
    foods: ['Masala chai', 'Roasted makhana (30g)', 'Dates (2)'],
    calories: 180,
    protein: 4,
    carbs: 30,
    fats: 4
  },
  {
    day: 3,
    time: '19:30',
    name: 'Dinner',
    foods: ['Grilled chicken (150g)', 'Millet khichdi', 'Sautéed spinach', 'Yogurt'],
    calories: 520,
    protein: 38,
    carbs: 35,
    fats: 20
  },

  // Thursday (day 4)
  {
    day: 4,
    time: '6:00',
    name: 'Morning Soaked Combo',
    foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
    calories: 320,
    protein: 6,
    carbs: 45,
    fats: 14
  },
  {
    day: 4,
    time: '7:30',
    name: 'Post-Workout Breakfast',
    foods: ['Protein pancakes (2)', 'Greek yogurt (150g)', 'Honey (1 tsp)', 'Berries'],
    calories: 520,
    protein: 32,
    carbs: 48,
    fats: 16
  },
  {
    day: 4,
    time: '11:00',
    name: 'Mid-Morning Snack',
    foods: ['Green tea', 'Banana', 'Peanut butter (1 tbsp)'],
    calories: 220,
    protein: 6,
    carbs: 28,
    fats: 10
  },
  {
    day: 4,
    time: '13:00',
    name: 'Lunch',
    foods: ['Quinoa salad', 'Grilled vegetables', 'Chickpeas (100g)', 'Tahini dressing'],
    calories: 480,
    protein: 20,
    carbs: 55,
    fats: 18
  },
  {
    day: 4,
    time: '16:00',
    name: 'Evening Snack',
    foods: ['Herbal tea', 'Apple slices', 'Almonds (12)'],
    calories: 180,
    protein: 5,
    carbs: 18,
    fats: 12
  },
  {
    day: 4,
    time: '19:30',
    name: 'Dinner',
    foods: ['Baked salmon (150g)', 'Brown rice (100g)', 'Steamed broccoli', 'Lemon salad'],
    calories: 550,
    protein: 40,
    carbs: 38,
    fats: 22
  },

  // Friday (day 5)
  {
    day: 5,
    time: '6:00',
    name: 'Morning Soaked Combo',
    foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
    calories: 320,
    protein: 6,
    carbs: 45,
    fats: 14
  },
  {
    day: 5,
    time: '7:30',
    name: 'Post-Workout Breakfast',
    foods: ['Sattu shake (250ml milk + 25g sattu + jaggery + cinnamon)', '3 boiled eggs', 'Greek yogurt (200g)'],
    calories: 850,
    protein: 50,
    carbs: 75,
    fats: 32
  },
  {
    day: 5,
    time: '11:00',
    name: 'Mid-Morning Snack',
    foods: ['Fresh juice', 'Roasted seeds mix (20g)', '1 kiwi'],
    calories: 200,
    protein: 5,
    carbs: 28,
    fats: 8
  },
  {
    day: 5,
    time: '13:00',
    name: 'Lunch',
    foods: ['Fish curry', 'Brown rice (150g)', 'Okra sabzi', 'Buttermilk'],
    calories: 520,
    protein: 32,
    carbs: 58,
    fats: 14
  },
  {
    day: 5,
    time: '16:00',
    name: 'Evening Snack',
    foods: ['Green tea', 'Homemade granola (30g)', 'Yogurt (100g)'],
    calories: 210,
    protein: 8,
    carbs: 24,
    fats: 8
  },
  {
    day: 5,
    time: '19:30',
    name: 'Dinner',
    foods: ['Grilled chicken (150g)', 'Roti (1)', 'Dal', 'Mixed vegetables'],
    calories: 520,
    protein: 38,
    carbs: 40,
    fats: 18
  },

  // Saturday (day 6)
  {
    day: 6,
    time: '6:00',
    name: 'Morning Soaked Combo',
    foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
    calories: 320,
    protein: 6,
    carbs: 45,
    fats: 14
  },
  {
    day: 6,
    time: '7:30',
    name: 'Post-Workout Breakfast',
    foods: ['Weekend special smoothie bowl', 'Greek yogurt (200g)', 'Granola (30g)', 'Fresh fruits'],
    calories: 620,
    protein: 28,
    carbs: 68,
    fats: 22
  },
  {
    day: 6,
    time: '11:00',
    name: 'Mid-Morning Snack',
    foods: ['Coffee', 'Dark chocolate (20g)', 'Mixed nuts (15g)'],
    calories: 240,
    protein: 5,
    carbs: 18,
    fats: 16
  },
  {
    day: 6,
    time: '13:00',
    name: 'Lunch',
    foods: ['Weekend special biryani', 'Raita', 'Boiled egg', 'Salad'],
    calories: 580,
    protein: 25,
    carbs: 72,
    fats: 18
  },
  {
    day: 6,
    time: '16:00',
    name: 'Evening Snack',
    foods: ['Masala chai', 'Homemade cookies (2)', 'Cashews (10)'],
    calories: 250,
    protein: 6,
    carbs: 28,
    fats: 12
  },
  {
    day: 6,
    time: '19:30',
    name: 'Dinner',
    foods: ['Grilled fish (150g)', 'Jeera rice (100g)', 'Palak paneer', 'Salad'],
    calories: 540,
    protein: 35,
    carbs: 42,
    fats: 22
  }
];

export const weeklyTasks: Task[] = [
  // Sunday tasks
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
  { id: 'sun-16', day: 0, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Monday', type: 'personal', completed: false },

  // Monday tasks
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
  { id: 'mon-18', day: 1, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Tuesday', type: 'personal', completed: false },

  // Tuesday tasks  
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
  { id: 'tue-18', day: 2, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Wednesday', type: 'personal', completed: false },

  // Wednesday tasks
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
  { id: 'wed-18', day: 3, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Thursday', type: 'personal', completed: false },

  // Thursday tasks
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
  { id: 'thu-18', day: 4, time: '21:00', title: 'Plan Next Day', description: 'Review schedule and prepare for Friday', type: 'personal', completed: false },

  // Friday tasks
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
  { id: 'fri-18', day: 5, time: '21:00', title: 'Weekend Planning', description: 'Plan weekend activities and relaxation', type: 'personal', completed: false },

  // Saturday tasks
  { id: 'sat-1', day: 6, time: '5:30', title: 'Wake Up', description: 'Weekend leisurely start', type: 'personal', completed: false, reminder: true },
  { id: 'sat-2', day: 6, time: '6:00', title: 'Morning Soaked Combo', description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana', type: 'meal', completed: false, reminder: true },
  { id: 'sat-3', day: 6, time: '6:30', title: 'Reading/Personal Time', description: 'Read books, journals, personal reflection', type: 'personal', completed: false },
  { id: 'sat-4', day: 6, time: '7:30', title: 'Post-Workout Breakfast', description: 'Weekend special smoothie bowl + Greek yogurt + Granola + Fresh fruits', type: 'meal', completed: false, reminder: true },
  { id: 'sat-5', day: 6, time: '8:30', title: 'Weekend Gym Session', description: 'Longer workout (90 min) or outdoor activity', type: 'exercise', completed: false, reminder: true },
  { id: 'sat-6', day: 6, time: '10:00', title: 'Major House Cleaning', description: 'Deep cleaning - floors, windows, organizing', type: 'chore', completed: false, reminder: true },
  { id: 'sat-7', day: 6, time: '11:00', title: 'Mid-Morning Snack', description: 'Coffee + Dark chocolate + Mixed nuts', type: 'meal', completed: false, reminder: true },
  { id: 'sat-8', day: 6, time: '11:30', title: 'Errands & Shopping', description: 'Weekly errands, special shopping, appointments', type: 'shopping', completed: false },
  { id: 'sat-9', day: 6, time: '13:00', title: 'Lunch', description: 'Weekend special biryani + Raita + Boiled egg + Salad', type: 'meal', completed: false, reminder: true },
  { id: 'sat-10', day: 6, time: '14:00', title: 'Relaxation Time', description: 'Nap, leisure, family time', type: 'personal', completed: false },
  { id: 'sat-11', day: 6, time: '16:00', title: 'Evening Snack', description: 'Masala chai + Homemade cookies + Cashews', type: 'meal', completed: false, reminder: true },
  { id: 'sat-12', day: 6, time: '16:30', title: 'Hobbies/Social Time', description: 'Pursue hobbies, meet friends, entertainment', type: 'personal', completed: false },
  { id: 'sat-13', day: 6, time: '18:00', title: 'Weekend Meal Prep', description: 'Prepare some meals for next week', type: 'prep', completed: false },
  { id: 'sat-14', day: 6, time: '19:30', title: 'Dinner', description: 'Grilled fish + Jeera rice + Palak paneer + Salad', type: 'meal', completed: false, reminder: true },
  { id: 'sat-15', day: 6, time: '21:00', title: 'Entertainment', description: 'Movies, games, relaxation', type: 'personal', completed: false }
];

// Utility functions
export const getCurrentDate = () => {
  return new Date();
};

export const getTasksForDay = (day: number): Task[] => {
  return weeklyTasks.filter(task => task.day === day);
};

export const getMealsForDay = (day: number): Meal[] => {
  return weeklyMeals.filter(meal => meal.day === day);
};

// Updated to accept a specific date
export const getTaskCompletionPercentage = (day: number, date: Date = new Date()): number => {
  const tasksForDay = getTasksForDay(day);
  if (tasksForDay.length === 0) return 0;
  const completedTasks = tasksForDay.filter(task => getTaskCompletion(task.id, date)).length;
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
  return days[day];
};