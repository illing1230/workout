import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useWorkout } from '../../context/WorkoutContext';
import AddWorkoutModal from '../modals/AddWorkoutModal';
import EditWorkoutModal from '../modals/EditWorkoutModal';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';

export default function WorkoutScreen() {
  const { workouts, getMarkedDates, addWorkout, updateWorkout, deleteWorkout } = useWorkout();
  const today = new Date().toISOString().split('T')[0];
  const [selected, setSelected] = useState(today);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const onDayPress = (day) => {
    setSelected(day.dateString);
  };

  const handleAddWorkout = async (workout) => {
    await addWorkout(selected, workout);
    setModalVisible(false);
  };

  const handleEditWorkout = (workout) => {
    setSelectedWorkout(workout);
    setEditModalVisible(true);
  };

  const handleUpdateWorkout = async (updatedWorkout) => {
    await updateWorkout(selected, selectedWorkout.id, updatedWorkout);
    setEditModalVisible(false);
    setSelectedWorkout(null);
  };

  const handleDeleteWorkout = (workoutId) => {
    Alert.alert(
      '운동 삭제',
      '이 운동 기록을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => deleteWorkout(selected, workoutId),
        },
      ]
    );
  };

  const selectedWorkouts = selected ? workouts[selected] || [] : [];

  const getRecentWorkouts = () => {
    const allWorkouts = [];
    Object.keys(workouts).forEach(date => {
      workouts[date].forEach(workout => {
        allWorkouts.push({ ...workout, date });
      });
    });
    return allWorkouts
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  };

  const recentWorkouts = getRecentWorkouts();
  const markedDates = getMarkedDates();

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Text style={styles.title}>운동 기록</Text>
        <Text style={styles.subtitle}>캘린더에서 날짜를 선택하세요</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={selected}
            onDayPress={onDayPress}
            markedDates={{
              ...markedDates,
              [selected]: {
                ...markedDates[selected],
                selected: true,
                selectedColor: colors.primary,
                selectedTextColor: colors.surface,
              },
              [today]: {
                ...markedDates[today],
                marked: markedDates[today]?.marked,
                today: true,
              },
            }}
            enableSwipeMonths={true}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: colors.surface,
              todayTextColor: colors.secondary,
              todayBackgroundColor: 'rgba(236, 72, 153, 0.1)',
              dayTextColor: colors.textPrimary,
              textDisabledColor: colors.textTertiary,
              dotColor: colors.secondary,
              selectedDotColor: colors.surface,
              arrowColor: colors.primary,
              monthTextColor: colors.textPrimary,
              indicatorColor: colors.primary,
              textDayFontWeight: '500',
              textMonthFontWeight: '700',
              textDayHeaderFontWeight: '600',
              textDayFontSize: 15,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 13,
            }}
          />
        </View>

        {selected && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  {new Date(selected).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                </Text>
                <Text style={styles.sectionSubtitle}>
                  {selectedWorkouts.length}개의 운동 기록
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
              >
                <LinearGradient colors={gradients.primary} style={styles.addButtonGradient}>
                  <Text style={styles.addButtonText}>+ 추가</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {selectedWorkouts.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📝</Text>
                <Text style={styles.emptyText}>아직 운동 기록이 없습니다</Text>
                <Text style={styles.emptySubtext}>위의 추가 버튼을 눌러 운동을 기록하세요</Text>
              </View>
            ) : (
              <View style={styles.workoutList}>
                {selectedWorkouts.map((workout, index) => (
                  <View key={workout.id} style={styles.workoutCard}>
                    <View style={[styles.workoutColorBar, {
                      backgroundColor: index % 3 === 0 ? colors.primary :
                                      index % 3 === 1 ? colors.secondary : colors.warning
                    }]} />
                    <View style={styles.workoutContent}>
                      <View style={styles.workoutHeader}>
                        <View style={styles.workoutTitleContainer}>
                          <Text style={styles.workoutIcon}>{workout.icon}</Text>
                          <Text style={styles.workoutType}>{workout.type}</Text>
                        </View>
                        <View style={styles.workoutActions}>
                          <TouchableOpacity
                            onPress={() => handleEditWorkout(workout)}
                            style={styles.editButton}
                          >
                            <Text style={styles.editButtonText}>✎</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleDeleteWorkout(workout.id)}
                            style={styles.deleteButton}
                          >
                            <Text style={styles.deleteButtonText}>✕</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.workoutStats}>
                        <View style={styles.workoutStat}>
                          <Text style={styles.workoutStatLabel}>시간</Text>
                          <Text style={styles.workoutStatValue}>{workout.duration}분</Text>
                        </View>
                        <View style={styles.workoutStat}>
                          <Text style={styles.workoutStatLabel}>칼로리</Text>
                          <Text style={styles.workoutStatValue}>{workout.calories} kcal</Text>
                        </View>
                      </View>
                      {workout.notes && (
                        <Text style={styles.workoutNotes}>{workout.notes}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 운동</Text>
          {recentWorkouts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🏋️</Text>
              <Text style={styles.emptyText}>최근 운동 기록이 없습니다</Text>
            </View>
          ) : (
            <View style={styles.recentList}>
              {recentWorkouts.map((workout) => (
                <View key={`${workout.date}-${workout.id}`} style={styles.recentCard}>
                  <View style={styles.recentIconContainer}>
                    <Text style={styles.recentIcon}>{workout.icon}</Text>
                  </View>
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentType}>{workout.type}</Text>
                    <Text style={styles.recentDate}>
                      {new Date(workout.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Text>
                  </View>
                  <Text style={styles.recentDuration}>{workout.duration}분</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <AddWorkoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddWorkout}
        selectedDate={selected}
      />

      <EditWorkoutModal
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedWorkout(null);
        }}
        onUpdate={handleUpdateWorkout}
        selectedDate={selected}
        workout={selectedWorkout}
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
  calendarContainer: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    ...shadows.md,
  },
  addButtonGradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.surface,
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
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  workoutList: {
    gap: spacing.md,
  },
  workoutCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
    flexDirection: 'row',
  },
  workoutColorBar: {
    width: 4,
  },
  workoutContent: {
    flex: 1,
    padding: spacing.lg,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  workoutTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  workoutIcon: {
    fontSize: 28,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  workoutActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 18,
    color: colors.secondary,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    color: colors.danger,
  },
  workoutStats: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.sm,
  },
  workoutStat: {
    flex: 1,
  },
  workoutStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  workoutStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  workoutNotes: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  recentList: {
    gap: spacing.sm,
  },
  recentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
  },
  recentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recentIcon: {
    fontSize: 24,
  },
  recentInfo: {
    flex: 1,
  },
  recentType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  recentDuration: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
});
