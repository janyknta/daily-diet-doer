import sundayMeals from './sunday';
import mondayMeals from './monday';
import tuesdayMeals from './tuesday';
import wednesdayMeals from './wednesday';
import thursdayMeals from './thursday';
import fridayMeals from './friday';
import saturdayMeals from './saturday';

// Flat array of all meals for the week
const weeklyMeals = [
  ...sundayMeals,
  ...mondayMeals,
  ...tuesdayMeals,
  ...wednesdayMeals,
  ...thursdayMeals,
  ...fridayMeals,
  ...saturdayMeals,
];

export default weeklyMeals; 