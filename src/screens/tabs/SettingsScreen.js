import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useWorkout } from '../../context/WorkoutContext';
import GoalSettingModal from '../modals/GoalSettingModal';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';

export default function SettingsScreen() {
  const { goals, updateGoals } = useWorkout();
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const handleGoalSave = async (newGoals) => {
    await updateGoals(newGoals);
  };

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuIconContainer}>
        <Text style={styles.menuIcon}>{icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && <Text style={styles.menuArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Text style={styles.title}>설정</Text>
        <Text style={styles.subtitle}>앱 환경을 맞춤 설정하세요</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Goals Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>현재 목표</Text>
          <View style={styles.goalsCard}>
            <View style={styles.goalRow}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalEmoji}>🎯</Text>
                <Text style={styles.goalLabel}>일일 운동 횟수</Text>
              </View>
              <Text style={[styles.goalValue, { color: colors.primary }]}>
                {goals.dailyWorkouts}회
              </Text>
            </View>
            <View style={styles.goalRow}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalEmoji}>⏱️</Text>
                <Text style={styles.goalLabel}>일일 운동 시간</Text>
              </View>
              <Text style={[styles.goalValue, { color: colors.secondary }]}>
                {goals.dailyMinutes}분
              </Text>
            </View>
            <View style={[styles.goalRow, { borderBottomWidth: 0 }]}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalEmoji}>🔥</Text>
                <Text style={styles.goalLabel}>일일 소모 칼로리</Text>
              </View>
              <Text style={[styles.goalValue, { color: colors.warning }]}>
                {goals.dailyCalories} kcal
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editGoalsButton}
              onPress={() => setGoalModalVisible(true)}
            >
              <LinearGradient colors={gradients.primary} style={styles.editGoalsGradient}>
                <Text style={styles.editGoalsText}>목표 수정하기</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>프로필</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="👤"
              title="프로필 편집"
              subtitle="이름, 사진 등 변경"
              onPress={() => Alert.alert('준비중', '프로필 편집 기능은 곧 추가될 예정입니다.')}
            />
          </View>
        </View>

        {/* Workout Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>운동 설정</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="🔔"
              title="운동 알림"
              subtitle="운동 시간 알림 받기"
              onPress={() => Alert.alert('준비중', '운동 알림 기능은 곧 추가될 예정입니다.')}
            />
            <MenuItem
              icon="⏰"
              title="기본 운동 시간"
              subtitle="기본값 설정"
              onPress={() => Alert.alert('준비중', '기본 운동 시간 설정 기능은 곧 추가될 예정입니다.')}
            />
            <MenuItem
              icon="🏃"
              title="운동 카테고리 관리"
              subtitle="카테고리 추가/삭제"
              onPress={() => Alert.alert('준비중', '운동 카테고리 관리 기능은 곧 추가될 예정입니다.')}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="ℹ️"
              title="버전 정보"
              subtitle="v1.0.0"
              onPress={() => {}}
              showArrow={false}
            />
            <MenuItem
              icon="📄"
              title="이용 약관"
              onPress={() => Alert.alert('이용 약관', '이용 약관 내용이 여기에 표시됩니다.')}
            />
            <MenuItem
              icon="🔒"
              title="개인정보 처리방침"
              onPress={() => Alert.alert('개인정보 처리방침', '개인정보 처리방침 내용이 여기에 표시됩니다.')}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => Alert.alert('로그아웃', '로그아웃 기능은 곧 추가될 예정입니다.')}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <GoalSettingModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        currentGoals={goals}
        onSave={handleGoalSave}
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
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  goalsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  goalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  goalEmoji: {
    fontSize: 24,
  },
  goalLabel: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  goalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  editGoalsButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  editGoalsGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  editGoalsText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  menuArrow: {
    fontSize: 28,
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },
  logoutButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.danger,
  },
});
