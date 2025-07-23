import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, ShoppingCart, Bell, Utensils } from "lucide-react";

interface Task {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'meal' | 'work' | 'prep' | 'shopping' | 'exercise' | 'personal';
  completed: boolean;
  reminder?: boolean;
}

interface Meal {
  time: string;
  name: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const DailyPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      time: '5:00',
      title: 'Wake Up',
      description: 'Start the day fresh',
      type: 'personal',
      completed: false,
      reminder: true
    },
    {
      id: '2',
      time: '5:15',
      title: 'Deep Learning Session',
      description: 'No distraction focused learning (90 min)',
      type: 'work',
      completed: false,
      reminder: true
    },
    {
      id: '3',
      time: '6:00',
      title: 'Morning Soaked Combo',
      description: '2 Kimia dates + 6 almonds + 2 walnuts + 1 Brazil nut + 8 black raisins + 1 tsp chia + 1 banana',
      type: 'meal',
      completed: false,
      reminder: true
    },
    {
      id: '4',
      time: '7:00',
      title: 'Gym Session',
      description: 'Workout (75 min)',
      type: 'exercise',
      completed: false,
      reminder: true
    },
    {
      id: '5',
      time: '8:15',
      title: 'Shopping & Return',
      description: 'Buy chicken (200g), eggs (5), return from gym',
      type: 'shopping',
      completed: false,
      reminder: true
    },
    {
      id: '6',
      time: '8:40',
      title: 'Breakfast Prep',
      description: 'Boil eggs, prepare breakfast, lunch prep, shower',
      type: 'prep',
      completed: false,
      reminder: true
    },
    {
      id: '7',
      time: '7:30',
      title: 'Post-Workout Breakfast',
      description: 'Sattu shake + 3 boiled eggs + Greek yogurt',
      type: 'meal',
      completed: false,
      reminder: true
    }
  ]);

  const todaysMeals: Meal[] = [
    {
      time: '6:00 AM',
      name: 'Morning Soaked Combo',
      foods: ['2 Kimia dates', '6 almonds', '2 walnuts', '1 Brazil nut', '8 black raisins', '1 tsp chia', '1 banana'],
      calories: 320,
      protein: 6,
      carbs: 45,
      fats: 14
    },
    {
      time: '7:30 AM',
      name: 'Post-Workout Breakfast',
      foods: ['Sattu shake (250ml milk + 25g sattu + jaggery + cinnamon)', '3 boiled eggs', 'Greek yogurt (200g)'],
      calories: 850,
      protein: 50,
      carbs: 75,
      fats: 32
    },
    {
      time: '11:00 AM',
      name: 'Mid-Morning Snack',
      foods: ['Chia pudding (milk 150ml + chia 2 tsp)', '2 soaked figs', 'pomegranate 50g'],
      calories: 220,
      protein: 6,
      carbs: 30,
      fats: 8
    }
  ];

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTypeColor = (type: string) => {
    const colors = {
      meal: 'bg-primary text-primary-foreground',
      work: 'bg-accent text-accent-foreground', 
      prep: 'bg-warning text-warning-foreground',
      shopping: 'bg-success text-success-foreground',
      exercise: 'bg-destructive text-destructive-foreground',
      personal: 'bg-secondary text-secondary-foreground'
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      meal: <Utensils className="h-4 w-4" />,
      work: <Clock className="h-4 w-4" />,
      prep: <Bell className="h-4 w-4" />,
      shopping: <ShoppingCart className="h-4 w-4" />,
      exercise: <CheckCircle className="h-4 w-4" />,
      personal: <Bell className="h-4 w-4" />
    };
    return icons[type as keyof typeof icons];
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Daily Planner</h1>
        <p className="text-muted-foreground">Your personalized meal and activity schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    task.completed 
                      ? 'bg-muted/50 opacity-60' 
                      : 'bg-card hover:shadow-md'
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTask(task.id)}
                    className={`h-6 w-6 rounded-full p-0 ${
                      task.completed 
                        ? 'bg-success text-success-foreground' 
                        : 'border-2 border-border'
                    }`}
                  >
                    {task.completed && <CheckCircle className="h-4 w-4" />}
                  </Button>
                  
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <span className="font-mono text-sm font-medium">{task.time}</span>
                    {task.reminder && <Bell className="h-3 w-3 text-warning" />}
                  </div>

                  <Badge className={`${getTypeColor(task.type)} gap-1`}>
                    {getTypeIcon(task.type)}
                    {task.type}
                  </Badge>

                  <div className="flex-1">
                    <h4 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Meal Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Today's Meals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysMeals.map((meal, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-medium">{meal.time}</span>
                    <Badge variant="outline">{meal.calories} kcal</Badge>
                  </div>
                  <h4 className="font-medium mb-2">{meal.name}</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {meal.foods.slice(0, 2).map((food, i) => (
                      <li key={i}>• {food}</li>
                    ))}
                    {meal.foods.length > 2 && (
                      <li>... +{meal.foods.length - 2} more</li>
                    )}
                  </ul>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="px-2 py-1 bg-success/10 text-success rounded">P: {meal.protein}g</span>
                    <span className="px-2 py-1 bg-warning/10 text-warning rounded">C: {meal.carbs}g</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded">F: {meal.fats}g</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Shopping List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Chicken breast (200g)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Eggs (5 pieces)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Greek yogurt (200g)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Spinach (100g)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;