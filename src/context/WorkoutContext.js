import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutContext = createContext();

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState({});
  const [goals, setGoals] = useState({
    dailyWorkouts: 1,
    dailyMinutes: 30,
    dailyCalories: 300,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const workoutsData = await AsyncStorage.getItem('workouts');
      const goalsData = await AsyncStorage.getItem('goals');

      if (workoutsData) {
        setWorkouts(JSON.parse(workoutsData));
      }
      if (goalsData) {
        setGoals(JSON.parse(goalsData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save workouts to AsyncStorage
  const saveWorkouts = async (newWorkouts) => {
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(newWorkouts));
      setWorkouts(newWorkouts);
    } catch (error) {
      console.error('Error saving workouts:', error);
    }
  };

  // Add a new workout
  const addWorkout = async (date, workout) => {
    const dateWorkouts = workouts[date] || [];
    const newWorkout = {
      id: Date.now().toString(),
      ...workout,
      timestamp: new Date().toISOString(),
    };

    const updatedWorkouts = {
      ...workouts,
      [date]: [...dateWorkouts, newWorkout],
    };

    await saveWorkouts(updatedWorkouts);
  };

  // Update a workout
  const updateWorkout = async (date, workoutId, updatedWorkout) => {
    const dateWorkouts = workouts[date] || [];
    const updatedDateWorkouts = dateWorkouts.map(w =>
      w.id === workoutId ? { ...w, ...updatedWorkout } : w
    );

    const updatedWorkouts = {
      ...workouts,
      [date]: updatedDateWorkouts,
    };

    await saveWorkouts(updatedWorkouts);
  };

  // Delete a workout
  const deleteWorkout = async (date, workoutId) => {
    const dateWorkouts = workouts[date] || [];
    const updatedDateWorkouts = dateWorkouts.filter(w => w.id !== workoutId);

    const updatedWorkouts = { ...workouts };
    if (updatedDateWorkouts.length === 0) {
      delete updatedWorkouts[date];
    } else {
      updatedWorkouts[date] = updatedDateWorkouts;
    }

    await saveWorkouts(updatedWorkouts);
  };

  // Update goals
  const updateGoals = async (newGoals) => {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(newGoals));
      setGoals(newGoals);
    } catch (error) {
      console.error('Error updating goals:', error);
    }
  };

  // Get today's statistics
  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayWorkouts = workouts[today] || [];

    const totalMinutes = todayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const totalCalories = todayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);

    return {
      workoutCount: todayWorkouts.length,
      totalMinutes,
      totalCalories,
    };
  };

  // Get this week's statistics
  const getWeekStats = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    let totalMinutes = 0;
    let totalCalories = 0;
    let workoutCount = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayWorkouts = workouts[dateStr] || [];

      workoutCount += dayWorkouts.length;
      totalMinutes += dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
      totalCalories += dayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    }

    return {
      workoutCount,
      totalMinutes,
      totalCalories,
    };
  };

  // Get marked dates for calendar
  const getMarkedDates = () => {
    const marked = {};
    Object.keys(workouts).forEach(date => {
      if (workouts[date].length > 0) {
        marked[date] = { marked: true, dotColor: '#4a90e2' };
      }
    });
    return marked;
  };

  const value = {
    workouts,
    goals,
    isLoading,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    updateGoals,
    getTodayStats,
    getWeekStats,
    getMarkedDates,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};
