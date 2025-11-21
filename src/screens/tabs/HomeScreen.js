import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useWorkout } from '../../context/WorkoutContext';
import AddWorkoutModal from '../modals/AddWorkoutModal';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';
import { TargetIcon, TimerIcon, FireIcon, DumbbellIcon, PlusIcon } from '../../components/Icons';

export default function HomeScreen({ navigation }) {
  const { getTodayStats, getWeekStats, goals, addWorkout } = useWorkout();
  const [modalVisible, setModalVisible] = useState(false);

  const todayStats = getTodayStats();
  const weekStats = getWeekStats();

  const today = new Date().toISOString().split('T')[0];

  const handleAddWorkout = async (workout) => {
    await addWorkout(today, workout);
    setModalVisible(false);
  };

  const handleQuickStart = () => {
    setModalVisible(true);
  };

  const getProgressPercentage = (current, goal) => {
    if (goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Text style={styles.greeting}>안녕하세요 👋</Text>
        <Text style={styles.title}>오늘도 화이팅!</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 목표</Text>

          <View style={styles.goalsGrid}>
            <View style={[styles.goalCard, { borderLeftColor: colors.primary }]}>
              <View style={styles.goalIconContainer}>
                <TargetIcon size={28} color={colors.textSecondary} />
              </View>
              <Text style={styles.goalNumber}>{todayStats.workoutCount}</Text>
              <Text style={styles.goalLabel}>운동 완료</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${getProgressPercentage(todayStats.workoutCount, goals.dailyWorkouts)}%`,
                      backgroundColor: colors.primary
                    }
                  ]}
                />
              </View>
              <Text style={styles.goalTarget}>목표: {goals.dailyWorkouts}회</Text>
            </View>

            <View style={[styles.goalCard, { borderLeftColor: colors.secondary }]}>
              <View style={styles.goalIconContainer}>
                <TimerIcon size={28} color={colors.textSecondary} />
              </View>
              <Text style={styles.goalNumber}>{todayStats.totalMinutes}</Text>
              <Text style={styles.goalLabel}>분</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${getProgressPercentage(todayStats.totalMinutes, goals.dailyMinutes)}%`,
                      backgroundColor: colors.secondary
                    }
                  ]}
                />
              </View>
              <Text style={styles.goalTarget}>목표: {goals.dailyMinutes}분</Text>
            </View>

            <View style={[styles.goalCard, { borderLeftColor: colors.warning }]}>
              <View style={styles.goalIconContainer}>
                <FireIcon size={28} color={colors.textSecondary} />
              </View>
              <Text style={styles.goalNumber}>{todayStats.totalCalories}</Text>
              <Text style={styles.goalLabel}>칼로리</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${getProgressPercentage(todayStats.totalCalories, goals.dailyCalories)}%`,
                      backgroundColor: colors.warning
                    }
                  ]}
                />
              </View>
              <Text style={styles.goalTarget}>목표: {goals.dailyCalories}</Text>
            </View>
          </View>
        </View>

        {/* Quick Start */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.quickStartButton}
            onPress={handleQuickStart}
            activeOpacity={0.8}
          >
            <LinearGradient colors={gradients.primary} style={styles.quickStartGradient}>
              <View style={styles.quickStartContent}>
                <View>
                  <Text style={styles.quickStartTitle}>운동 시작하기</Text>
                  <Text style={styles.quickStartSubtitle}>오늘의 운동을 기록하세요</Text>
                </View>
                <View style={styles.quickStartIcon}>
                  <PlusIcon size={32} color="#FFFFFF" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Weekly Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이번 주 통계</Text>

          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <View style={styles.statIconContainer}>
                <DumbbellIcon size={24} color={colors.textSecondary} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>운동 횟수</Text>
                <Text style={styles.statValue}>{weekStats.workoutCount}회</Text>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statIconContainer}>
                <TimerIcon size={24} color={colors.textSecondary} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>총 운동 시간</Text>
                <Text style={styles.statValue}>{weekStats.totalMinutes}분</Text>
              </View>
            </View>

            <View style={[styles.statRow, { borderBottomWidth: 0 }]}>
              <View style={styles.statIconContainer}>
                <FireIcon size={24} color={colors.textSecondary} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>소모 칼로리</Text>
                <Text style={styles.statValue}>{weekStats.totalCalories} kcal</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <AddWorkoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddWorkout}
        selectedDate={today}
      />
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
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  title: {
    ...typography.h1,
    color: colors.surface,
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
  goalsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  goalCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    ...shadows.md,
  },
  goalIconContainer: {
    marginBottom: spacing.xs,
    alignItems: 'center',
  },
  goalNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  goalLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  goalTarget: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  quickStartButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.lg,
  },
  quickStartGradient: {
    padding: spacing.xl,
  },
  quickStartContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickStartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: 4,
  },
  quickStartSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickStartIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
