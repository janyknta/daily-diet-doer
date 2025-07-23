import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle } from "lucide-react";
import { getTaskCompletionPercentage, getCompletionColor, getTasksForDay, getDayName } from "@/lib/plannerData";
import { cn } from "@/lib/utils";
import { getTaskCompletion } from "@/lib/storage";

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getDayOfWeek = (date: Date): number => {
    return date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  };

  const modifiers = {
    completed: (date: Date) => {
      const dayOfWeek = getDayOfWeek(date);
      const tasks = getTasksForDay(dayOfWeek);
      const completedTasks = tasks.filter(task => getTaskCompletion(task.id)).length;
      const percentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
      return percentage === 100;
    },
    mostlyCompleted: (date: Date) => {
      const dayOfWeek = getDayOfWeek(date);
      const tasks = getTasksForDay(dayOfWeek);
      const completedTasks = tasks.filter(task => getTaskCompletion(task.id)).length;
      const percentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
      return percentage >= 80 && percentage < 100;
    },
    partiallyCompleted: (date: Date) => {
      const dayOfWeek = getDayOfWeek(date);
      const tasks = getTasksForDay(dayOfWeek);
      const completedTasks = tasks.filter(task => getTaskCompletion(task.id)).length;
      const percentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
      return percentage > 0 && percentage < 80;
    },
    notStarted: (date: Date) => {
      const dayOfWeek = getDayOfWeek(date);
      const tasks = getTasksForDay(dayOfWeek);
      const completedTasks = tasks.filter(task => getTaskCompletion(task.id)).length;
      const percentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
      return percentage === 0;
    }
  };

  const modifiersStyles = {
    completed: { backgroundColor: 'hsl(142, 76%, 36%)', color: 'white' },
    mostlyCompleted: { backgroundColor: 'hsl(38, 92%, 50%)', color: 'white' },
    partiallyCompleted: { backgroundColor: 'hsl(0, 84.2%, 60.2%)', color: 'white' },
    notStarted: { backgroundColor: 'hsl(0, 0%, 0%)', color: 'white' }
  };

  const selectedDayOfWeek = selectedDate ? getDayOfWeek(selectedDate) : 0;
  const selectedDayTasks = getTasksForDay(selectedDayOfWeek);
  const completedTasksCount = selectedDayTasks.filter(task => getTaskCompletion(task.id)).length;
  const completionPercentage = selectedDayTasks.length > 0 ? Math.round((completedTasksCount / selectedDayTasks.length) * 100) : 0;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Calendar View</h1>
        <p className="text-muted-foreground">Track your daily progress and task completion</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Monthly Progress View
              </CardTitle>
              <div className="flex flex-wrap gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'hsl(142, 76%, 36%)'}}></div>
                  <span>100% Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'hsl(38, 92%, 50%)'}}></div>
                  <span>80-99% Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'hsl(0, 84.2%, 60.2%)'}}></div>
                  <span>1-79% Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'hsl(0, 0%, 0%)'}}></div>
                  <span>0% Complete</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                className={cn("w-full pointer-events-auto")}
              />
            </CardContent>
          </Card>
        </div>

        {/* Selected Day Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedDate ? getDayName(selectedDayOfWeek) : 'Select a Date'}</span>
                <Badge 
                  className="gap-1"
                  style={{ 
                    backgroundColor: getCompletionColor(completionPercentage),
                    color: 'white'
                  }}
                >
                  <CheckCircle className="h-3 w-3" />
                  {completionPercentage}%
                </Badge>
              </CardTitle>
              {selectedDate && (
                <p className="text-sm text-muted-foreground">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Tasks:</span>
                  <span className="font-medium">{selectedDayTasks.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed:</span>
                  <span className="font-medium text-success">
                    {completedTasksCount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining:</span>
                  <span className="font-medium text-destructive">
                    {selectedDayTasks.length - completedTasksCount}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${completionPercentage}%`,
                      backgroundColor: getCompletionColor(completionPercentage)
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Task Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['meal', 'work', 'exercise', 'learning', 'chore', 'prep', 'shopping', 'personal'].map(type => {
                  const typeTasks = selectedDayTasks.filter(task => task.type === type);
                  const completed = typeTasks.filter(task => getTaskCompletion(task.id)).length;
                  
                  if (typeTasks.length === 0) return null;
                  
                  return (
                    <div key={type} className="flex justify-between items-center text-sm">
                      <span className="capitalize">{type}:</span>
                      <span className="font-medium">
                        {completed}/{typeTasks.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;