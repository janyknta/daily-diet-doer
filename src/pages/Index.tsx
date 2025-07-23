import { useState } from "react";
import Navigation from "@/components/Navigation";
import DailyPlanner from "@/components/DailyPlanner";
import ShoppingList from "@/components/ShoppingList";
import CalendarView from "@/components/CalendarView";
import SettingsView from "@/components/SettingsView";

const Index = () => {
  const [activeView, setActiveView] = useState('planner');

  const renderActiveView = () => {
    switch (activeView) {
      case 'planner':
        return <DailyPlanner />;
      case 'shopping':
        return <ShoppingList />;
      case 'calendar':
        return <CalendarView />;
      case 'reminders':
        return (
          <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-2">Reminders</h1>
            <p className="text-muted-foreground">Coming soon - Smart reminder system</p>
          </div>
        );
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