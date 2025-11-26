import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const WorkoutContext = createContext();

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider = ({ children }) => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState({});
  const [goals, setGoals] = useState({
    dailyWorkouts: 1,
    dailyMinutes: 30,
    dailyCalories: 300,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load data - 로그인 상태에 따라 Supabase 또는 AsyncStorage에서 로드
  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (user) {
        // 로그인된 경우: Supabase에서 데이터 로드
        await loadFromSupabase();
      } else {
        // 비로그인 상태: AsyncStorage에서 로드
        await loadFromAsyncStorage();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Supabase 실패 시 AsyncStorage에서 로드 시도
      await loadFromAsyncStorage();
    } finally {
      setIsLoading(false);
    }
  };

  // AsyncStorage에서 데이터 로드
  const loadFromAsyncStorage = async () => {
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
      console.error('Error loading from AsyncStorage:', error);
    }
  };

  // Supabase에서 데이터 로드
  const loadFromSupabase = async () => {
    try {
      // 목표 로드
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!goalsError && goalsData) {
        setGoals({
          dailyWorkouts: goalsData.daily_workouts,
          dailyMinutes: goalsData.daily_minutes,
          dailyCalories: goalsData.daily_calories,
        });
      }

      // 운동 기록 로드
      const { data: workoutsData, error: workoutsError } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id)
        .order('workout_date', { ascending: false });

      if (!workoutsError && workoutsData) {
        // Supabase 데이터를 로컬 형식으로 변환
        const formattedWorkouts = {};
        workoutsData.forEach(workout => {
          const date = workout.workout_date;
          if (!formattedWorkouts[date]) {
            formattedWorkouts[date] = [];
          }
          formattedWorkouts[date].push({
            id: workout.id,
            type: workout.workout_type,
            duration: workout.duration,
            calories: workout.calories,
            notes: workout.notes,
            timestamp: workout.created_at,
          });
        });
        setWorkouts(formattedWorkouts);
      }
    } catch (error) {
      console.error('Error loading from Supabase:', error);
      throw error;
    }
  };

  // AsyncStorage에 저장
  const saveToAsyncStorage = async (newWorkouts, newGoals = null) => {
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(newWorkouts));
      if (newGoals) {
        await AsyncStorage.setItem('goals', JSON.stringify(newGoals));
      }
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
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

    setWorkouts(updatedWorkouts);
    await saveToAsyncStorage(updatedWorkouts);

    // Supabase에 동기화 (로그인 상태인 경우)
    if (user) {
      try {
        setIsSyncing(true);
        const { error } = await supabase.from('workouts').insert({
          id: newWorkout.id,
          user_id: user.id,
          workout_date: date,
          workout_type: newWorkout.type,
          duration: newWorkout.duration,
          calories: newWorkout.calories,
          notes: newWorkout.notes || null,
        });

        if (error) throw error;
      } catch (error) {
        console.error('Error syncing workout to Supabase:', error);
      } finally {
        setIsSyncing(false);
      }
    }
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

    setWorkouts(updatedWorkouts);
    await saveToAsyncStorage(updatedWorkouts);

    // Supabase에 동기화 (로그인 상태인 경우)
    if (user) {
      try {
        setIsSyncing(true);
        const { error } = await supabase
          .from('workouts')
          .update({
            workout_type: updatedWorkout.type,
            duration: updatedWorkout.duration,
            calories: updatedWorkout.calories,
            notes: updatedWorkout.notes || null,
          })
          .eq('id', workoutId)
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating workout in Supabase:', error);
      } finally {
        setIsSyncing(false);
      }
    }
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

    setWorkouts(updatedWorkouts);
    await saveToAsyncStorage(updatedWorkouts);

    // Supabase에서 삭제 (로그인 상태인 경우)
    if (user) {
      try {
        setIsSyncing(true);
        const { error } = await supabase
          .from('workouts')
          .delete()
          .eq('id', workoutId)
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error deleting workout from Supabase:', error);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Update goals
  const updateGoals = async (newGoals) => {
    setGoals(newGoals);
    await saveToAsyncStorage(workouts, newGoals);

    // Supabase에 동기화 (로그인 상태인 경우)
    if (user) {
      try {
        setIsSyncing(true);
        const { error } = await supabase
          .from('goals')
          .update({
            daily_workouts: newGoals.dailyWorkouts,
            daily_minutes: newGoals.dailyMinutes,
            daily_calories: newGoals.dailyCalories,
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating goals in Supabase:', error);
      } finally {
        setIsSyncing(false);
      }
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
    isSyncing,
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
