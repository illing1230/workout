import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';

export default function GoalSettingModal({ visible, onClose, currentGoals, onSave }) {
  const [dailyWorkouts, setDailyWorkouts] = useState(currentGoals.dailyWorkouts.toString());
  const [dailyMinutes, setDailyMinutes] = useState(currentGoals.dailyMinutes.toString());
  const [dailyCalories, setDailyCalories] = useState(currentGoals.dailyCalories.toString());

  const handleSave = () => {
    const workouts = parseInt(dailyWorkouts);
    const minutes = parseInt(dailyMinutes);
    const calories = parseInt(dailyCalories);

    if (isNaN(workouts) || workouts <= 0) {
      Alert.alert('알림', '올바른 운동 횟수를 입력해주세요.');
      return;
    }

    if (isNaN(minutes) || minutes <= 0) {
      Alert.alert('알림', '올바른 운동 시간을 입력해주세요.');
      return;
    }

    if (isNaN(calories) || calories <= 0) {
      Alert.alert('알림', '올바른 칼로리를 입력해주세요.');
      return;
    }

    onSave({
      dailyWorkouts: workouts,
      dailyMinutes: minutes,
      dailyCalories: calories,
    });

    Alert.alert('완료', '목표가 저장되었습니다.');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient colors={gradients.primary} style={styles.modalHeader}>
            <Text style={styles.modalTitle}>일일 목표 설정</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.modalBody}>
            <Text style={styles.description}>
              매일 달성하고 싶은 운동 목표를 설정하세요.
            </Text>

            <View style={styles.inputGroup}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalIcon}>🎯</Text>
                <Text style={styles.label}>운동 횟수</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={dailyWorkouts}
                  onChangeText={setDailyWorkouts}
                  placeholderTextColor={colors.textTertiary}
                />
                <Text style={styles.unit}>회</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalIcon}>⏱️</Text>
                <Text style={styles.label}>운동 시간</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={dailyMinutes}
                  onChangeText={setDailyMinutes}
                  placeholderTextColor={colors.textTertiary}
                />
                <Text style={styles.unit}>분</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalIcon}>🔥</Text>
                <Text style={styles.label}>소모 칼로리</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={dailyCalories}
                  onChangeText={setDailyCalories}
                  placeholderTextColor={colors.textTertiary}
                />
                <Text style={styles.unit}>kcal</Text>
              </View>
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <LinearGradient colors={gradients.primary} style={styles.saveButtonGradient}>
                <Text style={styles.saveButtonText}>저장</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    width: '100%',
    maxWidth: 400,
    ...shadows.xl,
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
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  goalIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  label: {
    ...typography.body1,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  input: {
    flex: 1,
    padding: spacing.lg,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
    marginLeft: spacing.sm,
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
  saveButtonGradient: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
