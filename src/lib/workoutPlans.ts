// Workout Plans generator based on user profile
export type WorkoutDay = {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
  isRest: boolean;
};

export type WorkoutExercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  bodyPart: string;
  gifUrl?: string;
};

export type WeekPlan = {
  week: number;
  days: WorkoutDay[];
};

const exercisesByGoal = {
  lose: {
    chest:     [{ name: 'Push Up', sets: 3, reps: '15-20', rest: '45s', bodyPart: 'chest' }, { name: 'Incline Push Up', sets: 3, reps: '12-15', rest: '45s', bodyPart: 'chest' }, { name: 'Cable Fly', sets: 3, reps: '15', rest: '45s', bodyPart: 'chest' }],
    back:      [{ name: 'Pull Up', sets: 3, reps: '8-12', rest: '60s', bodyPart: 'back' }, { name: 'Bent Over Row', sets: 3, reps: '12-15', rest: '60s', bodyPart: 'back' }, { name: 'Lat Pulldown', sets: 3, reps: '15', rest: '45s', bodyPart: 'back' }],
    legs:      [{ name: 'Squat', sets: 4, reps: '15-20', rest: '60s', bodyPart: 'upper legs' }, { name: 'Lunges', sets: 3, reps: '12 each', rest: '45s', bodyPart: 'upper legs' }, { name: 'Leg Press', sets: 3, reps: '15', rest: '60s', bodyPart: 'upper legs' }],
    shoulders: [{ name: 'Lateral Raise', sets: 3, reps: '15', rest: '45s', bodyPart: 'shoulders' }, { name: 'Front Raise', sets: 3, reps: '12', rest: '45s', bodyPart: 'shoulders' }, { name: 'Face Pull', sets: 3, reps: '15', rest: '45s', bodyPart: 'shoulders' }],
    arms:      [{ name: 'Bicep Curl', sets: 3, reps: '15', rest: '45s', bodyPart: 'upper arms' }, { name: 'Tricep Dip', sets: 3, reps: '12-15', rest: '45s', bodyPart: 'upper arms' }],
    core:      [{ name: 'Plank', sets: 3, reps: '45s', rest: '30s', bodyPart: 'waist' }, { name: 'Crunches', sets: 3, reps: '20', rest: '30s', bodyPart: 'waist' }, { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s', bodyPart: 'waist' }],
  },
  build: {
    chest:     [{ name: 'Bench Press', sets: 4, reps: '6-8', rest: '90s', bodyPart: 'chest' }, { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90s', bodyPart: 'chest' }, { name: 'Weighted Dips', sets: 3, reps: '8', rest: '90s', bodyPart: 'chest' }, { name: 'Cable Fly', sets: 3, reps: '12', rest: '60s', bodyPart: 'chest' }],
    back:      [{ name: 'Deadlift', sets: 4, reps: '5', rest: '2min', bodyPart: 'back' }, { name: 'Weighted Pull Up', sets: 4, reps: '6-8', rest: '90s', bodyPart: 'back' }, { name: 'Barbell Row', sets: 4, reps: '8', rest: '90s', bodyPart: 'back' }, { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '60s', bodyPart: 'back' }],
    legs:      [{ name: 'Squat', sets: 5, reps: '5', rest: '2min', bodyPart: 'upper legs' }, { name: 'Romanian Deadlift', sets: 4, reps: '8', rest: '90s', bodyPart: 'upper legs' }, { name: 'Leg Press', sets: 4, reps: '10', rest: '90s', bodyPart: 'upper legs' }, { name: 'Leg Curl', sets: 3, reps: '12', rest: '60s', bodyPart: 'upper legs' }],
    shoulders: [{ name: 'Overhead Press', sets: 4, reps: '6-8', rest: '90s', bodyPart: 'shoulders' }, { name: 'Arnold Press', sets: 3, reps: '10', rest: '60s', bodyPart: 'shoulders' }, { name: 'Lateral Raise', sets: 4, reps: '12-15', rest: '45s', bodyPart: 'shoulders' }, { name: 'Rear Delt Fly', sets: 3, reps: '15', rest: '45s', bodyPart: 'shoulders' }],
    arms:      [{ name: 'Barbell Curl', sets: 4, reps: '8-10', rest: '60s', bodyPart: 'upper arms' }, { name: 'Hammer Curl', sets: 3, reps: '10', rest: '60s', bodyPart: 'upper arms' }, { name: 'Skull Crushers', sets: 4, reps: '8-10', rest: '60s', bodyPart: 'upper arms' }, { name: 'Tricep Pushdown', sets: 3, reps: '12', rest: '45s', bodyPart: 'upper arms' }],
    core:      [{ name: 'Cable Crunch', sets: 3, reps: '15', rest: '45s', bodyPart: 'waist' }, { name: 'Hanging Leg Raise', sets: 3, reps: '12', rest: '60s', bodyPart: 'waist' }, { name: 'Plank', sets: 3, reps: '60s', rest: '45s', bodyPart: 'waist' }],
  },
  fit: {
    chest:     [{ name: 'Push Up', sets: 3, reps: '12-15', rest: '60s', bodyPart: 'chest' }, { name: 'Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', bodyPart: 'chest' }, { name: 'Cable Fly', sets: 3, reps: '12-15', rest: '60s', bodyPart: 'chest' }],
    back:      [{ name: 'Pull Up', sets: 3, reps: '8-10', rest: '90s', bodyPart: 'back' }, { name: 'Dumbbell Row', sets: 3, reps: '10-12', rest: '60s', bodyPart: 'back' }, { name: 'Lat Pulldown', sets: 3, reps: '12', rest: '60s', bodyPart: 'back' }],
    legs:      [{ name: 'Squat', sets: 3, reps: '10-12', rest: '90s', bodyPart: 'upper legs' }, { name: 'Lunges', sets: 3, reps: '10 each', rest: '60s', bodyPart: 'upper legs' }, { name: 'Leg Press', sets: 3, reps: '12', rest: '60s', bodyPart: 'upper legs' }],
    shoulders: [{ name: 'Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', bodyPart: 'shoulders' }, { name: 'Lateral Raise', sets: 3, reps: '12-15', rest: '45s', bodyPart: 'shoulders' }, { name: 'Face Pull', sets: 3, reps: '15', rest: '45s', bodyPart: 'shoulders' }],
    arms:      [{ name: 'Dumbbell Curl', sets: 3, reps: '10-12', rest: '60s', bodyPart: 'upper arms' }, { name: 'Tricep Extension', sets: 3, reps: '12', rest: '60s', bodyPart: 'upper arms' }],
    core:      [{ name: 'Plank', sets: 3, reps: '45s', rest: '30s', bodyPart: 'waist' }, { name: 'Bicycle Crunch', sets: 3, reps: '20', rest: '30s', bodyPart: 'waist' }, { name: 'Russian Twist', sets: 3, reps: '15', rest: '30s', bodyPart: 'waist' }],
  },
};

type GoalKey = keyof typeof exercisesByGoal;
type MuscleKey = keyof typeof exercisesByGoal.build;

const splitsByDays: Record<number, { day: string; focus: string; muscle: MuscleKey | 'rest' }[]> = {
  3: [
    { day: 'Day 1', focus: 'Push (Chest + Shoulders + Triceps)', muscle: 'chest' },
    { day: 'Day 2', focus: 'Pull (Back + Biceps)', muscle: 'back' },
    { day: 'Day 3', focus: 'Legs + Core', muscle: 'legs' },
  ],
  4: [
    { day: 'Day 1', focus: 'Chest + Triceps', muscle: 'chest' },
    { day: 'Day 2', focus: 'Back + Biceps', muscle: 'back' },
    { day: 'Day 3', focus: 'Legs', muscle: 'legs' },
    { day: 'Day 4', focus: 'Shoulders + Core', muscle: 'shoulders' },
  ],
  5: [
    { day: 'Day 1', focus: 'Chest', muscle: 'chest' },
    { day: 'Day 2', focus: 'Back', muscle: 'back' },
    { day: 'Day 3', focus: 'Legs', muscle: 'legs' },
    { day: 'Day 4', focus: 'Shoulders', muscle: 'shoulders' },
    { day: 'Day 5', focus: 'Arms + Core', muscle: 'arms' },
  ],
  6: [
    { day: 'Day 1', focus: 'Chest + Triceps', muscle: 'chest' },
    { day: 'Day 2', focus: 'Back + Biceps', muscle: 'back' },
    { day: 'Day 3', focus: 'Legs', muscle: 'legs' },
    { day: 'Day 4', focus: 'Shoulders + Core', muscle: 'shoulders' },
    { day: 'Day 5', focus: 'Arms', muscle: 'arms' },
    { day: 'Day 6', focus: 'Full Body / Cardio', muscle: 'core' },
  ],
};

export const generatePlan = (goal: string, trainingDays: number, planMonths: number): WeekPlan[] => {
  const g = (goal as GoalKey) in exercisesByGoal ? (goal as GoalKey) : 'fit';
  const days = trainingDays in splitsByDays ? trainingDays : 3;
  const weeks = planMonths * 4;
  const split = splitsByDays[days];
  const exDB = exercisesByGoal[g];

  return Array.from({ length: weeks }, (_, wIdx) => ({
    week: wIdx + 1,
    days: split.map(s => ({
      day: s.day,
      focus: s.focus,
      isRest: false,
      exercises: s.muscle === 'rest' ? [] : (exDB[s.muscle as MuscleKey] || exDB.core),
    })),
  }));
};

export const planMonthsMap: Record<string, number> = {
  '1m': 1, '2m': 2, '3m': 3, '12m': 12,
};
