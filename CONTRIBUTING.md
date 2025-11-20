# 🤝 Contributing to Health App

Health App 프로젝트에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 설명합니다.

## 📋 목차

- [행동 강령](#행동-강령)
- [시작하기](#시작하기)
- [개발 프로세스](#개발-프로세스)
- [코드 스타일](#코드-스타일)
- [커밋 메시지](#커밋-메시지)
- [Pull Request](#pull-request)
- [이슈 리포팅](#이슈-리포팅)

## 🤝 행동 강령

프로젝트 참여자는 서로를 존중하고 포용적인 환경을 유지해야 합니다.

## 🚀 시작하기

### 1. Fork & Clone

```bash
# Repository Fork 후
git clone https://github.com/YOUR_USERNAME/health-app.git
cd health-app
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm start
```

## 💻 개발 프로세스

### 브랜치 생성

```bash
git checkout -b feature/your-feature-name
# 또는
git checkout -b fix/your-bug-fix
```

### 브랜치 네이밍 규칙

- `feature/` - 새로운 기능
- `fix/` - 버그 수정
- `docs/` - 문서 수정
- `refactor/` - 코드 리팩토링
- `test/` - 테스트 추가/수정
- `chore/` - 기타 작업

## 📝 코드 스타일

### React Native 컴포넌트

```javascript
// ✅ 좋은 예시
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export default function MyComponent({ title, onPress }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // 효과 로직
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
});
```

### 스타일링 가이드

1. **테마 시스템 사용**
```javascript
// ✅ 좋음
import { colors, spacing } from '../constants/theme';
backgroundColor: colors.surface,
padding: spacing.lg,

// ❌ 나쁨
backgroundColor: '#242D34',
padding: 16,
```

2. **명확한 변수명**
```javascript
// ✅ 좋음
const [isModalVisible, setIsModalVisible] = useState(false);
const handleAddWorkout = () => { };

// ❌ 나쁨
const [vis, setVis] = useState(false);
const handle = () => { };
```

3. **함수형 컴포넌트 & Hooks**
```javascript
// ✅ 좋음
export default function MyComponent() {
  const [state, setState] = useState(null);
  // ...
}

// ❌ 나쁨 (Class 컴포넌트 사용하지 않기)
class MyComponent extends React.Component { }
```

## 📨 커밋 메시지

### 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 프로세스, 도구 설정 등

### 예시

```bash
feat(chat): AI 챗봇 응답 로직 추가

- 운동 추천 키워드 처리 추가
- 식단 조언 응답 구현
- 통계 분석 기능 연동

Closes #123
```

```bash
fix(workout): 운동 기록 삭제 시 캘린더 마커 미업데이트 버그 수정

캘린더 컴포넌트가 운동 삭제 후 리렌더링되지 않는 문제 해결
```

## 🔄 Pull Request

### PR 생성 전 체크리스트

- [ ] 코드가 정상적으로 빌드되는가?
- [ ] 새로운 기능이 문서화되었는가?
- [ ] 커밋 메시지가 규칙을 따르는가?
- [ ] 코드 스타일이 프로젝트 규칙을 따르는가?

### PR 템플릿

```markdown
## 📝 변경 사항

<!-- 무엇을 변경했는지 설명 -->

## 🎯 변경 이유

<!-- 왜 이 변경이 필요한지 설명 -->

## 🧪 테스트 방법

<!-- 어떻게 테스트했는지 설명 -->

## 📸 스크린샷 (있다면)

<!-- UI 변경이 있다면 스크린샷 첨부 -->

## ✅ 체크리스트

- [ ] 코드가 빌드되고 실행됩니다
- [ ] 새로운 기능이 문서화되었습니다
- [ ] 커밋 메시지가 컨벤션을 따릅니다
- [ ] 코드 스타일이 프로젝트 규칙을 따릅니다

## 📌 관련 이슈

Closes #이슈번호
```

### PR 프로세스

1. **Fork & Branch 생성**
2. **변경사항 커밋**
3. **Push to Fork**
4. **PR 생성**
5. **코드 리뷰 대기**
6. **피드백 반영**
7. **Merge**

## 🐛 이슈 리포팅

### 버그 리포트 템플릿

```markdown
## 🐛 버그 설명

<!-- 버그에 대한 명확한 설명 -->

## 🔄 재현 방법

1. '...'로 이동
2. '...'를 클릭
3. 스크롤 다운
4. 에러 발생

## ✅ 예상 동작

<!-- 어떻게 동작해야 하는지 -->

## ❌ 실제 동작

<!-- 실제로 어떻게 동작하는지 -->

## 📸 스크린샷

<!-- 있다면 추가 -->

## 💻 환경

- OS: [예: iOS 16.0, Android 13]
- 앱 버전: [예: 1.0.0]
- 디바이스: [예: iPhone 14, Samsung Galaxy S23]

## 📝 추가 정보

<!-- 추가 컨텍스트 -->
```

### 기능 요청 템플릿

```markdown
## 🚀 기능 설명

<!-- 원하는 기능에 대한 명확한 설명 -->

## 🎯 문제/동기

<!-- 이 기능이 필요한 이유 -->

## 💡 제안하는 솔루션

<!-- 어떻게 구현되어야 하는지 -->

## 🔄 대안

<!-- 고려한 다른 방법들 -->

## 📝 추가 정보

<!-- 추가 컨텍스트, 스크린샷 등 -->
```

## 🎯 기여 아이디어

다음과 같은 기여를 환영합니다:

### 🐛 버그 수정
- 앱 크래시 문제
- UI/UX 버그
- 데이터 동기화 문제

### ✨ 새로운 기능
- 새로운 운동 종류 추가
- 통계 차트 개선
- 소셜 공유 기능
- 알림 기능

### 📚 문서
- README 개선
- 코드 주석 추가
- 튜토리얼 작성

### 🎨 UI/UX
- 디자인 개선
- 애니메이션 추가
- 접근성 향상

### 🧪 테스트
- Unit 테스트 추가
- Integration 테스트
- E2E 테스트

## 💡 질문이나 도움이 필요한가요?

- 이슈를 생성해주세요
- 또는 기존 이슈에 댓글을 남겨주세요

## 🙏 감사합니다!

여러분의 기여가 Health App을 더 나은 앱으로 만듭니다!

---

**Happy Coding! 🚀**
