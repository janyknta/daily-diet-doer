import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, ShoppingCart, Bell, Utensils, RefreshCw, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Task, 
  Meal, 
  weeklyTasks, 
  weeklyMeals, 
  getCurrentDate, 
  getTasksForDay, 
  getMealsForDay, 
  getDayName,
  getTaskCompletionPercentage 
} from "@/lib/plannerData";
import { saveTaskProgress, getTaskCompletion } from "@/lib/storage";

const DailyPlanner = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todaysMeals, setTodaysMeals] = useState<Meal[]>([]);
  const [expandedMeals, setExpandedMeals] = useState<Set<number>>(new Set());
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    time: '',
    title: '',
    description: '',
    type: 'personal' as Task['type'],
    reminder: false
  });

  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Load tasks and meals for current day
  useEffect(() => {
    const dayTasks = getTasksForDay(currentDay);
    const dayMeals = getMealsForDay(currentDay);
    
    // Load tasks with their completion status from storage
    const tasksWithCompletion = dayTasks.map(task => ({
      ...task,
      completed: getTaskCompletion(task.id)
    }));
    
    setTasks(tasksWithCompletion);
    setTodaysMeals(dayMeals);
  }, [currentDay]);

  const refreshDate = () => {
    const newDate = getCurrentDate();
    setCurrentDate(newDate);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        saveTaskProgress(taskId, newCompleted);
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (!newTask.time || !newTask.title) return;

    const task: Task = {
      id: `custom-${Date.now()}`,
      day: currentDay,
      ...newTask,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTask({
      time: '',
      title: '',
      description: '',
      type: 'personal',
      reminder: false
    });
    setIsAddTaskOpen(false);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    // Also remove from storage
    saveTaskProgress(taskId, false);
  };

  const toggleMealExpansion = (mealIndex: number) => {
    const newExpanded = new Set(expandedMeals);
    if (newExpanded.has(mealIndex)) {
      newExpanded.delete(mealIndex);
    } else {
      newExpanded.add(mealIndex);
    }
    setExpandedMeals(newExpanded);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      meal: 'bg-primary text-primary-foreground',
      work: 'bg-accent text-accent-foreground', 
      prep: 'bg-warning text-warning-foreground',
      shopping: 'bg-success text-success-foreground',
      exercise: 'bg-destructive text-destructive-foreground',
      personal: 'bg-secondary text-secondary-foreground',
      chore: 'bg-muted text-muted-foreground',
      learning: 'bg-primary text-primary-foreground'
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
      personal: <Bell className="h-4 w-4" />,
      chore: <Bell className="h-4 w-4" />,
      learning: <Clock className="h-4 w-4" />
    };
    return icons[type as keyof typeof icons];
  };

  const completionPercentage = getTaskCompletionPercentage(currentDay);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Daily Planner</h1>
            <p className="text-muted-foreground">
              {getDayName(currentDay)} - {currentDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <Button 
              variant="outline" 
              onClick={refreshDate}
              className="mb-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Date
            </Button>
            <div className="text-lg font-semibold">
              Progress: {completionPercentage}%
            </div>
            <div className="w-32 bg-muted rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full bg-success transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {getDayName(currentDay)}'s Schedule
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {tasks.length} tasks
                  </Badge>
                  <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <Plus className="h-3 w-3" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="time">Time</Label>
                            <Input
                              id="time"
                              type="time"
                              value={newTask.time}
                              onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="type">Type</Label>
                            <Select value={newTask.type} onValueChange={(value: Task['type']) => setNewTask({...newTask, type: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="meal">Meal</SelectItem>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="prep">Preparation</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="exercise">Exercise</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="chore">Chore</SelectItem>
                                <SelectItem value="learning">Learning</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            placeholder="Task title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            placeholder="Task description"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="reminder"
                            checked={newTask.reminder}
                            onChange={(e) => setNewTask({...newTask, reminder: e.target.checked})}
                          />
                          <Label htmlFor="reminder">Set reminder</Label>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addTask} className="flex-1">Add Task</Button>
                          <Button variant="outline" onClick={() => setIsAddTaskOpen(false)} className="flex-1">Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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

                  {task.id.startsWith('custom-') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Meal Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  {getDayName(currentDay)}'s Meals
                </div>
                <Badge variant="outline" className="text-sm">
                  {todaysMeals.length} meals
                </Badge>
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
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    {expandedMeals.has(index) ? (
                      <ul className="space-y-1">
                        {meal.foods.map((food, i) => (
                          <li key={i}>• {food}</li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-1">
                        {meal.foods.slice(0, 2).map((food, i) => (
                          <li key={i}>• {food}</li>
                        ))}
                      </ul>
                    )}
                    
                    {meal.foods.length > 2 && (
                      <button
                        onClick={() => toggleMealExpansion(index)}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 mt-2"
                      >
                        {expandedMeals.has(index) ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            +{meal.foods.length - 2} more
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
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