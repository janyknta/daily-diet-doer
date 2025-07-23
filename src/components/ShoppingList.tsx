import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Calendar, Clock, Plus, Trash2, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateSmartShoppingList, getShoppingSchedule, type ShoppingItem } from "@/lib/shoppingHelpers";

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [shoppingSchedule, setShoppingSchedule] = useState<Array<{
    date: string;
    time: string;
    description: string;
    items: string[];
    urgency: 'high' | 'medium' | 'low';
  }>>([]);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'Protein',
    urgency: 'medium' as 'high' | 'medium' | 'low',
    suggestedTime: '',
    forMeal: ''
  });

  // Load smart shopping list on component mount
  useEffect(() => {
    refreshShoppingList();
  }, []);

  const refreshShoppingList = () => {
    const smartItems = generateSmartShoppingList();
    const schedule = getShoppingSchedule();
    setShoppingItems(smartItems);
    setShoppingSchedule(schedule);
  };

  const toggleItem = (itemId: string) => {
    setShoppingItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addItem = () => {
    if (!newItem.name || !newItem.quantity) return;

    const item: ShoppingItem = {
      id: `custom-${Date.now()}`,
      ...newItem,
      completed: false,
      requiredDate: new Date()
    };

    setShoppingItems([...shoppingItems, item]);
    setNewItem({
      name: '',
      quantity: '',
      category: 'Protein',
      urgency: 'medium',
      suggestedTime: '',
      forMeal: ''
    });
    setIsAddItemOpen(false);
  };

  const deleteItem = (itemId: string) => {
    setShoppingItems(shoppingItems.filter(item => item.id !== itemId));
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      high: 'bg-destructive text-destructive-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-success text-success-foreground'
    };
    return colors[urgency as keyof typeof colors];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Protein': 'bg-primary/10 text-primary',
      'Dairy': 'bg-accent/10 text-accent',
      'Vegetables': 'bg-success/10 text-success',
      'Grains': 'bg-warning/10 text-warning',
      'Nuts': 'bg-secondary/30 text-secondary-foreground'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const groupedItems = shoppingItems.reduce((groups, item) => {
    const key = item.urgency;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, ShoppingItem[]>);

  const urgencyOrder = ['high', 'medium', 'low'];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Smart Shopping List</h1>
            <p className="text-muted-foreground">Auto-generated from your meal plans and updated daily</p>
          </div>
          <Button onClick={refreshShoppingList} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Shopping List */}
        <div className="lg:col-span-2 space-y-6">
          {urgencyOrder.map(urgency => {
            const items = groupedItems[urgency] || [];
            if (items.length === 0) return null;

            return (
              <Card key={urgency}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Priority
                    <div className="flex items-center gap-2">
                      <Badge className={getUrgencyColor(urgency)}>
                        {items.filter(item => !item.completed).length} items
                      </Badge>
                      {urgency === 'high' && (
                        <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" className="gap-1">
                              <Plus className="h-3 w-3" />
                              Add Item
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Shopping Item</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="name">Item Name</Label>
                                  <Input
                                    id="name"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                    placeholder="Item name"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="quantity">Quantity</Label>
                                  <Input
                                    id="quantity"
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                                    placeholder="e.g., 200g, 5 pieces"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="category">Category</Label>
                                  <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Protein">Protein</SelectItem>
                                      <SelectItem value="Dairy">Dairy</SelectItem>
                                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                                      <SelectItem value="Grains">Grains</SelectItem>
                                      <SelectItem value="Nuts">Nuts</SelectItem>
                                      <SelectItem value="Fruits">Fruits</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="urgency">Priority</Label>
                                  <Select value={newItem.urgency} onValueChange={(value: 'high' | 'medium' | 'low') => setNewItem({...newItem, urgency: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="suggestedTime">Suggested Time</Label>
                                <Input
                                  id="suggestedTime"
                                  value={newItem.suggestedTime}
                                  onChange={(e) => setNewItem({...newItem, suggestedTime: e.target.value})}
                                  placeholder="e.g., Today 8:15 AM"
                                />
                              </div>
                              <div>
                                <Label htmlFor="forMeal">For Meal (optional)</Label>
                                <Input
                                  id="forMeal"
                                  value={newItem.forMeal}
                                  onChange={(e) => setNewItem({...newItem, forMeal: e.target.value})}
                                  placeholder="e.g., Breakfast, Lunch"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={addItem} className="flex-1">Add Item</Button>
                                <Button variant="outline" onClick={() => setIsAddItemOpen(false)} className="flex-1">Cancel</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        item.completed 
                          ? 'bg-muted/50 opacity-60' 
                          : 'bg-card hover:shadow-md'
                      }`}
                    >
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium ${item.completed ? 'line-through' : ''}`}>
                            {item.name}
                          </h4>
                          <Badge variant="outline">{item.quantity}</Badge>
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{item.suggestedTime}</span>
                          {item.forMeal && (
                            <>
                              <span>•</span>
                              <span>For: {item.forMeal}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {item.id.startsWith('custom-') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Shopping Schedule & Tips */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Shopping Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shoppingSchedule.map((schedule, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getUrgencyColor(schedule.urgency)}>
                      {new Date(schedule.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Badge>
                    <span className="font-medium">{schedule.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {schedule.description}
                  </p>
                  <ul className="text-xs space-y-1">
                    {schedule.items.slice(0, 3).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                    {schedule.items.length > 3 && (
                      <li className="text-muted-foreground">• +{schedule.items.length - 3} more items</li>
                    )}
                  </ul>
                </div>
              ))}
              
              {shoppingSchedule.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No shopping trips needed right now!</p>
                  <p className="text-sm">Your pantry looks well-stocked.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prep Reminders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="border-l-4 border-primary pl-3">
                <p className="font-medium">Tonight</p>
                <p className="text-muted-foreground">Soak: 2 dates, 6 almonds, 2 walnuts, 8 raisins</p>
              </div>
              <div className="border-l-4 border-warning pl-3">
                <p className="font-medium">Before bed</p>
                <p className="text-muted-foreground">Prep chia water for morning combo</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;