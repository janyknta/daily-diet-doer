import { useState } from "react";
import Navigation from "@/components/Navigation";
import DailyPlanner from "@/components/DailyPlanner";
import ShoppingList from "@/components/ShoppingList";

const Index = () => {
  const [activeView, setActiveView] = useState('planner');

  const renderActiveView = () => {
    switch (activeView) {
      case 'planner':
        return <DailyPlanner />;
      case 'shopping':
        return <ShoppingList />;
      case 'calendar':
        return (
          <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-2">Calendar View</h1>
            <p className="text-muted-foreground">Coming soon - Weekly and monthly calendar views</p>
          </div>
        );
      case 'reminders':
        return (
          <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-2">Reminders</h1>
            <p className="text-muted-foreground">Coming soon - Smart reminder system</p>
          </div>
        );
      case 'settings':
        return (
          <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Coming soon - Customize your meal plans and preferences</p>
          </div>
        );
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