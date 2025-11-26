import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';
import { UserIcon, LogoutIcon, SettingsIcon, ChartIcon } from '../../components/Icons';

export default function ProfileScreen({ navigation }) {
  const { user, session, loading, signOut, getProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    setLoadingProfile(true);
    try {
      const { data, error } = await getProfile();
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('프로필 로드 실패:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // 비로그인 상태
  if (!user) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={gradients.primary} style={styles.header}>
          <Text style={styles.headerTitle}>프로필</Text>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.guestContainer}>
            <View style={styles.guestIconContainer}>
              <UserIcon size={80} color={colors.textTertiary} />
            </View>
            <Text style={styles.guestTitle}>로그인이 필요합니다</Text>
            <Text style={styles.guestSubtitle}>
              계정을 만들고 운동 데이터를 클라우드에 안전하게 보관하세요
            </Text>

            <TouchableOpacity
              style={styles.authButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={gradients.primary} style={styles.authButtonGradient}>
                <Text style={styles.authButtonText}>로그인</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.authSecondaryButton}
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.7}
            >
              <Text style={styles.authSecondaryButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>로컬 모드</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                현재 로컬 모드로 작동 중입니다. 모든 데이터는 기기에만 저장됩니다.
              </Text>
              <Text style={styles.infoTextSmall}>
                앱을 삭제하거나 재설치하면 데이터가 삭제됩니다.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // 로그인 상태
  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <Text style={styles.headerTitle}>프로필</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 프로필 카드 */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <LinearGradient colors={gradients.secondary} style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </Text>
            </LinearGradient>
          </View>
          <Text style={styles.profileName}>{profile?.full_name || '사용자'}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>

          {loadingProfile && (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: spacing.sm }} />
          )}
        </View>

        {/* 통계 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정 정보</Text>

          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconContainer}>
                <UserIcon size={24} color={colors.textSecondary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuLabel}>프로필 편집</Text>
                <Text style={styles.menuDescription}>이름, 사진 변경</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconContainer}>
                <ChartIcon size={24} color={colors.textSecondary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuLabel}>운동 통계</Text>
                <Text style={styles.menuDescription}>전체 운동 기록 보기</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconContainer}>
                <SettingsIcon size={24} color={colors.textSecondary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuLabel}>설정</Text>
                <Text style={styles.menuDescription}>앱 설정, 알림 등</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 동기화 정보 */}
        <View style={styles.section}>
          <View style={styles.syncCard}>
            <Text style={styles.syncTitle}>☁️ 클라우드 동기화 활성화</Text>
            <Text style={styles.syncText}>
              모든 운동 데이터가 안전하게 클라우드에 저장되고 있습니다.
            </Text>
          </View>
        </View>

        {/* 로그아웃 버튼 */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogoutIcon size={20} color={colors.danger} />
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: spacing.xl,
  },
  headerTitle: {
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
  guestContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl * 2,
    alignItems: 'center',
  },
  guestIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  guestTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  guestSubtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  authButton: {
    width: '100%',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  authButtonGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  authSecondaryButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  authSecondaryButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  profileCard: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xxl,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadows.md,
  },
  avatarContainer: {
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuArrow: {
    fontSize: 28,
    color: colors.textTertiary,
    fontWeight: '300',
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: spacing.lg + 48 + spacing.md,
  },
  syncCard: {
    backgroundColor: colors.primary + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  syncTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  syncText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  infoText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  infoTextSmall: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.danger + '40',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
    marginLeft: spacing.sm,
  },
});
