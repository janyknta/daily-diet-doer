import { getMealsForDay, getTasksForDay, getCurrentDate } from './plannerData';
import type { Meal, Task } from './types';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  urgency: 'high' | 'medium' | 'low';
  suggestedTime: string;
  forMeal?: string;
  completed: boolean;
  requiredDate: Date;
}

const ingredientMapping: Record<string, { category: string; baseQuantity: string }> = {
  // Proteins & Dairy
  'eggs': { category: 'Protein', baseQuantity: '12 pieces' },
  'boiled eggs': { category: 'Protein', baseQuantity: '12 pieces' },
  'greek yogurt': { category: 'Dairy', baseQuantity: '500g' },
  'milk': { category: 'Dairy', baseQuantity: '1 litre' },
  'chicken breast': { category: 'Protein', baseQuantity: '500g' },
'grilled fish': { category: 'Protein', baseQuantity: '500g' },
  'fish': { category: 'Protein', baseQuantity: '500g' },
  'cottage cheese': { category: 'Dairy', baseQuantity: '200g' },
  'paneer': { category: 'Dairy', baseQuantity: '200g' },
  
  // Grains & Staples
  'brown rice': { category: 'Grains', baseQuantity: '1 kg' },
  'sattu': { category: 'Grains', baseQuantity: '500g' },
  'lentil': { category: 'Pulses', baseQuantity: '500g' },
  'lentils': { category: 'Pulses', baseQuantity: '500g' },
  'chickpeas': { category: 'Pulses', baseQuantity: '500g' },
  'sweet potato': { category: 'Vegetables', baseQuantity: '1 kg' },
  
  // Vegetables
  'spinach': { category: 'Vegetables', baseQuantity: '500g' },
  'cucumber': { category: 'Vegetables', baseQuantity: '1 kg' },
  'tomatoes': { category: 'Vegetables', baseQuantity: '1 kg' },
  'green beans': { category: 'Vegetables', baseQuantity: '500g' },
  'onion': { category: 'Vegetables', baseQuantity: '1 kg' },
  'mixed salad': { category: 'Vegetables', baseQuantity: '500g' },
  'salad': { category: 'Vegetables', baseQuantity: '500g' },
  
  // Nuts & Seeds
  'almonds': { category: 'Nuts', baseQuantity: '200g' },
  'walnuts': { category: 'Nuts', baseQuantity: '200g' },
  'brazil nut': { category: 'Nuts', baseQuantity: '100g' },
  'chia': { category: 'Seeds', baseQuantity: '100g' },
  'chia seeds': { category: 'Seeds', baseQuantity: '100g' },
  
  // Fruits
  'banana': { category: 'Fruits', baseQuantity: '1 dozen' },
  'orange': { category: 'Fruits', baseQuantity: '1 kg' },
  'berries': { category: 'Fruits', baseQuantity: '500g' },
  'dates': { category: 'Fruits', baseQuantity: '500g' },
  'kimia dates': { category: 'Fruits', baseQuantity: '500g' },
  'raisins': { category: 'Fruits', baseQuantity: '250g' },
  'black raisins': { category: 'Fruits', baseQuantity: '250g' },
  
  // Pantry & Seasonings
  'honey': { category: 'Sweeteners', baseQuantity: '500g' },
  'jaggery': { category: 'Sweeteners', baseQuantity: '500g' },
  'cinnamon': { category: 'Spices', baseQuantity: '50g' },
  'herbal tea': { category: 'Beverages', baseQuantity: '1 box' },
  'olive oil': { category: 'Oils', baseQuantity: '500ml' },
  'coconut oil': { category: 'Oils', baseQuantity: '500ml' },
};

function extractIngredientsFromMeal(meal: Meal): string[] {
  return meal.foods.flatMap(food => {
    // Extract individual ingredients from complex food descriptions
    const ingredients = [];
    const lowerFood = food.toLowerCase();
    
    // Check for each mapped ingredient
    for (const ingredient in ingredientMapping) {
      if (lowerFood.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    }
    
    // Fallback: clean up the food name for generic matching
    if (ingredients.length === 0) {
      const cleaned = lowerFood
        .replace(/\d+[a-z]*\s*/g, '') // Remove quantities like "200g", "2 pieces"
        .replace(/\(.*?\)/g, '') // Remove parenthetical descriptions
        .replace(/,.*$/, '') // Remove everything after comma
        .replace(/\b(curry|sabzi|shake|smoothie|salad|roasted)\b/g, '') // Remove preparation words
        .trim();
      
      if (cleaned.length > 0 && ingredientMapping[cleaned]) {
        ingredients.push(cleaned);
      }
    }
    
    return ingredients;
  }).filter(ingredient => ingredient.length > 0);
}

function calculateShoppingSuggestions(currentDate: Date): ShoppingItem[] {
  const shoppingItems: ShoppingItem[] = [];
  const ingredientCounts = new Map<string, { 
    count: number; 
    meals: string[]; 
    earliestDate: Date;
    urgency: 'high' | 'medium' | 'low';
  }>();

  // Look ahead for the next 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + dayOffset);
    const dayOfWeek = targetDate.getDay();
    
    const meals = getMealsForDay(dayOfWeek);
    const tasks = getTasksForDay(dayOfWeek);
    
    // Check if there are shopping tasks for this day
    const hasShoppingTask = tasks.some(task => task.type === 'shopping');
    
    meals.forEach(meal => {
      const ingredients = extractIngredientsFromMeal(meal);
      
      ingredients.forEach(ingredient => {
        if (ingredientMapping[ingredient]) {
          const key = ingredient;
          const existing = ingredientCounts.get(key) || { 
            count: 0, 
            meals: [], 
            earliestDate: targetDate,
            urgency: 'low' as const
          };
          
          existing.count += 1;
          existing.meals.push(meal.name);
          
          // Set urgency based on timing
          if (dayOffset === 0) {
            existing.urgency = 'high'; // Today
          } else if (dayOffset <= 2 || hasShoppingTask) {
            existing.urgency = 'medium'; // Next 2 days or shopping day
          }
          
          if (targetDate < existing.earliestDate) {
            existing.earliestDate = targetDate;
          }
          
          ingredientCounts.set(key, existing);
        }
      });
    });
  }

  // Convert to shopping items
  ingredientCounts.forEach((data, ingredient) => {
    const mapping = ingredientMapping[ingredient];
    if (mapping) {
      // Calculate quantity based on count (simple multiplication for now)
      const baseQty = parseInt(mapping.baseQuantity) || 1;
      const unit = mapping.baseQuantity.replace(/\d+/, '');
      const totalQty = Math.ceil(baseQty * data.count * 1.2); // 20% buffer
      
      let suggestedTime = '';
      const dayDiff = Math.ceil((data.earliestDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 0) {
        suggestedTime = 'Today (before meal prep)';
      } else if (dayDiff === 1) {
        suggestedTime = 'Tomorrow morning';
      } else if (dayDiff <= 2) {
        suggestedTime = `Within ${dayDiff} days`;
      } else {
        suggestedTime = 'Weekly shopping trip';
      }

      shoppingItems.push({
        id: `auto-${ingredient.replace(/\s+/g, '-')}`,
        name: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
        quantity: `${totalQty}${unit}`,
        category: mapping.category,
        urgency: data.urgency,
        suggestedTime,
        forMeal: data.meals.slice(0, 2).join(', ') + (data.meals.length > 2 ? '...' : ''),
        completed: false,
        requiredDate: data.earliestDate
      });
    }
  });

  // Sort by urgency and then by required date
  return shoppingItems.sort((a, b) => {
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }
    return a.requiredDate.getTime() - b.requiredDate.getTime();
  });
}

export function generateSmartShoppingList(): ShoppingItem[] {
  const currentDate = getCurrentDate();
  return calculateShoppingSuggestions(currentDate);
}

export function getShoppingSchedule(): Array<{
  date: string;
  time: string;
  description: string;
  items: string[];
  urgency: 'high' | 'medium' | 'low';
}> {
  const items = generateSmartShoppingList();
  const scheduleMap = new Map<string, {
    time: string;
    description: string;
    items: string[];
    urgency: 'high' | 'medium' | 'low';
  }>();

  items.forEach(item => {
    const dateKey = item.requiredDate.toDateString();
    const existing = scheduleMap.get(dateKey) || {
      time: item.suggestedTime,
      description: '',
      items: [],
      urgency: 'low' as const
    };

    existing.items.push(`${item.name} (${item.quantity})`);
    if (item.urgency === 'high' || existing.urgency !== 'high') {
      existing.urgency = item.urgency;
    }

    // Set description based on urgency
    if (item.urgency === 'high') {
      existing.description = 'Quick stop for daily essentials';
    } else if (item.urgency === 'medium') {
      existing.description = 'Weekly grocery shopping';
    } else {
      existing.description = 'Stock up on pantry items';
    }

    scheduleMap.set(dateKey, existing);
  });

  return Array.from(scheduleMap.entries()).map(([date, data]) => ({
    date,
    ...data
  })).slice(0, 3); // Show only next 3 shopping trips
}