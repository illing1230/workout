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
import { EXERCISE_LIBRARY, CATEGORIES } from '../../data/exerciseLibrary';

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
                <selectedExercise.iconComponent size={48} color={colors.primary} />
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
