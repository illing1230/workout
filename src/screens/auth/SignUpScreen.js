import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import LinearGradient from '../../components/LinearGradient';
import { colors, gradients, spacing, borderRadius, shadows, typography } from '../../constants/theme';

export default function SignUpScreen({ navigation }) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('알림', '모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('알림', '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        Alert.alert('회원가입 실패', error.message);
      } else {
        Alert.alert(
          '회원가입 성공',
          '이메일 인증을 완료해주세요. 인증 메일을 확인해주세요.',
          [
            {
              text: '확인',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('오류', '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={gradients.primary} style={styles.header}>
          <Text style={styles.logo}>AI Fitness Labs</Text>
          <Text style={styles.tagline}>새로운 운동 경험을 시작하세요</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.title}>회원가입</Text>
          <Text style={styles.subtitle}>계정을 만들어 데이터를 안전하게 보관하세요</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="홍길동"
              placeholderTextColor={colors.textTertiary}
              value={fullName}
              onChangeText={setFullName}
              autoComplete="name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor={colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="최소 6자 이상"
              placeholderTextColor={colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password-new"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 다시 입력하세요"
              placeholderTextColor={colors.textTertiary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password-new"
            />
          </View>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignUp}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient colors={gradients.primary} style={styles.signupButtonGradient}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.signupButtonText}>회원가입</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              회원가입을 진행하면{' '}
              <Text style={styles.termsLink}>서비스 이용약관</Text> 및{' '}
              <Text style={styles.termsLink}>개인정보 처리방침</Text>에 동의하는 것으로 간주됩니다.
            </Text>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>또는</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              이미 계정이 있으신가요? <Text style={styles.loginTextBold}>로그인</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>나중에 하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body1,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  signupButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginTop: spacing.lg,
    ...shadows.md,
  },
  signupButtonGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  termsContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  termsText: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    paddingHorizontal: spacing.md,
    color: colors.textTertiary,
    fontSize: 14,
  },
  loginButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  loginTextBold: {
    fontWeight: '700',
    color: colors.primary,
  },
  skipButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  skipText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});
