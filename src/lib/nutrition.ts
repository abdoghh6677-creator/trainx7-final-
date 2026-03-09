// Open Food Facts API Integration
export type FoodItem = {
  name: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
};

export type MacroResult = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const searchFood = async (query: string): Promise<FoodItem[]> => {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`
    );
    const data = await res.json();
    return (data.products || [])
      .filter((p: any) => p.nutriments)
      .map((p: any) => ({
        name: p.product_name || query,
        calories_per_100g: Math.round(p.nutriments['energy-kcal_100g'] || p.nutriments['energy-kcal'] || 0),
        protein_per_100g: Math.round(p.nutriments['proteins_100g'] || 0),
        carbs_per_100g: Math.round(p.nutriments['carbohydrates_100g'] || 0),
        fat_per_100g: Math.round(p.nutriments['fat_100g'] || 0),
      }))
      .filter((f: FoodItem) => f.calories_per_100g > 0);
  } catch {
    return getFallbackFood(query);
  }
};

export const calcMacros = (food: FoodItem, grams: number): MacroResult => ({
  calories: Math.round((food.calories_per_100g * grams) / 100),
  protein:  Math.round((food.protein_per_100g  * grams) / 100),
  carbs:    Math.round((food.carbs_per_100g    * grams) / 100),
  fat:      Math.round((food.fat_per_100g      * grams) / 100),
});

// Fallback common foods database
const commonFoods: FoodItem[] = [
  { name: 'Chicken Breast', calories_per_100g: 165, protein_per_100g: 31, carbs_per_100g: 0, fat_per_100g: 4 },
  { name: 'Brown Rice', calories_per_100g: 216, protein_per_100g: 5, carbs_per_100g: 45, fat_per_100g: 2 },
  { name: 'Eggs', calories_per_100g: 155, protein_per_100g: 13, carbs_per_100g: 1, fat_per_100g: 11 },
  { name: 'Oats', calories_per_100g: 389, protein_per_100g: 17, carbs_per_100g: 66, fat_per_100g: 7 },
  { name: 'Banana', calories_per_100g: 89, protein_per_100g: 1, carbs_per_100g: 23, fat_per_100g: 0 },
  { name: 'Salmon', calories_per_100g: 208, protein_per_100g: 20, carbs_per_100g: 0, fat_per_100g: 13 },
  { name: 'Sweet Potato', calories_per_100g: 86, protein_per_100g: 2, carbs_per_100g: 20, fat_per_100g: 0 },
  { name: 'Greek Yogurt', calories_per_100g: 59, protein_per_100g: 10, carbs_per_100g: 4, fat_per_100g: 0 },
  { name: 'Almonds', calories_per_100g: 579, protein_per_100g: 21, carbs_per_100g: 22, fat_per_100g: 50 },
  { name: 'Tuna', calories_per_100g: 132, protein_per_100g: 28, carbs_per_100g: 0, fat_per_100g: 1 },
  { name: 'Broccoli', calories_per_100g: 34, protein_per_100g: 3, carbs_per_100g: 7, fat_per_100g: 0 },
  { name: 'White Rice', calories_per_100g: 206, protein_per_100g: 4, carbs_per_100g: 45, fat_per_100g: 0 },
  { name: 'Beef (lean)', calories_per_100g: 250, protein_per_100g: 26, carbs_per_100g: 0, fat_per_100g: 15 },
  { name: 'Milk', calories_per_100g: 61, protein_per_100g: 3, carbs_per_100g: 5, fat_per_100g: 3 },
  { name: 'Bread (whole wheat)', calories_per_100g: 247, protein_per_100g: 13, carbs_per_100g: 41, fat_per_100g: 4 },
];

export const getFallbackFood = (query: string): FoodItem[] => {
  const q = query.toLowerCase();
  const matches = commonFoods.filter(f => f.name.toLowerCase().includes(q));
  return matches.length > 0 ? matches : [{ name: query, calories_per_100g: 100, protein_per_100g: 5, carbs_per_100g: 15, fat_per_100g: 3 }];
};

export const getAllCommonFoods = () => commonFoods;
