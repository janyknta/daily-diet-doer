import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import DailyPlanner from "@/components/DailyPlanner";
import MealsView from "@/components/MealsView";
import ShoppingList from "@/components/ShoppingList";
import CalendarView from "@/components/CalendarView";
import SettingsView from "@/components/SettingsView";

const Index = () => {
  const [activeView, setActiveView] = useState('planner');

  // Handle PWA shortcut navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    if (view && ['planner', 'meals', 'shopping', 'calendar', 'settings'].includes(view)) {
      setActiveView(view);
    }
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'planner':
        return <DailyPlanner />;
      case 'meals':
        return <MealsView />;
      case 'shopping':
        return <ShoppingList />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DailyPlanner />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      {renderActiveView()}
    </div>
  );
};

export default Index;