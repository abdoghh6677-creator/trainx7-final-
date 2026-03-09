import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  gender: 'male' | 'female';
  goal: 'lose' | 'build' | 'fit';
  training_days: number;
  plan: '1m' | '2m' | '3m' | '12m';
  plan_start: string;
  plan_end: string;
  created_at: string;
};

export type WorkoutLog = {
  id: string;
  user_id: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight_kg: number;
  date: string;
  completed: boolean;
};

export type NutritionLog = {
  id: string;
  user_id: string;
  meal_name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
};

export type ProgressLog = {
  id: string;
  user_id: string;
  weight_kg: number;
  chest_cm: number;
  waist_cm: number;
  arms_cm: number;
  date: string;
};
