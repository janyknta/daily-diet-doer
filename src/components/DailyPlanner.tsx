import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, CheckCircle, Bell, Utensils, RefreshCw, Plus, Trash2, 
  ChevronDown, ChevronUp, Calendar, Target, Activity, 
  Zap, Moon, Sun, TrendingUp, ShoppingCart
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  getCurrentDate, 
  getTasksForDay, 
  getMealsForDay, 
  getDayName,
  getTaskCompletionPercentage 
} from "@/lib/plannerData";
import { saveTaskProgress, getTaskCompletion } from "@/lib/storage";
import { Meal, Task } from "@/lib/types";

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

  const currentDay = currentDate.getDay();

  useEffect(() => {
    const dayTasks = getTasksForDay(currentDay);
    const dayMeals = getMealsForDay(currentDay);
    
    const tasksWithCompletion = dayTasks.map(task => ({
      ...task,
      completed: getTaskCompletion(task.id, currentDate)
    }));
    
    setTasks(tasksWithCompletion);
    setTodaysMeals(dayMeals);
  }, [currentDay, currentDate]);

  const refreshDate = () => {
    const newDate = getCurrentDate();
    setCurrentDate(newDate);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        saveTaskProgress(taskId, newCompleted, currentDate);
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
    saveTaskProgress(taskId, false, currentDate);
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
      meal: 'bg-orange-500/10 text-orange-700 border-orange-200',
      work: 'bg-blue-500/10 text-blue-700 border-blue-200',
      prep: 'bg-purple-500/10 text-purple-700 border-purple-200',
      shopping: 'bg-green-500/10 text-green-700 border-green-200',
      exercise: 'bg-red-500/10 text-red-700 border-red-200',
      personal: 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
      chore: 'bg-gray-500/10 text-gray-700 border-gray-200',
      learning: 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 border-gray-200';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      meal: <Utensils className="h-3 w-3" />,
      work: <Clock className="h-3 w-3" />,
      prep: <Target className="h-3 w-3" />,
      shopping: <ShoppingCart className="h-3 w-3" />,
      exercise: <Activity className="h-3 w-3" />,
      personal: <Bell className="h-3 w-3" />,
      chore: <CheckCircle className="h-3 w-3" />,
      learning: <Zap className="h-3 w-3" />
    };
    return icons[type as keyof typeof icons];
  };

  const completionPercentage = getTaskCompletionPercentage(currentDay, currentDate);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  // Calculate daily nutrition totals
  const dailyNutrition = todaysMeals.reduce((total, meal) => ({
    calories: total.calories + meal.calories,
    protein: total.protein + meal.protein,
    carbs: total.carbs + meal.carbs,
    fats: total.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return <Sun className="h-3 w-3 text-yellow-500" />;
    if (hour >= 12 && hour < 17) return <Sun className="h-3 w-3 text-orange-500" />;
    if (hour >= 17 && hour < 21) return <Moon className="h-3 w-3 text-blue-500" />;
    return <Moon className="h-3 w-3 text-indigo-500" />;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              Daily Planner
            </h3>
            <p className="text-lg text-muted-foreground">
              {getDayName(currentDay)} - {currentDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-col lg:items-end gap-2">
            <Button 
              variant="outline" 
              onClick={refreshDate}
              className="self-start lg:self-end"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Date
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{completionPercentage}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
              <div className="w-20 h-20 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                    className="text-primary transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content - Tasks and Schedule */}
        <div className="xl:col-span-2 space-y-6">

          {/* Tasks List */}
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
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`group relative p-4 rounded-lg border transition-all hover:shadow-sm ${
                    task.completed 
                      ? 'bg-green-50/50 border-green-200 opacity-75' 
                      : 'bg-card border-border hover:border-primary/30'
                  }`}
                >
                  {/* Top Row: Checkbox, Time, Type Badge */}
                  <div className="flex items-center gap-3 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTask(task.id)}
                      className={`h-6 w-6 rounded-full p-0 flex-shrink-0 transition-all ${
                        task.completed 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'border-2 border-muted-foreground/30 hover:border-primary hover:bg-primary/10'
                      }`}
                    >
                      {task.completed && <CheckCircle className="h-3 w-3" />}
                    </Button>
                    
                    <div className="flex items-center gap-1.5 min-w-[70px]">
                      {getTimeIcon(task.time)}
                      <span className="font-mono text-sm font-medium">{task.time}</span>
                    </div>

                    <Badge className={`${getTypeColor(task.type)} gap-1 border text-xs px-2 py-0.5`}>
                      {getTypeIcon(task.type)}
                      <span className="capitalize">{task.type}</span>
                    </Badge>

                    <div className="flex items-center gap-1 ml-auto">
                      {task.reminder && <Bell className="h-3 w-3 text-amber-500" />}
                      {task.id.startsWith('custom-') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row: Task Content */}
                  <div className="ml-9">
                    <h4 className={`font-medium text-base mb-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Meals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                {getDayName(currentDay)}'s Meals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysMeals.map((meal, index) => (
                <div key={index} className="border-2 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTimeIcon(meal.time)}
                      <span className="font-mono text-sm font-medium">{meal.time}</span>
                    </div>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {meal.calories} kcal
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-2">{meal.name}</h4>
                  
                  <div className="text-sm text-muted-foreground space-y-1 mb-3">
                    {expandedMeals.has(index) ? (
                      <ul className="space-y-1">
                        {meal.foods.map((food, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {food}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-1">
                        {meal.foods.slice(0, 2).map((food, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {food}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {meal.foods.length > 2 && (
                      <button
                        onClick={() => toggleMealExpansion(index)}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 mt-2 text-sm font-medium"
                      >
                        {expandedMeals.has(index) ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            +{meal.foods.length - 2} more items
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      P: {meal.protein}g
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      C: {meal.carbs}g
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      F: {meal.fats}g
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">{totalTasks}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="xl:col-span-1 col-span-2">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Nutrition Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Daily Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{dailyNutrition.calories}</div>
                <div className="text-sm text-muted-foreground">Total Calories</div>
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-700">{dailyNutrition.protein}g</div>
                  <div className="text-xs text-blue-600">Protein</div>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-700">{dailyNutrition.carbs}g</div>
                  <div className="text-xs text-orange-600">Carbs</div>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-700">{dailyNutrition.fats}g</div>
                  <div className="text-xs text-green-600">Fats</div>
                </div>
              </div>
              
              <Badge variant="outline" className="w-full justify-center">
                {todaysMeals.length} meals planned
              </Badge>
            </CardContent>
          </Card>

          {/* Next Task */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Task</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const nextTask = tasks.find(task => !task.completed);
                return nextTask ? (
                  <div>
                    <div className="font-medium">{nextTask.title}</div>
                    <div className="text-sm text-muted-foreground">at {nextTask.time}</div>
                    <Badge className={`mt-2 ${getTypeColor(nextTask.type)}`}>
                      {nextTask.type}
                    </Badge>
                  </div>
                ) : (
                  <div className="text-muted-foreground">All tasks completed! 🎉</div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;