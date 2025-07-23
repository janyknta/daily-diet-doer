import sundayTasks from './sunday';
import mondayTasks from './monday';
import tuesdayTasks from './tuesday';
import wednesdayTasks from './wednesday';
import thursdayTasks from './thursday';
import fridayTasks from './friday';
import saturdayTasks from './saturday';

const weeklyTasks = [
  ...sundayTasks,
  ...mondayTasks,
  ...tuesdayTasks,
  ...wednesdayTasks,
  ...thursdayTasks,
  ...fridayTasks,
  ...saturdayTasks,
];

export default weeklyTasks; 