import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';

const WORKOUT_TYPES = [
  { name: '런닝', icon: '🏃', caloriesPerMin: 10 },
  { name: '웨이트', icon: '🏋️', caloriesPerMin: 7 },
  { name: '요가', icon: '🧘', caloriesPerMin: 4 },
  { name: '사이클', icon: '🚴', caloriesPerMin: 8 },
  { name: '수영', icon: '🏊', caloriesPerMin: 9 },
  { name: '기타', icon: '💪', caloriesPerMin: 5 },
];

export default function AddWorkoutModal({ visible, onClose, onAdd, selectedDate }) {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const handleAdd = () => {
    if (!workoutType) {
      Alert.alert('알림', '운동 종류를 선택해주세요.');
      return;
    }

    if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
      Alert.alert('알림', '올바른 운동 시간을 입력해주세요.');
      return;
    }

    const selectedWorkout = WORKOUT_TYPES.find(w => w.name === workoutType);
    const calories = Math.round(parseInt(duration) * selectedWorkout.caloriesPerMin);

    const workout = {
      type: workoutType,
      icon: selectedWorkout.icon,
      duration: parseInt(duration),
      calories,
      notes,
    };

    onAdd(workout);
    resetForm();
  };

  const resetForm = () => {
    setWorkoutType('');
    setDuration('');
    setNotes('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient colors={gradients.primary} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>운동 기록 추가</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>날짜</Text>
              <Text style={styles.dateText}>
                {new Date(selectedDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>

            <Text style={styles.label}>운동 종류</Text>
            <View style={styles.workoutTypeGrid}>
              {WORKOUT_TYPES.map((workout) => (
                <TouchableOpacity
                  key={workout.name}
                  style={[
                    styles.workoutTypeButton,
                    workoutType === workout.name && styles.workoutTypeButtonSelected,
                  ]}
                  onPress={() => setWorkoutType(workout.name)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.workoutIcon}>{workout.icon}</Text>
                  <Text
                    style={[
                      styles.workoutTypeName,
                      workoutType === workout.name && styles.workoutTypeNameSelected,
                    ]}
                  >
                    {workout.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>운동 시간 (분)</Text>
            <TextInput
              style={styles.input}
              placeholder="예: 30"
              placeholderTextColor={colors.textTertiary}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />

            <Text style={styles.label}>메모 (선택)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="운동에 대한 메모를 입력하세요"
              placeholderTextColor={colors.textTertiary}
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAdd}
              activeOpacity={0.7}
            >
              <LinearGradient colors={gradients.primary} style={styles.addButtonGradient}>
                <Text style={styles.addButtonText}>추가</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
  },
  modalTitle: {
    ...typography.h3,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalBody: {
    padding: spacing.xl,
  },
  dateContainer: {
    backgroundColor: colors.surfaceAlt,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
  label: {
    ...typography.body1,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  workoutTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  workoutTypeButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  workoutTypeButtonSelected: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
    ...shadows.md,
  },
  workoutIcon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  workoutTypeName: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  workoutTypeNameSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: spacing.xl,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  button: {
    flex: 1,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  cancelButton: {
    backgroundColor: colors.surfaceAlt,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  addButtonGradient: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
