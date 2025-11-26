# Supabase 연동 가이드

이 문서는 Health App을 Supabase와 연동하는 방법을 설명합니다.

## 1. Supabase 프로젝트 설정

### 1.1 Supabase 대시보드에서 프로젝트 생성
1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호, 지역 설정
4. 프로젝트 생성 완료 대기 (약 2분 소요)

### 1.2 API 키 확인
1. Supabase 대시보드에서 프로젝트 선택
2. Settings > API 메뉴로 이동
3. 다음 정보 복사:
   - `Project URL` (SUPABASE_URL)
   - `anon public` key (SUPABASE_ANON_KEY)

## 2. 환경 변수 설정

### 2.1 .env 파일 업데이트
프로젝트 루트의 `.env` 파일을 열어 다음 정보를 입력하세요:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**중요:** `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

### 2.2 환경 변수 적용 (선택사항 - Expo 배포용)
`app.json`에 환경 변수를 추가하려면:

```json
{
  "expo": {
    "extra": {
      "supabaseUrl": "your_supabase_url",
      "supabaseAnonKey": "your_supabase_anon_key"
    }
  }
}
```

그 후 `src/lib/supabase.js`를 업데이트:

```javascript
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.SUPABASE_ANON_KEY;
```

## 3. 데이터베이스 스키마 생성

### 3.1 SQL 스크립트 실행
1. Supabase 대시보드에서 프로젝트 선택
2. SQL Editor 메뉴로 이동
3. `supabase/schema.sql` 파일의 내용을 복사하여 붙여넣기
4. "Run" 버튼 클릭하여 실행

### 3.2 생성되는 테이블 확인
- `profiles`: 사용자 프로필 정보
- `goals`: 사용자별 운동 목표
- `workouts`: 운동 기록
- `programs`: 운동 프로그램
- `program_exercises`: 프로그램별 운동 항목

### 3.3 RLS (Row Level Security) 정책 확인
모든 테이블에 RLS가 활성화되어 있으며, 사용자는 자신의 데이터만 접근할 수 있습니다.

## 4. 인증 설정

### 4.1 이메일 인증 활성화
1. Authentication > Settings 메뉴로 이동
2. "Enable Email Signup" 활성화
3. "Email Confirmations" 설정 확인

### 4.2 이메일 템플릿 커스터마이징 (선택사항)
Authentication > Email Templates에서 다음 템플릿을 커스터마이징할 수 있습니다:
- 회원가입 확인 이메일
- 비밀번호 재설정 이메일
- 이메일 변경 확인 이메일

## 5. 앱에서 사용하기

### 5.1 회원가입
```javascript
import { useAuth } from './src/context/AuthContext';

const { signUp } = useAuth();

const handleSignUp = async () => {
  const { data, error } = await signUp(email, password, fullName);
  if (error) {
    console.error('회원가입 실패:', error.message);
  } else {
    console.log('회원가입 성공:', data);
  }
};
```

### 5.2 로그인
```javascript
const { signIn } = useAuth();

const handleSignIn = async () => {
  const { data, error } = await signIn(email, password);
  if (error) {
    console.error('로그인 실패:', error.message);
  } else {
    console.log('로그인 성공:', data);
  }
};
```

### 5.3 로그아웃
```javascript
const { signOut } = useAuth();

const handleSignOut = async () => {
  const { error } = await signOut();
  if (error) {
    console.error('로그아웃 실패:', error.message);
  } else {
    console.log('로그아웃 성공');
  }
};
```

### 5.4 운동 데이터 자동 동기화
로그인 상태에서는 운동 데이터가 자동으로 Supabase와 동기화됩니다:

```javascript
import { useWorkout } from './src/context/WorkoutContext';

const { addWorkout, isSyncing } = useWorkout();

const handleAddWorkout = async () => {
  await addWorkout(date, workout);
  // 로그인된 경우 자동으로 Supabase에 저장됨
};
```

## 6. 데이터 동기화 동작 방식

### 6.1 비로그인 상태
- 모든 데이터는 로컬 AsyncStorage에만 저장됩니다
- 앱을 재설치하면 데이터가 사라집니다

### 6.2 로그인 상태
- 새로운 데이터는 AsyncStorage와 Supabase에 동시 저장됩니다
- 앱 시작 시 Supabase에서 데이터를 로드합니다
- 네트워크 오류 시 자동으로 AsyncStorage로 폴백됩니다

### 6.3 오프라인 지원
- 오프라인 상태에서도 AsyncStorage에 데이터 저장
- 온라인 복귀 시 수동 동기화 필요 (향후 구현 예정)

## 7. 보안 고려사항

### 7.1 API 키 보안
- `anon` 키는 클라이언트에서 사용해도 안전합니다
- RLS 정책으로 데이터 접근이 제어됩니다
- `service_role` 키는 절대 클라이언트에서 사용하지 마세요

### 7.2 RLS 정책
- 모든 사용자는 자신의 데이터만 읽고 쓸 수 있습니다
- 공개 프로그램은 모든 사용자가 읽을 수 있습니다
- 정책은 `supabase/schema.sql`에 정의되어 있습니다

## 8. 문제 해결

### 8.1 연결 오류
```
Error: Invalid Supabase URL or Key
```
**해결방법:** `.env` 파일의 URL과 키가 정확한지 확인하세요.

### 8.2 RLS 정책 오류
```
Error: new row violates row-level security policy
```
**해결방법:**
1. SQL Editor에서 RLS 정책이 올바르게 설정되었는지 확인
2. 사용자가 로그인되어 있는지 확인

### 8.3 데이터 동기화 실패
- 네트워크 연결 확인
- Supabase 프로젝트 상태 확인
- 콘솔 로그에서 자세한 오류 메시지 확인

## 9. 다음 단계

### 9.1 소셜 로그인 추가
- Google, Apple, Facebook 로그인 설정
- Authentication > Providers에서 활성화

### 9.2 실시간 동기화
- Supabase Realtime을 사용한 실시간 데이터 동기화
- 여러 기기 간 자동 동기화

### 9.3 Storage 연동
- 프로필 사진 업로드
- 운동 사진/동영상 저장

## 10. 유용한 링크

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase React Native 가이드](https://supabase.com/docs/guides/getting-started/tutorials/with-react-native)
- [RLS 정책 가이드](https://supabase.com/docs/guides/auth/row-level-security)
