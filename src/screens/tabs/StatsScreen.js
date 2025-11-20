import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLine, VictoryArea } from 'victory-native';
import { useWorkout } from '../../context/WorkoutContext';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function StatsScreen() {
  const { workouts } = useWorkout();
  const [timeframe, setTimeframe] = useState('week'); // 'week' or 'month'

  const getWeeklyData = () => {
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayWorkouts = workouts[dateStr] || [];

      const totalMinutes = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);
      const totalCalories = dayWorkouts.reduce((sum, w) => sum + w.calories, 0);

      data.push({
        day: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        workouts: dayWorkouts.length,
        minutes: totalMinutes,
        calories: totalCalories,
      });
    }

    return data;
  };

  const getMonthlyData = () => {
    const today = new Date();
    const data = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayWorkouts = workouts[dateStr] || [];

      const totalMinutes = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);

      data.push({
        date: date.getDate(),
        minutes: totalMinutes,
      });
    }

    return data;
  };

  const getWorkoutTypeStats = () => {
    const typeStats = {};

    Object.values(workouts).forEach(dayWorkouts => {
      dayWorkouts.forEach(workout => {
        if (!typeStats[workout.type]) {
          typeStats[workout.type] = {
            count: 0,
            totalMinutes: 0,
            totalCalories: 0,
            icon: workout.icon,
          };
        }
        typeStats[workout.type].count++;
        typeStats[workout.type].totalMinutes += workout.duration;
        typeStats[workout.type].totalCalories += workout.calories;
      });
    });

    return Object.entries(typeStats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5);
  };

  const getTotalStats = () => {
    let totalWorkouts = 0;
    let totalMinutes = 0;
    let totalCalories = 0;

    Object.values(workouts).forEach(dayWorkouts => {
      totalWorkouts += dayWorkouts.length;
      dayWorkouts.forEach(workout => {
        totalMinutes += workout.duration;
        totalCalories += workout.calories;
      });
    });

    return { totalWorkouts, totalMinutes, totalCalories };
  };

  const weeklyData = getWeeklyData();
  const monthlyData = getMonthlyData();
  const workoutTypeStats = getWorkoutTypeStats();
  const totalStats = getTotalStats();

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Text style={styles.title}>운동 통계</Text>
        <Text style={styles.subtitle}>나의 운동 데이터를 확인하세요</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>전체 통계</Text>
          <View style={styles.totalStatsContainer}>
            <View style={[styles.totalStatCard, { borderLeftColor: colors.primary }]}>
              <Text style={styles.totalStatIcon}>🎯</Text>
              <Text style={styles.totalStatValue}>{totalStats.totalWorkouts}</Text>
              <Text style={styles.totalStatLabel}>총 운동</Text>
            </View>
            <View style={[styles.totalStatCard, { borderLeftColor: colors.secondary }]}>
              <Text style={styles.totalStatIcon}>⏱️</Text>
              <Text style={styles.totalStatValue}>{totalStats.totalMinutes}</Text>
              <Text style={styles.totalStatLabel}>총 시간(분)</Text>
            </View>
            <View style={[styles.totalStatCard, { borderLeftColor: colors.warning }]}>
              <Text style={styles.totalStatIcon}>🔥</Text>
              <Text style={styles.totalStatValue}>{totalStats.totalCalories}</Text>
              <Text style={styles.totalStatLabel}>총 칼로리</Text>
            </View>
          </View>
        </View>

        {/* Timeframe Toggle */}
        <View style={styles.section}>
          <View style={styles.timeframeToggle}>
            <TouchableOpacity
              style={[styles.toggleButton, timeframe === 'week' && styles.toggleButtonActive]}
              onPress={() => setTimeframe('week')}
              activeOpacity={0.7}
            >
              {timeframe === 'week' ? (
                <LinearGradient colors={gradients.primary} style={styles.toggleButtonGradient}>
                  <Text style={styles.toggleButtonTextActive}>주간</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.toggleButtonText}>주간</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, timeframe === 'month' && styles.toggleButtonActive]}
              onPress={() => setTimeframe('month')}
              activeOpacity={0.7}
            >
              {timeframe === 'month' ? (
                <LinearGradient colors={gradients.primary} style={styles.toggleButtonGradient}>
                  <Text style={styles.toggleButtonTextActive}>월간</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.toggleButtonText}>월간</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Workout Frequency Chart */}
        {timeframe === 'week' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>주간 운동 횟수</Text>
            <View style={styles.chartCard}>
              <VictoryChart
                width={screenWidth - 60}
                height={220}
                theme={VictoryTheme.material}
                domainPadding={{ x: 20 }}
              >
                <VictoryAxis
                  style={{
                    axis: { stroke: colors.border },
                    tickLabels: { fill: colors.textSecondary, fontSize: 12 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: colors.border },
                    tickLabels: { fill: colors.textSecondary, fontSize: 12 },
                    grid: { stroke: colors.borderLight, strokeDasharray: '4' },
                  }}
                />
                <VictoryBar
                  data={weeklyData}
                  x="day"
                  y="workouts"
                  style={{
                    data: {
                      fill: colors.primary,
                      width: 25,
                    },
                  }}
                  cornerRadius={{ top: 6 }}
                />
              </VictoryChart>
            </View>
          </View>
        )}

        {/* Monthly Trend Chart */}
        {timeframe === 'month' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>월간 운동 시간 추이</Text>
            <View style={styles.chartCard}>
              <VictoryChart
                width={screenWidth - 60}
                height={220}
                theme={VictoryTheme.material}
              >
                <VictoryAxis
                  style={{
                    axis: { stroke: colors.border },
                    tickLabels: { fill: colors.textSecondary, fontSize: 10 },
                  }}
                  tickCount={6}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: colors.border },
                    tickLabels: { fill: colors.textSecondary, fontSize: 12 },
                    grid: { stroke: colors.borderLight, strokeDasharray: '4' },
                  }}
                />
                <VictoryArea
                  data={monthlyData}
                  x="date"
                  y="minutes"
                  style={{
                    data: {
                      fill: colors.primary + '40',
                      stroke: colors.primary,
                      strokeWidth: 2,
                    },
                  }}
                />
                <VictoryLine
                  data={monthlyData}
                  x="date"
                  y="minutes"
                  style={{
                    data: {
                      stroke: colors.primary,
                      strokeWidth: 3,
                    },
                  }}
                />
              </VictoryChart>
            </View>
          </View>
        )}

        {/* Workout Type Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>운동 종류별 통계</Text>
          {workoutTypeStats.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyText}>아직 운동 기록이 없습니다</Text>
            </View>
          ) : (
            <View style={styles.typeStatsContainer}>
              {workoutTypeStats.map(([type, stats]) => (
                <View key={type} style={styles.typeStatCard}>
                  <View style={styles.typeStatHeader}>
                    <Text style={styles.typeStatIcon}>{stats.icon}</Text>
                    <Text style={styles.typeStatName}>{type}</Text>
                  </View>
                  <View style={styles.typeStatDetails}>
                    <View style={styles.typeStatItem}>
                      <Text style={styles.typeStatValue}>{stats.count}회</Text>
                      <Text style={styles.typeStatLabel}>운동 횟수</Text>
                    </View>
                    <View style={styles.typeStatItem}>
                      <Text style={styles.typeStatValue}>{stats.totalMinutes}분</Text>
                      <Text style={styles.typeStatLabel}>총 시간</Text>
                    </View>
                    <View style={styles.typeStatItem}>
                      <Text style={styles.typeStatValue}>{stats.totalCalories}</Text>
                      <Text style={styles.typeStatLabel}>칼로리</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.surface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  totalStatsContainer: {
    gap: spacing.md,
  },
  totalStatCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    ...shadows.md,
  },
  totalStatIcon: {
    fontSize: 36,
    marginRight: spacing.lg,
  },
  totalStatValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  totalStatLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  timeframeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    gap: spacing.xs,
    ...shadows.sm,
  },
  toggleButton: {
    flex: 1,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  toggleButtonActive: {
    ...shadows.sm,
  },
  toggleButtonGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  toggleButtonText: {
    paddingVertical: spacing.md,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  toggleButtonTextActive: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.md,
  },
  typeStatsContainer: {
    gap: spacing.md,
  },
  typeStatCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  typeStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  typeStatIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  typeStatName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  typeStatDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  typeStatItem: {
    alignItems: 'center',
  },
  typeStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  typeStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xxxl,
    alignItems: 'center',
    ...shadows.md,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
