import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle, ChevronLeft, ChevronRight, Target, TrendingUp } from "lucide-react";
import { getTaskCompletionPercentage, getCompletionColor, getTasksForDay, getDayName } from "@/lib/plannerData";
import { cn } from "@/lib/utils";
import { getTaskCompletion } from "@/lib/storage";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get the first day of the month and number of days
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Calculate completion percentage for a specific date
  const getDateCompletionPercentage = (date: Date): number => {
    const dayOfWeek = date.getDay();
    const tasks = getTasksForDay(dayOfWeek);
    if (tasks.length === 0) return 0;
    
    const completedTasks = tasks.filter(task => getTaskCompletion(task.id, date)).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  const isToday = (date: Date) => 
    date.toDateString() === today.toDateString();
  const isSelected = (date: Date) => 
    selectedDate && date.toDateString() === selectedDate.toDateString();

  // Selected day details
  const selectedDayOfWeek = selectedDate ? selectedDate.getDay() : 0;
  const selectedDayTasks = getTasksForDay(selectedDayOfWeek);
  const completedTasksCount = selectedDate ? 
    selectedDayTasks.filter(task => getTaskCompletion(task.id, selectedDate)).length : 0;
  const completionPercentage = selectedDayTasks.length > 0 ? 
    Math.round((completedTasksCount / selectedDayTasks.length) * 100) : 0;

  // Monthly stats
  const getMonthlyStats = () => {
    let totalDays = 0;
    let perfectDays = 0;
    let totalCompletion = 0;

    for (let day = 1; day <= Math.min(daysInMonth, today.getDate()); day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      if (date <= today) {
        const percentage = getDateCompletionPercentage(date);
        totalCompletion += percentage;
        if (percentage === 100) perfectDays++;
        totalDays++;
      }
    }

    return {
      averageCompletion: totalDays > 0 ? Math.round(totalCompletion / totalDays) : 0,
      perfectDays,
      totalDays
    };
  };

  const monthlyStats = getMonthlyStats();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Progress Calendar</h1>
        <p className="text-muted-foreground">Visualize your daily achievements and track your progress</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Calendar */}
        <div className="xl:col-span-3">
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CalendarDays className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {monthlyStats.perfectDays} perfect days • {monthlyStats.averageCompletion}% average completion
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={goToToday}>
                    Today
                  </Button>
                  <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Calendar Grid */}
              <div className="bg-muted/30 p-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="h-10 flex items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">{day}</span>
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => {
                    if (!date) {
                      return <div key={index} className="h-16" />;
                    }

                    const percentage = getDateCompletionPercentage(date);
                    const isPast = date < today;
                    const isFuture = date > today;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "h-16 p-2 rounded-lg cursor-pointer transition-all duration-200 group relative border",
                          "hover:shadow-md hover:scale-105",
                          isSelected(date) 
                            ? "ring-2 ring-primary ring-offset-2 bg-primary/5" 
                            : "bg-background hover:bg-accent/50",
                          isToday(date) && "border-primary border-2",
                          isFuture && "opacity-60"
                        )}
                      >
                        {/* Date Number */}
                        <div className="flex items-start justify-between h-full">
                          <span className={cn(
                            "text-sm font-medium",
                            isToday(date) && "text-primary font-bold",
                            isSelected(date) && "text-primary"
                          )}>
                            {date.getDate()}
                          </span>
                          
                          {/* Completion Indicator */}
                          {!isFuture && (
                            <div className="flex flex-col items-end gap-1">
                              {percentage > 0 && (
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getCompletionColor(percentage) }}
                                />
                              )}
                              {percentage === 100 && (
                                <CheckCircle className="w-3 h-3 text-green-500" />
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Progress Bar */}
                        {!isFuture && percentage > 0 && (
                          <div className="absolute bottom-1 left-1 right-1">
                            <div className="w-full bg-muted rounded-full h-1">
                              <div 
                                className="h-1 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${percentage}%`,
                                  backgroundColor: getCompletionColor(percentage)
                                }}
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Hover Tooltip */}
                        {!isFuture && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                            {percentage}% complete
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="p-4 border-t bg-background">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="text-muted-foreground font-medium">Progress:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>100% Complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>80-99%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>1-79%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span>0%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Day Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{selectedDate ? getDayName(selectedDayOfWeek) : 'Select a Date'}</span>
                <Badge 
                  variant="secondary"
                  className="gap-1"
                  style={{ 
                    backgroundColor: getCompletionColor(completionPercentage),
                    color: 'white'
                  }}
                >
                  <Target className="h-3 w-3" />
                  {completionPercentage}%
                </Badge>
              </CardTitle>
              {selectedDate && (
                <p className="text-sm text-muted-foreground">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short',
                    day: 'numeric' 
                  })}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{selectedDayTasks.length}</div>
                  <div className="text-muted-foreground">Total Tasks</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{completedTasksCount}</div>
                  <div className="text-muted-foreground">Completed</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ 
                      width: `${completionPercentage}%`,
                      backgroundColor: getCompletionColor(completionPercentage)
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="text-sm">Perfect Days</span>
                  <span className="font-bold text-green-600">{monthlyStats.perfectDays}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="text-sm">Average Completion</span>
                  <span className="font-bold">{monthlyStats.averageCompletion}%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="text-sm">Days Tracked</span>
                  <span className="font-bold">{monthlyStats.totalDays}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Task Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['meal', 'work', 'exercise', 'learning', 'chore', 'prep', 'shopping', 'personal'].map(type => {
                  const typeTasks = selectedDayTasks.filter(task => task.type === type);
                  const completed = selectedDate ? 
                    typeTasks.filter(task => getTaskCompletion(task.id, selectedDate)).length : 0;
                  
                  if (typeTasks.length === 0) return null;
                  
                  return (
                    <div key={type} className="flex justify-between items-center py-1">
                      <span className="capitalize text-sm">{type}</span>
                      <Badge variant="outline" className="text-xs">
                        {completed}/{typeTasks.length}
                      </Badge>
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