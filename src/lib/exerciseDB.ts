// ExerciseDB API Integration
const BASE_URL = 'https://exercisedb.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_EXERCISEDB_KEY || '';

const headers = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

export type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
};

export const fetchExercises = async (limit = 20, offset = 0): Promise<Exercise[]> => {
  if (!API_KEY) return getMockExercises();
  try {
    const res = await fetch(`${BASE_URL}/exercises?limit=${limit}&offset=${offset}`, { headers });
    return res.json();
  } catch {
    return getMockExercises();
  }
};

export const fetchByBodyPart = async (bodyPart: string): Promise<Exercise[]> => {
  if (!API_KEY || bodyPart === 'all') return fetchExercises();
  try {
    const res = await fetch(`${BASE_URL}/exercises/bodyPart/${bodyPart}`, { headers });
    return res.json();
  } catch {
    return getMockExercises();
  }
};

export const searchExercises = async (name: string): Promise<Exercise[]> => {
  if (!API_KEY) return getMockExercises().filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
  try {
    const res = await fetch(`${BASE_URL}/exercises/name/${name}`, { headers });
    return res.json();
  } catch {
    return getMockExercises();
  }
};

// Mock data for demo when no API key
export const getMockExercises = (): Exercise[] => [
  { id: '1', name: 'Bench Press', bodyPart: 'chest', equipment: 'barbell', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=bench', target: 'pectorals', secondaryMuscles: ['triceps', 'delts'], instructions: ['Lie on bench', 'Grip bar', 'Lower to chest', 'Press up'] },
  { id: '2', name: 'Squat', bodyPart: 'upper legs', equipment: 'barbell', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=squat', target: 'quads', secondaryMuscles: ['glutes', 'hamstrings'], instructions: ['Stand with bar', 'Squat down', 'Drive up'] },
  { id: '3', name: 'Deadlift', bodyPart: 'back', equipment: 'barbell', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=deadlift', target: 'spine', secondaryMuscles: ['glutes', 'hamstrings'], instructions: ['Stand over bar', 'Hinge hips', 'Pull up'] },
  { id: '4', name: 'Pull Up', bodyPart: 'back', equipment: 'body weight', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=pullup', target: 'lats', secondaryMuscles: ['biceps'], instructions: ['Hang from bar', 'Pull chin over bar', 'Lower down'] },
  { id: '5', name: 'Overhead Press', bodyPart: 'shoulders', equipment: 'barbell', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=press', target: 'delts', secondaryMuscles: ['triceps'], instructions: ['Hold bar at shoulders', 'Press overhead', 'Lower back'] },
  { id: '6', name: 'Bicep Curl', bodyPart: 'upper arms', equipment: 'dumbbell', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=curl', target: 'biceps', secondaryMuscles: ['brachialis'], instructions: ['Hold dumbbells', 'Curl up', 'Lower down'] },
  { id: '7', name: 'Tricep Pushdown', bodyPart: 'upper arms', equipment: 'cable', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=tricep', target: 'triceps', secondaryMuscles: [], instructions: ['Hold cable', 'Push down', 'Return'] },
  { id: '8', name: 'Leg Press', bodyPart: 'upper legs', equipment: 'leverage machine', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=legpress', target: 'quads', secondaryMuscles: ['glutes'], instructions: ['Sit in machine', 'Press platform', 'Lower back'] },
  { id: '9', name: 'Cable Fly', bodyPart: 'chest', equipment: 'cable', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=cablefly', target: 'pectorals', secondaryMuscles: ['delts'], instructions: ['Stand between cables', 'Bring arms together', 'Return'] },
  { id: '10', name: 'Romanian Deadlift', bodyPart: 'upper legs', equipment: 'barbell', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=rdl', target: 'hamstrings', secondaryMuscles: ['glutes'], instructions: ['Hold bar', 'Hinge at hips', 'Feel stretch', 'Return'] },
  { id: '11', name: 'Lat Pulldown', bodyPart: 'back', equipment: 'cable', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=latpull', target: 'lats', secondaryMuscles: ['biceps'], instructions: ['Sit at machine', 'Pull bar down', 'Return slowly'] },
  { id: '12', name: 'Plank', bodyPart: 'waist', equipment: 'body weight', gifUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=plank', target: 'abs', secondaryMuscles: ['glutes'], instructions: ['Get in push-up position', 'Hold for time', 'Keep body straight'] },
];
