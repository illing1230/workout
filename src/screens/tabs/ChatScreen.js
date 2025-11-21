import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import { useWorkout } from '../../context/WorkoutContext';

// AI 챗봇 응답 시뮬레이션 (실제로는 API 호출)
const generateBotResponse = (userMessage, workoutContext) => {
  const lowerMessage = userMessage.toLowerCase();

  // 운동 추천
  if (lowerMessage.includes('추천') || lowerMessage.includes('운동') || lowerMessage.includes('시작')) {
    return {
      type: 'recommendation',
      text: '체력 수준에 맞는 운동을 추천해드릴게요! 초보자라면 가벼운 런닝과 스쿼트부터 시작하는 것을 권장합니다. 주 3-4회, 20-30분씩 진행해보세요.',
      suggestions: ['런닝 시작하기', '초보자 프로그램', '운동 루틴 짜기'],
    };
  }

  // 식단 관련
  if (lowerMessage.includes('식단') || lowerMessage.includes('음식') || lowerMessage.includes('먹')) {
    return {
      type: 'nutrition',
      text: '운동 효과를 극대화하려면 단백질 섭취가 중요합니다. 체중 1kg당 1.6-2.2g의 단백질을 섭취하고, 운동 전후 탄수화물 보충도 잊지 마세요!',
      suggestions: ['식단 계획', '단백질 식품', '운동 전 식사'],
    };
  }

  // 통계 관련
  if (lowerMessage.includes('통계') || lowerMessage.includes('기록') || lowerMessage.includes('얼마나')) {
    const stats = workoutContext.getWeekStats();
    return {
      type: 'stats',
      text: `이번 주 운동 통계입니다:\n\n💪 총 ${stats.totalWorkouts}회 운동\n⏱️ 총 ${stats.totalMinutes}분\n🔥 ${stats.totalCalories} kcal 소모\n\n꾸준히 잘 하고 계세요! 💯`,
      suggestions: ['주간 목표 설정', '운동 기록 보기', '다음 운동 계획'],
    };
  }

  // 동기부여
  if (lowerMessage.includes('힘들') || lowerMessage.includes('포기') || lowerMessage.includes('어려')) {
    return {
      type: 'motivation',
      text: '운동해 이쉐키양',
      suggestions: ['동기부여 명언', '성공 사례', '목표 재설정'],
    };
  }

  // 부상/통증
  if (lowerMessage.includes('아프') || lowerMessage.includes('통증') || lowerMessage.includes('부상')) {
    return {
      type: 'health',
      text: '통증이 있다면 즉시 운동을 중단하고 휴식을 취하세요. 지속되는 통증은 전문의 상담이 필요합니다. 무리하지 마시고 천천히 회복하세요.',
      suggestions: ['스트레칭 방법', '휴식 중 할 일', '재활 운동'],
    };
  }

  // 프로그램 문의
  if (lowerMessage.includes('프로그램') || lowerMessage.includes('루틴') || lowerMessage.includes('계획')) {
    return {
      type: 'program',
      text: '목표에 맞는 프로그램을 선택하는 것이 중요합니다. 근력 향상이 목표라면 웨이트 트레이닝, 체지방 감량이 목표라면 HIIT와 유산소를 추천드려요!',
      suggestions: ['프로그램 둘러보기', '맞춤 루틴 만들기', '운동 일정 짜기'],
    };
  }

  // 기본 응답
  return {
    type: 'general',
    text: '운동해 이쉐키양',
    suggestions: ['운동 추천받기', '내 통계 보기', '프로그램 추천', '식단 조언'],
  };
};

export default function ChatScreen() {
  const workoutContext = useWorkout();
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      text: '안녕하세요! 👋\n\n저는 여러분의 운동 파트너 AI입니다. 운동 추천, 식단 조언, 동기부여 등 무엇이든 물어보세요!',
      timestamp: new Date(),
      suggestions: ['운동 추천받기', '내 통계 보기', '프로그램 추천', '오늘 뭐 할까?'],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // 새 메시지가 추가되면 스크롤을 아래로
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // AI 응답 시뮬레이션 (1초 딜레이)
    setTimeout(() => {
      const botResponse = generateBotResponse(text, workoutContext);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse.text,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionPress = (suggestion) => {
    handleSend(suggestion);
  };

  const renderMessage = ({ item }) => {
    const isBot = item.type === 'bot';

    return (
      <View style={[styles.messageContainer, isBot ? styles.botMessageContainer : styles.userMessageContainer]}>
        {isBot && (
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>🤖</Text>
          </View>
        )}

        <View style={[styles.messageBubble, isBot ? styles.botBubble : styles.userBubble]}>
          <Text style={[styles.messageText, isBot ? styles.botText : styles.userText]}>
            {item.text}
          </Text>
          {item.suggestions && item.suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {item.suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionChip}
                  onPress={() => handleSuggestionPress(suggestion)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {!isBot && (
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>👤</Text>
          </View>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={[styles.messageContainer, styles.botMessageContainer]}>
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarText}>🤖</Text>
        </View>
        <View style={[styles.messageBubble, styles.botBubble, styles.typingBubble]}>
          <View style={styles.typingDots}>
            <View style={[styles.typingDot, styles.typingDot1]} />
            <View style={[styles.typingDot, styles.typingDot2]} />
            <View style={[styles.typingDot, styles.typingDot3]} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>🤖</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>AI 트레이너</Text>
            <Text style={styles.headerSubtitle}>운동 전문가</Text>
          </View>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderTypingIndicator}
      />

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => handleSend('오늘 추천 운동')}
          >
            <Text style={styles.quickActionIcon}>💪</Text>
            <Text style={styles.quickActionText}>운동 추천</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => handleSend('내 운동 통계')}
          >
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionText}>통계</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => handleSend('식단 조언')}
          >
            <Text style={styles.quickActionIcon}>🥗</Text>
            <Text style={styles.quickActionText}>식단</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => handleSend('동기부여 해줘')}
          >
            <Text style={styles.quickActionIcon}>🔥</Text>
            <Text style={styles.quickActionText}>동기부여</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor={colors.textTertiary}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => handleSend()}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={() => handleSend()}
          disabled={!inputText.trim()}
          activeOpacity={0.7}
        >
          <Text style={styles.sendButtonText}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 45,
    height: 45,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerAvatarText: {
    fontSize: 24,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  messagesList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  botAvatarText: {
    fontSize: 20,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  userAvatarText: {
    fontSize: 20,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  botBubble: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: spacing.xs,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: spacing.xs,
  },
  messageText: {
    ...typography.body1,
    lineHeight: 22,
  },
  botText: {
    color: colors.textPrimary,
  },
  userText: {
    color: '#FFFFFF',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  suggestionChip: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  typingBubble: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  typingDots: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textTertiary,
  },
  typingDot1: {
    animationName: 'typing',
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationDelay: '0s',
  },
  typingDot2: {
    animationName: 'typing',
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationDelay: '0.2s',
  },
  typingDot3: {
    animationName: 'typing',
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationDelay: '0.4s',
  },
  quickActionsContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quickAction: {
    alignItems: 'center',
    marginRight: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  quickActionText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...typography.body1,
    color: colors.textPrimary,
    maxHeight: 100,
    marginRight: spacing.md,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.surfaceLight,
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
  },
});
