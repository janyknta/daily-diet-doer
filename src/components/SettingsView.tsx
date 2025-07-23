import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Trash2, Clock, Save } from "lucide-react";
import { Task, weeklyTasks, getDayName } from "@/lib/plannerData";
import { useToast } from "@/hooks/use-toast";

interface NewTask {
  time: string;
  title: string;
  description: string;
  type: 'meal' | 'work' | 'prep' | 'shopping' | 'exercise' | 'personal' | 'chore' | 'learning';
  day: number;
  reminder: boolean;
}

const SettingsView = () => {
  const { toast } = useToast();
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTask>({
    time: '',
    title: '',
    description: '',
    type: 'personal',
    day: 0,
    reminder: false
  });
  const [isAddingTask, setIsAddingTask] = useState(false);

  const taskTypes = [
    { value: 'meal', label: 'Meal', color: 'bg-primary' },
    { value: 'work', label: 'Work', color: 'bg-accent' },
    { value: 'prep', label: 'Preparation', color: 'bg-warning' },
    { value: 'shopping', label: 'Shopping', color: 'bg-success' },
    { value: 'exercise', label: 'Exercise', color: 'bg-destructive' },
    { value: 'personal', label: 'Personal', color: 'bg-secondary' },
    { value: 'chore', label: 'Chore', color: 'bg-muted' },
    { value: 'learning', label: 'Learning', color: 'bg-primary' }
  ];

  const days = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  const handleAddTask = () => {
    if (!newTask.time || !newTask.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in time and title fields.",
        variant: "destructive"
      });
      return;
    }

    const task: Task = {
      id: `custom-${Date.now()}`,
      ...newTask,
      completed: false
    };

    setCustomTasks([...customTasks, task]);
    setNewTask({
      time: '',
      title: '',
      description: '',
      type: 'personal',
      day: 0,
      reminder: false
    });
    setIsAddingTask(false);

    toast({
      title: "Task Added",
      description: `Added "${task.title}" to ${getDayName(task.day)}`,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setCustomTasks(customTasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Task has been removed from your schedule.",
    });
  };

  const getTypeColor = (type: string) => {
    const typeObj = taskTypes.find(t => t.value === type);
    return typeObj ? typeObj.color : 'bg-muted';
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your meal plans and add personal tasks</p>
      </div>

      <div className="space-y-6">
        {/* Add New Task */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add Custom Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isAddingTask ? (
              <Button onClick={() => setIsAddingTask(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="day">Day</Label>
                    <Select value={newTask.day.toString()} onValueChange={(value) => setNewTask({...newTask, day: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map(day => (
                          <SelectItem key={day.value} value={day.value.toString()}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newTask.time}
                      onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter task description (optional)"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="type">Task Type</Label>
                  <Select value={newTask.type} onValueChange={(value: any) => setNewTask({...newTask, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={newTask.reminder}
                    onChange={(e) => setNewTask({...newTask, reminder: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="reminder">Set reminder</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddTask} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Task
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingTask(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Custom Tasks List */}
        {customTasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Your Custom Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm font-medium">{task.time}</span>
                  </div>

                  <Badge className={`${getTypeColor(task.type)} text-white gap-1`}>
                    {task.type}
                  </Badge>

                  <div className="flex-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Scheduled for {getDayName(task.day)}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="local">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Time</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notifications">Default Notifications</Label>
                <Select defaultValue="15min">
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">5 minutes before</SelectItem>
                    <SelectItem value="15min">15 minutes before</SelectItem>
                    <SelectItem value="30min">30 minutes before</SelectItem>
                    <SelectItem value="1hour">1 hour before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="autoComplete" className="rounded" defaultChecked />
              <Label htmlFor="autoComplete">Auto-mark past tasks as incomplete if not done</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="showCalories" className="rounded" defaultChecked />
              <Label htmlFor="showCalories">Show calorie information in meal tasks</Label>
            </div>

            <Button className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsView;