import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../../constants/theme';
import {
  RunningIcon,
  BenchPressIcon,
  SquatIcon,
  DeadliftIcon,
  YogaIcon,
  BikeIcon,
  PullUpIcon,
  PlankIcon,
  BurpeeIcon,
  ShoulderPressIcon,
  SwimmingIcon,
  JumpRopeIcon,
  RowingIcon,
  PushUpIcon,
  LungeIcon,
  CrunchIcon,
  KettlebellIcon,
  BoxJumpIcon,
  PilatesIcon,
} from '../../components/Icons';

// 운동 라이브러리 데이터
const EXERCISE_LIBRARY = [
  {
    id: '1',
    name: '런닝',
    iconComponent: RunningIcon,
    category: '유산소',
    difficulty: '초급',
    caloriesPerMin: 10,
    description: '심폐 지구력을 향상시키는 기본 유산소 운동',
    muscles: ['다리', '심폐'],
    duration: '20-60분',
  },
  {
    id: '2',
    name: '벤치프레스',
    iconComponent: BenchPressIcon,
    category: '가슴',
    difficulty: '중급',
    caloriesPerMin: 7,
    description: '가슴, 어깨, 삼두근을 발달시키는 대표적인 웨이트 운동',
    muscles: ['가슴', '어깨', '삼두'],
    duration: '10-15세트',
  },
  {
    id: '3',
    name: '스쿼트',
    iconComponent: SquatIcon,
    category: '하체',
    difficulty: '초급',
    caloriesPerMin: 8,
    description: '하체 근력과 코어를 강화하는 기본 운동',
    muscles: ['대퇴사두', '둔근', '코어'],
    duration: '10-15세트',
  },
  {
    id: '4',
    name: '데드리프트',
    iconComponent: DeadliftIcon,
    category: '등',
    difficulty: '고급',
    caloriesPerMin: 9,
    description: '전신 근력을 향상시키는 복합 운동',
    muscles: ['등', '하체', '코어'],
    duration: '8-12세트',
  },
  {
    id: '5',
    name: '요가',
    iconComponent: YogaIcon,
    category: '스트레칭',
    difficulty: '초급',
    caloriesPerMin: 4,
    description: '유연성과 균형감각을 향상시키는 운동',
    muscles: ['전신', '코어'],
    duration: '30-60분',
  },
  {
    id: '6',
    name: '사이클',
    iconComponent: BikeIcon,
    category: '유산소',
    difficulty: '초급',
    caloriesPerMin: 8,
    description: '무릎 부담이 적은 유산소 운동',
    muscles: ['다리', '심폐'],
    duration: '30-60분',
  },
  {
    id: '7',
    name: '풀업',
    iconComponent: PullUpIcon,
    category: '등',
    difficulty: '중급',
    caloriesPerMin: 8,
    description: '등과 이두근을 강화하는 자체 중량 운동',
    muscles: ['등', '이두', '코어'],
    duration: '8-12세트',
  },
  {
    id: '8',
    name: '플랭크',
    iconComponent: PlankIcon,
    category: '코어',
    difficulty: '초급',
    caloriesPerMin: 5,
    description: '코어 근력과 안정성을 향상시키는 정적 운동',
    muscles: ['복근', '코어', '어깨'],
    duration: '3-5세트',
  },
  {
    id: '9',
    name: '버피',
    iconComponent: BurpeeIcon,
    category: '전신',
    difficulty: '중급',
    caloriesPerMin: 12,
    description: '심폐 지구력과 전신 근력을 향상시키는 고강도 운동',
    muscles: ['전신', '심폐'],
    duration: '10-15분',
  },
  {
    id: '10',
    name: '숄더프레스',
    iconComponent: ShoulderPressIcon,
    category: '어깨',
    difficulty: '초급',
    caloriesPerMin: 6,
    description: '어깨 근력과 안정성을 향상시키는 운동',
    muscles: ['어깨', '삼두', '코어'],
    duration: '10-12세트',
  },
  {
    id: '11',
    name: '수영',
    iconComponent: SwimmingIcon,
    category: '유산소',
    difficulty: '중급',
    caloriesPerMin: 11,
    description: '전신 유산소 운동으로 관절 부담이 적음',
    muscles: ['전신', '심폐', '코어'],
    duration: '30-60분',
  },
  {
    id: '12',
    name: '줄넘기',
    iconComponent: JumpRopeIcon,
    category: '유산소',
    difficulty: '초급',
    caloriesPerMin: 13,
    description: '고강도 유산소 운동으로 체력 향상',
    muscles: ['심폐', '종아리', '코어'],
    duration: '15-30분',
  },
  {
    id: '13',
    name: '로잉',
    iconComponent: RowingIcon,
    category: '유산소',
    difficulty: '중급',
    caloriesPerMin: 10,
    description: '전신 근력과 심폐 지구력을 동시에 향상',
    muscles: ['등', '다리', '심폐', '코어'],
    duration: '20-40분',
  },
  {
    id: '14',
    name: '푸쉬업',
    iconComponent: PushUpIcon,
    category: '가슴',
    difficulty: '초급',
    caloriesPerMin: 7,
    description: '자체 체중을 이용한 기본 가슴 운동',
    muscles: ['가슴', '삼두', '어깨', '코어'],
    duration: '10-15세트',
  },
  {
    id: '15',
    name: '런지',
    iconComponent: LungeIcon,
    category: '하체',
    difficulty: '초급',
    caloriesPerMin: 7,
    description: '하체 근력과 균형감각을 향상시키는 운동',
    muscles: ['대퇴사두', '둔근', '햄스트링'],
    duration: '10-15세트',
  },
  {
    id: '16',
    name: '크런치',
    iconComponent: CrunchIcon,
    category: '코어',
    difficulty: '초급',
    caloriesPerMin: 5,
    description: '복근을 집중적으로 강화하는 운동',
    muscles: ['복근', '코어'],
    duration: '15-20세트',
  },
  {
    id: '17',
    name: '케틀벨 스윙',
    iconComponent: KettlebellIcon,
    category: '전신',
    difficulty: '중급',
    caloriesPerMin: 11,
    description: '폭발적인 힘과 전신 근력을 향상시키는 운동',
    muscles: ['둔근', '햄스트링', '코어', '어깨'],
    duration: '15-20분',
  },
  {
    id: '18',
    name: '박스 점프',
    iconComponent: BoxJumpIcon,
    category: '전신',
    difficulty: '중급',
    caloriesPerMin: 10,
    description: '폭발적인 하체 파워와 민첩성 향상',
    muscles: ['하체', '코어', '심폐'],
    duration: '10-15세트',
  },
  {
    id: '19',
    name: '필라테스',
    iconComponent: PilatesIcon,
    category: '스트레칭',
    difficulty: '초급',
    caloriesPerMin: 4,
    description: '코어 강화와 자세 교정을 위한 운동',
    muscles: ['코어', '전신', '유연성'],
    duration: '40-60분',
  },
  {
    id: '20',
    name: '랫풀다운',
    iconComponent: PullUpIcon,
    category: '등',
    difficulty: '초급',
    caloriesPerMin: 6,
    description: '등 넓이를 발달시키는 대표적인 운동',
    muscles: ['광배근', '이두', '어깨'],
    duration: '10-12세트',
  },
  {
    id: '21',
    name: '레그프레스',
    iconComponent: SquatIcon,
    category: '하체',
    difficulty: '초급',
    caloriesPerMin: 7,
    description: '허리 부담을 줄이면서 하체 근력 강화',
    muscles: ['대퇴사두', '둔근', '햄스트링'],
    duration: '10-15세트',
  },
  {
    id: '22',
    name: '딥스',
    iconComponent: PushUpIcon,
    category: '가슴',
    difficulty: '중급',
    caloriesPerMin: 8,
    description: '가슴과 삼두근을 집중 강화하는 자체중량 운동',
    muscles: ['가슴', '삼두', '어깨'],
    duration: '8-12세트',
  },
  {
    id: '23',
    name: '사이드 레터럴 레이즈',
    iconComponent: ShoulderPressIcon,
    category: '어깨',
    difficulty: '초급',
    caloriesPerMin: 5,
    description: '어깨 측면 근육을 발달시키는 고립 운동',
    muscles: ['삼각근', '어깨'],
    duration: '10-15세트',
  },
  {
    id: '24',
    name: '마운틴 클라이머',
    iconComponent: BurpeeIcon,
    category: '전신',
    difficulty: '중급',
    caloriesPerMin: 12,
    description: '심폐 지구력과 코어 강화를 동시에',
    muscles: ['코어', '심폐', '전신'],
    duration: '10-20분',
  },
  {
    id: '25',
    name: '러시안 트위스트',
    iconComponent: CrunchIcon,
    category: '코어',
    difficulty: '중급',
    caloriesPerMin: 6,
    description: '복사근을 집중 강화하는 회전 운동',
    muscles: ['복사근', '코어'],
    duration: '12-15세트',
  },
];

const CATEGORIES = ['전체', '유산소', '가슴', '등', '하체', '어깨', '코어', '스트레칭', '전신'];

const DIFFICULTY_COLORS = {
  '초급': colors.success,
  '중급': colors.warning,
  '고급': colors.danger,
};

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  // 필터링된 운동 목록
  const filteredExercises = EXERCISE_LIBRARY.filter(exercise => {
    const matchesCategory = selectedCategory === '전체' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderExerciseCard = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => setSelectedExercise(item)}
      activeOpacity={0.7}
    >
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseIcon}>
          <item.iconComponent size={32} color={colors.primary} />
        </View>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <View style={styles.exerciseMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: DIFFICULTY_COLORS[item.difficulty] + '20' }]}>
              <Text style={[styles.difficultyText, { color: DIFFICULTY_COLORS[item.difficulty] }]}>
                {item.difficulty}
              </Text>
            </View>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.caloriesBadge}>
          <Text style={styles.caloriesText}>{item.caloriesPerMin}</Text>
          <Text style={styles.caloriesLabel}>kcal/분</Text>
        </View>
      </View>
      <Text style={styles.exerciseDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.muscleContainer}>
        {item.muscles.map((muscle, index) => (
          <View key={index} style={styles.muscleTag}>
            <Text style={styles.muscleText}>{muscle}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>운동 라이브러리</Text>
        <Text style={styles.headerSubtitle}>다양한 운동을 탐색하고 배워보세요</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="운동 검색..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter - Modern Chip Style */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercise List */}
      <FlatList
        data={filteredExercises}
        renderItem={renderExerciseCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.exerciseList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
            <Text style={styles.emptySubtext}>다른 검색어를 시도해보세요</Text>
          </View>
        }
      />

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedExercise(null)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalIconLarge}>
                <Text style={styles.modalIconText}>{selectedExercise.icon}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedExercise(null)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>{selectedExercise.name}</Text>

            <View style={styles.modalStats}>
              <View style={styles.modalStatItem}>
                <Text style={styles.modalStatLabel}>난이도</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: DIFFICULTY_COLORS[selectedExercise.difficulty] + '20' }]}>
                  <Text style={[styles.difficultyText, { color: DIFFICULTY_COLORS[selectedExercise.difficulty] }]}>
                    {selectedExercise.difficulty}
                  </Text>
                </View>
              </View>
              <View style={styles.modalStatItem}>
                <Text style={styles.modalStatLabel}>카테고리</Text>
                <Text style={styles.modalStatValue}>{selectedExercise.category}</Text>
              </View>
              <View style={styles.modalStatItem}>
                <Text style={styles.modalStatLabel}>소모 칼로리</Text>
                <Text style={styles.modalStatValue}>{selectedExercise.caloriesPerMin} kcal/분</Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>설명</Text>
              <Text style={styles.modalDescription}>{selectedExercise.description}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>주요 근육</Text>
              <View style={styles.muscleContainer}>
                {selectedExercise.muscles.map((muscle, index) => (
                  <View key={index} style={styles.muscleTagLarge}>
                    <Text style={styles.muscleTextLarge}>{muscle}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>권장 운동 시간</Text>
              <Text style={styles.modalDuration}>{selectedExercise.duration}</Text>
            </View>
          </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    height: 50,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body1,
    color: colors.textPrimary,
  },
  clearButton: {
    fontSize: 20,
    color: colors.textTertiary,
    padding: spacing.xs,
  },
  categoryWrapper: {
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
  },
  categoryContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    marginRight: spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: colors.surface,
    fontWeight: '600',
  },
  exerciseList: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  exerciseIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    ...typography.caption,
    fontWeight: '600',
  },
  categoryText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  caloriesBadge: {
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  caloriesText: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '700',
  },
  caloriesLabel: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  exerciseDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  muscleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  muscleTag: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  muscleText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  emptyText: {
    ...typography.h4,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.body2,
    color: colors.textTertiary,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxHeight: '90%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalIconLarge: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalIconText: {
    fontSize: 48,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing.sm,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.backgroundAlt,
    borderRadius: borderRadius.md,
  },
  modalStatItem: {
    alignItems: 'center',
  },
  modalStatLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  modalStatValue: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  modalSection: {
    marginBottom: spacing.lg,
  },
  modalSectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  modalDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  muscleTagLarge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  muscleTextLarge: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modalDuration: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
});
