# 🏋️ Health App - AI 피트니스 트레이너

> Burnfit 스타일의 다크 테마 피트니스 앱 - 운동 기록, 프로그램 관리, AI 챗봇 상담

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Expo](https://img.shields.io/badge/expo-~54.0.23-000020?logo=expo)
![React Native](https://img.shields.io/badge/react--native-0.81.5-61DAFB?logo=react)

## 📋 목차

- [소개](#소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [화면 설명](#화면-설명)
- [색상 테마](#색상-테마)
- [개발 가이드](#개발-가이드)
- [배포 가이드](#배포-가이드)
- [문서 목록](#문서-목록)

## 🎯 소개

**Health App**은 [Burnfit.io](https://burnfit.io)에서 영감을 받아 제작된 현대적인 피트니스 추적 애플리케이션입니다.

다크 테마의 세련된 UI/UX와 AI 챗봇을 통해 사용자의 운동 여정을 지원하며, 체계적인 프로그램과 운동 라이브러리를 제공합니다.

### ✨ 핵심 특징

- 🎨 **Burnfit 스타일 다크 테마**: 눈의 피로를 줄이고 몰입도 향상
- 🤖 **AI 트레이너 챗봇**: 실시간 운동 상담 및 조언
- 📚 **운동 라이브러리**: 10가지 운동 종류와 상세 가이드
- 🎯 **체계적인 프로그램**: 5가지 레벨별 운동 프로그램
- 📊 **운동 기록 & 분석**: 캘린더 기반 운동 추적
- 💪 **목표 설정 & 달성**: 개인화된 일일 목표 관리

## 🚀 주요 기능

### 1️⃣ 홈 화면
- **오늘의 목표 대시보드**
  - 운동 횟수 진행률
  - 운동 시간 추적
  - 칼로리 소모량
- **빠른 운동 시작** 버튼
- **주간 통계** 요약

### 2️⃣ 운동 라이브러리
- **10가지 운동 종류**
  - 🏃 런닝 (10 kcal/분)
  - 💪 벤치프레스 (7 kcal/분)
  - 🏋️ 스쿼트 (8 kcal/분)
  - 🏋️ 데드리프트 (9 kcal/분)
  - 🧘 요가 (4 kcal/분)
  - 🚴 사이클 (8 kcal/분)
  - 💪 풀업 (8 kcal/분)
  - 🧘 플랭크 (5 kcal/분)
  - 🏃 버피 (12 kcal/분)
  - 💪 숄더프레스 (6 kcal/분)

- **기능**
  - 카테고리별 필터링 (유산소, 가슴, 등, 하체, 어깨, 코어, 스트레칭, 전신)
  - 검색 기능
  - 난이도 표시 (초급/중급/고급)
  - 상세 정보 모달

### 3️⃣ 운동 프로그램
5가지 체계적인 운동 프로그램 제공:

| 프로그램 | 레벨 | 기간 | 주당 빈도 | 목표 |
|---------|------|------|----------|------|
| 🌱 초보자 프로그램 | 초급 | 4주 | 3일 | 운동 습관 형성 |
| 💪 근력 강화 프로그램 | 중급 | 8주 | 4일 | 전신 근력 향상 |
| 🔥 체지방 감량 프로그램 | 중급 | 6주 | 5일 | 효과적인 지방 연소 |
| 🧘 유연성 향상 프로그램 | 초급 | 4주 | 4일 | 몸의 유연성과 균형 |
| ⚡ 풀바디 챌린지 | 고급 | 12주 | 6일 | 전문가 수준 도전 |

### 4️⃣ 운동 기록
- **캘린더 뷰**: React Native Calendars 사용
- **운동 기록 관리**
  - 운동 추가/수정/삭제
  - 운동 시간 및 칼로리 자동 계산
  - 메모 기능
- **날짜별 필터링**

### 5️⃣ AI 챗봇 트레이너
- **대화형 인터페이스**: 카카오톡 스타일 채팅 UI
- **지능형 응답 시스템**
  - 운동 추천
  - 식단 조언
  - 통계 분석
  - 동기부여
  - 부상/건강 관리
  - 프로그램 상담
- **빠른 액션 버튼**
  - 💪 운동 추천
  - 📊 통계 확인
  - 🥗 식단 조언
  - 🔥 동기부여
- **제안 칩**: 클릭 가능한 후속 질문

## 🛠 기술 스택

### Core
- **React Native** `0.81.5` - 크로스 플랫폼 프레임워크
- **Expo** `~54.0.23` - 개발 플랫폼
- **React** `19.1.0` - UI 라이브러리

### Navigation
- **@react-navigation/native** `^7.1.19`
- **@react-navigation/bottom-tabs** `^7.8.4`
- **react-native-screens** `^4.18.0`
- **react-native-safe-area-context** `^5.6.2`

### UI Components
- **react-native-calendars** `^1.1313.0` - 캘린더 컴포넌트
- **react-native-svg** `15.12.1` - SVG 렌더링
- **victory-native** `^41.20.2` - 차트 라이브러리

### Storage
- **@react-native-async-storage/async-storage** `2.2.0` - 로컬 데이터 저장

### Web Support
- **react-dom** `19.1.0`
- **react-native-web** `^0.21.0`

## 🚀 시작하기

### 필수 요구사항

- Node.js (v18 이상)
- npm 또는 yarn
- Expo CLI

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd health-app

# 의존성 설치
npm install
```

### 실행

```bash
# 개발 서버 시작
npm start

# 또는
expo start
```

### 플랫폼별 실행

```bash
# 웹 브라우저에서 실행
npm run web

# iOS 시뮬레이터 (Mac only)
npm run ios

# Android 에뮬레이터
npm run android
```

## 📁 프로젝트 구조

```
health-app/
├── App.js                          # 앱 진입점
├── index.js                        # 메인 엔트리
├── app.json                        # Expo 설정
├── package.json                    # 의존성
│
├── assets/                         # 정적 리소스
│   ├── icon.png
│   ├── favicon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
│
└── src/
    ├── components/                 # 공용 컴포넌트
    │   └── LinearGradient.js      # 그래디언트 래퍼
    │
    ├── constants/                  # 상수 & 테마
    │   └── theme.js               # 색상, 타이포그래피, 간격
    │
    ├── context/                    # 상태 관리
    │   └── WorkoutContext.js      # 운동 데이터 Context
    │
    ├── navigation/                 # 네비게이션
    │   └── BottomTabNavigator.js  # 하단 탭 네비게이션
    │
    └── screens/
        ├── tabs/                   # 메인 탭 화면
        │   ├── HomeScreen.js      # 홈 (대시보드)
        │   ├── LibraryScreen.js   # 운동 라이브러리
        │   ├── ProgramScreen.js   # 운동 프로그램
        │   ├── WorkoutScreen.js   # 운동 기록
        │   └── ChatScreen.js      # AI 챗봇
        │
        └── modals/                 # 모달 컴포넌트
            ├── AddWorkoutModal.js   # 운동 추가
            ├── EditWorkoutModal.js  # 운동 수정
            └── GoalSettingModal.js  # 목표 설정
```

## 📱 화면 설명

### 🏠 HomeScreen
**파일**: `src/screens/tabs/HomeScreen.js`

오늘의 운동 목표와 주간 통계를 한눈에 확인할 수 있는 대시보드입니다.

**주요 컴포넌트**:
- 그래디언트 헤더
- 목표 진행률 카드 (3개)
- 빠른 시작 버튼
- 주간 통계 요약

### 💪 LibraryScreen
**파일**: `src/screens/tabs/LibraryScreen.js`

10가지 운동 종류를 탐색하고 상세 정보를 확인할 수 있습니다.

**주요 기능**:
- 검색 바
- 카테고리 필터 (9개)
- 운동 카드 리스트
- 상세 정보 모달

### 📋 ProgramScreen
**파일**: `src/screens/tabs/ProgramScreen.js`

5가지 체계적인 운동 프로그램을 제공합니다.

**주요 컴포넌트**:
- 프로그램 그래디언트 카드
- 레벨 배지
- 프로그램 통계
- 상세 루틴 모달

### 📅 WorkoutScreen
**파일**: `src/screens/tabs/WorkoutScreen.js`

운동 기록을 캘린더 형식으로 관리합니다.

**주요 기능**:
- 캘린더 뷰
- 날짜별 운동 목록
- 운동 추가/수정/삭제
- 최근 운동 5개 표시

### 💬 ChatScreen
**파일**: `src/screens/tabs/ChatScreen.js`

AI 트레이너와 대화하며 운동 상담을 받을 수 있습니다.

**주요 기능**:
- 실시간 채팅 인터페이스
- 지능형 응답 시스템
- 제안 칩
- 빠른 액션 버튼
- 타이핑 인디케이터

## 🎨 색상 테마

### Burnfit 스타일 다크 테마

```javascript
// 주요 색상
primary: '#3292FF'      // Burnfit Blue
secondary: '#FF6B6B'    // Coral Red
accent: '#00D9FF'       // Cyan Accent
success: '#00E676'      // Bright Green
warning: '#FFD600'      // Yellow
danger: '#FF3D00'       // Red

// 배경
background: '#0F1419'       // Very Dark
backgroundAlt: '#1A1F26'    // Dark Gray
surface: '#242D34'          // Main Surface
surfaceLight: '#2D3741'     // Lighter Surface

// 텍스트
textPrimary: '#FFFFFF'      // White
textSecondary: '#B0B8C1'    // Light Gray
textTertiary: '#6B7280'     // Medium Gray
```

### 그래디언트

```javascript
primary: ['#3292FF', '#00D9FF']     // Blue to Cyan
secondary: ['#FF6B6B', '#FF8787']   // Coral
success: ['#00E676', '#00C853']     // Green
sunset: ['#FF6B6B', '#FFD600']      // Red to Yellow
ocean: ['#00D9FF', '#3292FF']       // Cyan to Blue
purple: ['#9C27B0', '#E040FB']      // Purple
fire: ['#FF3D00', '#FF6B6B']        // Hot Red
```

## 🔧 개발 가이드

### 상태 관리 (Context API)

**WorkoutContext** 사용 예시:

```javascript
import { useWorkout } from '../../context/WorkoutContext';

function MyComponent() {
  const {
    workouts,           // 전체 운동 데이터
    goals,              // 목표 설정
    addWorkout,         // 운동 추가
    updateWorkout,      // 운동 수정
    deleteWorkout,      // 운동 삭제
    getTodayStats,      // 오늘 통계
    getWeekStats,       // 주간 통계
  } = useWorkout();

  // ...
}
```

### 테마 사용

```javascript
import { colors, spacing, borderRadius, typography } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
});
```

### 운동 데이터 구조

```javascript
{
  id: "unique-id",
  type: "런닝",
  icon: "🏃",
  duration: 30,           // 분
  calories: 300,          // kcal
  notes: "오늘 기분 좋음",
  timestamp: Date
}
```

### 새로운 운동 추가

`src/screens/tabs/LibraryScreen.js`의 `EXERCISE_LIBRARY` 배열에 추가:

```javascript
{
  id: '11',
  name: '새로운 운동',
  icon: '🎯',
  category: '전신',
  difficulty: '중급',
  caloriesPerMin: 8,
  description: '운동 설명',
  muscles: ['관련 근육'],
  duration: '추천 시간',
}
```

## 📊 데이터 흐름

```
User Action
    ↓
Component (Screen/Modal)
    ↓
WorkoutContext (addWorkout, updateWorkout, deleteWorkout)
    ↓
AsyncStorage (로컬 저장)
    ↓
State Update (workouts, goals)
    ↓
UI Re-render
```

## 🎯 향후 계획

- [ ] 실제 AI API 통합 (OpenAI, Claude 등)
- [ ] 통계 차트 추가 (Victory Native 활용)
- [ ] 사용자 프로필 관리
- [ ] 소셜 공유 기능
- [ ] 운동 영상 가이드
- [ ] 푸시 알림
- [ ] 다국어 지원
- [ ] 백엔드 연동 (Firebase/Supabase)
- [ ] 친구 초대 및 챌린지

---

## 📦 배포 가이드

### Android 배포

Health App을 Google Play Store에 배포하려면 다음 단계를 따르세요:

#### 1. 필수 준비물
- Google Play Developer 계정 ($25 USD, 1회 결제)
- Expo 계정 (무료)
- Node.js v18 이상

#### 2. 빠른 시작
```bash
# EAS CLI 설치
npm install -g eas-cli

# 로그인
eas login

# 프로덕션 빌드
npm run build:android

# Play Store 제출 (자동화 설정 후)
npm run submit:android
```

#### 3. 상세 가이드
모든 배포 단계에 대한 자세한 내용은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

### 주요 설정 파일
- **app.json**: 앱 기본 설정 (package, versionCode)
- **eas.json**: 빌드 프로필 설정
- **PRIVACY_POLICY.md**: Play Store 필수 개인정보 처리방침

---

## 📚 문서 목록

### 개발 문서
- **[README.md](./README.md)** - 프로젝트 개요 및 시작 가이드 (현재 문서)
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - 기여 가이드 및 코딩 컨벤션
- **[CHANGELOG.md](./CHANGELOG.md)** - 버전별 변경 이력

### 배포 문서
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 📦 **Android 배포 완전 가이드**
  - EAS 설정 및 빌드 방법
  - Play Console 설정 단계
  - 자동화 설정 가이드
  - 업데이트 배포 전략
  - 문제 해결 팁

- **[PLAY_STORE_LISTING.md](./PLAY_STORE_LISTING.md)** - 🏪 **Play Store 등록 정보**
  - 앱 설명 (한국어/영어)
  - 그래픽 자산 요구사항
  - 콘텐츠 등급 정보
  - 데이터 안전성 섹션
  - 체크리스트

- **[PRIVACY_POLICY.md](./PRIVACY_POLICY.md)** - 🔒 **개인정보 처리방침**
  - 한국어/영어 버전
  - Play Store 필수 문서
  - 데이터 수집 및 사용 정책

### 문서 사용 가이드

#### 개발자용
1. 프로젝트 시작: **README.md** (현재 문서)
2. 코드 기여: **CONTRIBUTING.md**
3. 변경 이력: **CHANGELOG.md**

#### 배포 담당자용
1. 배포 준비: **DEPLOYMENT.md** (필수!)
2. 스토어 정보: **PLAY_STORE_LISTING.md**
3. 개인정보방침 호스팅: **PRIVACY_POLICY.md**

#### 배포 체크리스트
- [ ] [DEPLOYMENT.md](./DEPLOYMENT.md) 읽기
- [ ] Google Play Developer 계정 생성
- [ ] EAS CLI 설치 및 로그인
- [ ] `app.json`의 `android.package` 고유 이름으로 변경
- [ ] [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) 웹 호스팅
- [ ] [PLAY_STORE_LISTING.md](./PLAY_STORE_LISTING.md) 정보로 Play Console 작성
- [ ] 스크린샷 4-8개 준비 (1080x1920)
- [ ] 피처 그래픽 생성 (1024x500)
- [ ] 첫 빌드 및 업로드

---

## 📝 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

## 👨‍💻 개발자

프로젝트에 대한 문의사항이나 개선 제안은 언제든 환영합니다!

---

**Built with ❤️ using React Native & Expo**

*Inspired by [Burnfit.io](https://burnfit.io)*
