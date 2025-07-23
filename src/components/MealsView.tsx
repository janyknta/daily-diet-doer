import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, ChevronDown, ChevronUp, Calendar, Target, 
  RefreshCw, Sun, Moon
} from "lucide-react";
import {
  getCurrentDate, 
  getMealsForDay, 
  getDayName
} from "@/lib/plannerData";
import { Meal } from "@/lib/types";

const MealsView = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [todaysMeals, setTodaysMeals] = useState<Meal[]>([]);
  const [expandedMeals, setExpandedMeals] = useState<Set<number>>(new Set());

  const currentDay = currentDate.getDay();

  useEffect(() => {
    const dayMeals = getMealsForDay(currentDay);
    setTodaysMeals(dayMeals);
  }, [currentDay, currentDate]);

  const refreshDate = () => {
    const newDate = getCurrentDate();
    setCurrentDate(newDate);
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
              <Utensils className="h-8 w-8 text-primary" />
              Meal Planning
            </h3>
            <p className="text-lg text-muted-foreground">
              {getDayName(currentDay)} - {currentDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={refreshDate}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Date
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Nutrition Summary */}
        <Card className="lg:col-span-1">
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
            
            <div className="grid grid-cols-1 gap-3 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">{dailyNutrition.protein}g</div>
                <div className="text-xs text-blue-600">Protein</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="font-semibold text-orange-700">{dailyNutrition.carbs}g</div>
                <div className="text-xs text-orange-600">Carbs</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-700">{dailyNutrition.fats}g</div>
                <div className="text-xs text-green-600">Fats</div>
              </div>
            </div>
            
            <Badge variant="outline" className="w-full justify-center">
              {todaysMeals.length} meals planned
            </Badge>

            {/* Meal Schedule */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Today's Schedule</h4>
              {todaysMeals.map((meal, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {getTimeIcon(meal.time)}
                  <span className="font-mono text-xs">{meal.time}</span>
                  <span className="text-muted-foreground truncate">{meal.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meals List */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {getDayName(currentDay)}'s Meals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {todaysMeals.map((meal, index) => (
              <div key={index} className="border-2 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTimeIcon(meal.time)}
                    <span className="font-mono text-lg font-medium">{meal.time}</span>
                    <h4 className="font-semibold text-xl">{meal.name}</h4>
                  </div>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-lg px-3 py-1">
                    {meal.calories} kcal
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1 mb-4">
                  {expandedMeals.has(index) ? (
                    <ul className="space-y-2">
                      {meal.foods.map((food, i) => (
                        <li key={i} className="flex items-center gap-2 text-base">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {food}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-2">
                      {meal.foods.slice(0, 3).map((food, i) => (
                        <li key={i} className="flex items-center gap-2 text-base">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {food}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {meal.foods.length > 3 && (
                    <button
                      onClick={() => toggleMealExpansion(index)}
                      className="flex items-center gap-1 text-primary hover:text-primary/80 mt-3 text-sm font-medium"
                    >
                      {expandedMeals.has(index) ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          +{meal.foods.length - 3} more items
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Protein: {meal.protein}g
                  </span>
                  <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    Carbs: {meal.carbs}g
                  </span>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Fats: {meal.fats}g
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealsView;