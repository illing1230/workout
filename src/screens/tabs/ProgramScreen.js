import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../../constants/theme';
import LinearGradient from '../../components/LinearGradient';

// 프로그램 데이터
const PROGRAMS = [
  {
    id: '1',
    name: '초보자 프로그램',
    icon: '🌱',
    level: '초급',
    duration: '4주',
    daysPerWeek: 3,
    description: '운동을 처음 시작하는 분들을 위한 프로그램',
    gradient: ['#00E676', '#00C853'],
    workouts: [
      { day: '1일차', exercises: ['워밍업', '스쿼트', '플랭크', '런지'], duration: 30 },
      { day: '2일차', exercises: ['워밍업', '푸쉬업', '크런치', '버드독'], duration: 30 },
      { day: '3일차', exercises: ['런닝', '스트레칭'], duration: 25 },
    ],
  },
  {
    id: '2',
    name: '근력 강화 프로그램',
    icon: '💪',
    level: '중급',
    duration: '8주',
    daysPerWeek: 4,
    description: '전신 근력 향상을 위한 체계적인 웨이트 트레이닝',
    gradient: ['#3292FF', '#00D9FF'],
    workouts: [
      { day: '1일차 (가슴/삼두)', exercises: ['벤치프레스', '인클라인 프레스', '딥스', '삼두운동'], duration: 60 },
      { day: '2일차 (등/이두)', exercises: ['데드리프트', '풀업', '로우', '이두컬'], duration: 60 },
      { day: '3일차 (하체)', exercises: ['스쿼트', '레그프레스', '런지', '레그컬'], duration: 60 },
      { day: '4일차 (어깨)', exercises: ['숄더프레스', '레터럴 레이즈', '페이스풀'], duration: 50 },
    ],
  },
  {
    id: '3',
    name: '체지방 감량 프로그램',
    icon: '🔥',
    level: '중급',
    duration: '6주',
    daysPerWeek: 5,
    description: '고강도 인터벌과 유산소 운동으로 효과적인 체지방 감량',
    gradient: ['#FF6B6B', '#FFD600'],
    workouts: [
      { day: '1일차 (HIIT)', exercises: ['버피', '마운틴 클라이머', '점프 스쿼트', '스프린트'], duration: 30 },
      { day: '2일차 (전신)', exercises: ['서킷 트레이닝', '케틀벨 스윙'], duration: 40 },
      { day: '3일차 (유산소)', exercises: ['런닝', '인터벌 러닝'], duration: 45 },
      { day: '4일차 (근력)', exercises: ['복합 운동', '웨이트 트레이닝'], duration: 50 },
      { day: '5일차 (HIIT)', exercises: ['타바타', '서킷'], duration: 30 },
    ],
  },
  {
    id: '4',
    name: '유연성 향상 프로그램',
    icon: '🧘',
    level: '초급',
    duration: '4주',
    daysPerWeek: 4,
    description: '요가와 스트레칭으로 몸의 유연성과 균형 향상',
    gradient: ['#9C27B0', '#E040FB'],
    workouts: [
      { day: '1일차', exercises: ['하타 요가', '전신 스트레칭'], duration: 40 },
      { day: '2일차', exercises: ['빈야사 요가', '코어 강화'], duration: 45 },
      { day: '3일차', exercises: ['음요가', '근막 이완'], duration: 50 },
      { day: '4일차', exercises: ['파워 요가', '균형 운동'], duration: 40 },
    ],
  },
  {
    id: '5',
    name: '풀바디 챌린지',
    icon: '⚡',
    level: '고급',
    duration: '12주',
    daysPerWeek: 6,
    description: '전문가를 위한 고강도 전신 운동 프로그램',
    gradient: ['#FF3D00', '#FF6B6B'],
    workouts: [
      { day: '1일차 (Push)', exercises: ['벤치프레스', '숄더프레스', '딥스'], duration: 70 },
      { day: '2일차 (Pull)', exercises: ['데드리프트', '풀업', '로우'], duration: 70 },
      { day: '3일차 (Legs)', exercises: ['스쿼트', '레그프레스', '런지'], duration: 75 },
      { day: '4일차 (Upper)', exercises: ['상체 집중 운동'], duration: 60 },
      { day: '5일차 (Lower)', exercises: ['하체 집중 운동'], duration: 65 },
      { day: '6일차 (Cardio)', exercises: ['HIIT', '유산소'], duration: 45 },
    ],
  },
];

const LEVEL_COLORS = {
  '초급': colors.success,
  '중급': colors.warning,
  '고급': colors.danger,
};

export default function ProgramScreen() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const renderProgramCard = ({ item }) => (
    <TouchableOpacity
      style={styles.programCard}
      onPress={() => setSelectedProgram(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.programGradient}
      >
        <View style={styles.programHeader}>
          <View style={styles.programIconContainer}>
            <Text style={styles.programIcon}>{item.icon}</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>

        <Text style={styles.programName}>{item.name}</Text>
        <Text style={styles.programDescription}>{item.description}</Text>

        <View style={styles.programStats}>
          <View style={styles.programStat}>
            <Text style={styles.programStatIcon}>📅</Text>
            <Text style={styles.programStatText}>{item.duration}</Text>
          </View>
          <View style={styles.programStat}>
            <Text style={styles.programStatIcon}>🔄</Text>
            <Text style={styles.programStatText}>주 {item.daysPerWeek}일</Text>
          </View>
          <View style={styles.programStat}>
            <Text style={styles.programStatIcon}>💪</Text>
            <Text style={styles.programStatText}>{item.workouts.length}가지 루틴</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>운동 프로그램</Text>
        <Text style={styles.headerSubtitle}>목표에 맞는 프로그램을 선택하세요</Text>
      </View>

      {/* Programs List */}
      <FlatList
        data={PROGRAMS}
        renderItem={renderProgramCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.programsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Program Detail Modal */}
      {selectedProgram && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedProgram(null)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={styles.modalContent}
            >
              {/* Modal Header with Gradient */}
              <LinearGradient
                colors={selectedProgram.gradient}
                style={styles.modalHeader}
              >
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedProgram(null)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>

                <View style={styles.modalIconContainer}>
                  <Text style={styles.modalIcon}>{selectedProgram.icon}</Text>
                </View>

                <Text style={styles.modalTitle}>{selectedProgram.name}</Text>
                <Text style={styles.modalSubtitle}>{selectedProgram.description}</Text>

                <View style={styles.modalHeaderStats}>
                  <View style={styles.modalHeaderStat}>
                    <Text style={styles.modalHeaderStatValue}>{selectedProgram.duration}</Text>
                    <Text style={styles.modalHeaderStatLabel}>프로그램 기간</Text>
                  </View>
                  <View style={styles.modalHeaderStat}>
                    <Text style={styles.modalHeaderStatValue}>주 {selectedProgram.daysPerWeek}일</Text>
                    <Text style={styles.modalHeaderStatLabel}>운동 빈도</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Workout Schedule */}
              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.sectionTitle}>운동 루틴</Text>

                {selectedProgram.workouts.map((workout, index) => (
                  <View key={index} style={styles.workoutCard}>
                    <View style={styles.workoutHeader}>
                      <View style={styles.workoutDayBadge}>
                        <Text style={styles.workoutDayText}>{workout.day}</Text>
                      </View>
                      <View style={styles.workoutDuration}>
                        <Text style={styles.workoutDurationIcon}>⏱️</Text>
                        <Text style={styles.workoutDurationText}>{workout.duration}분</Text>
                      </View>
                    </View>

                    <View style={styles.exercisesList}>
                      {workout.exercises.map((exercise, exIndex) => (
                        <View key={exIndex} style={styles.exerciseItem}>
                          <View style={styles.exerciseBullet} />
                          <Text style={styles.exerciseText}>{exercise}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.startButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedProgram(null);
                    alert('프로그램이 시작됩니다!');
                  }}
                >
                  <LinearGradient
                    colors={selectedProgram.gradient}
                    style={styles.startButtonGradient}
                  >
                    <Text style={styles.startButtonText}>프로그램 시작하기</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.bottomSpacing} />
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  programsList: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  programCard: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  programGradient: {
    padding: spacing.xl,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  programIconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  programIcon: {
    fontSize: 32,
  },
  levelBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  levelText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  programName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  programDescription: {
    ...typography.body2,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  programStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  programStat: {
    alignItems: 'center',
  },
  programStatIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  programStatText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  modalIcon: {
    fontSize: 48,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  modalSubtitle: {
    ...typography.body1,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  modalHeaderStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  modalHeaderStat: {
    alignItems: 'center',
  },
  modalHeaderStatValue: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  modalHeaderStatLabel: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  modalBody: {
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  workoutCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  workoutDayBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  workoutDayText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  workoutDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  workoutDurationIcon: {
    fontSize: 16,
  },
  workoutDurationText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  exercisesList: {
    gap: spacing.sm,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  exerciseText: {
    ...typography.body2,
    color: colors.textSecondary,
    flex: 1,
  },
  startButton: {
    marginTop: spacing.xl,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.lg,
  },
  startButtonGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  startButtonText: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});
