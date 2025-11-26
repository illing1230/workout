-- Supabase 데이터베이스 스키마
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1. 사용자 프로필 테이블 (auth.users를 확장)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. 사용자 목표 설정 테이블
CREATE TABLE IF NOT EXISTS public.goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  daily_workouts INTEGER DEFAULT 1,
  daily_minutes INTEGER DEFAULT 30,
  daily_calories INTEGER DEFAULT 300,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id)
);

-- 3. 운동 기록 테이블
CREATE TABLE IF NOT EXISTS public.workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workout_date DATE NOT NULL,
  workout_type TEXT NOT NULL,
  duration INTEGER NOT NULL, -- 분 단위
  calories INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. 운동 프로그램 테이블
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. 프로그램 운동 항목 테이블
CREATE TABLE IF NOT EXISTS public.program_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE NOT NULL,
  exercise_name TEXT NOT NULL,
  sets INTEGER,
  reps INTEGER,
  duration INTEGER, -- 분 단위
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON public.workouts(user_id);
CREATE INDEX IF NOT EXISTS idx_workouts_date ON public.workouts(workout_date);
CREATE INDEX IF NOT EXISTS idx_workouts_user_date ON public.workouts(user_id, workout_date);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON public.goals(user_id);
CREATE INDEX IF NOT EXISTS idx_programs_user_id ON public.programs(user_id);
CREATE INDEX IF NOT EXISTS idx_program_exercises_program_id ON public.program_exercises(program_id);

-- Row Level Security (RLS) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_exercises ENABLE ROW LEVEL SECURITY;

-- RLS 정책: profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS 정책: goals
CREATE POLICY "Users can view their own goals"
  ON public.goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON public.goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON public.goals FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS 정책: workouts
CREATE POLICY "Users can view their own workouts"
  ON public.workouts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workouts"
  ON public.workouts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workouts"
  ON public.workouts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workouts"
  ON public.workouts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS 정책: programs
CREATE POLICY "Users can view their own programs and public programs"
  ON public.programs FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert their own programs"
  ON public.programs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own programs"
  ON public.programs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own programs"
  ON public.programs FOR DELETE
  USING (auth.uid() = user_id);

-- RLS 정책: program_exercises
CREATE POLICY "Users can view exercises from their programs or public programs"
  ON public.program_exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.programs
      WHERE programs.id = program_exercises.program_id
      AND (programs.user_id = auth.uid() OR programs.is_public = true)
    )
  );

CREATE POLICY "Users can insert exercises to their programs"
  ON public.program_exercises FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.programs
      WHERE programs.id = program_exercises.program_id
      AND programs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update exercises in their programs"
  ON public.program_exercises FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.programs
      WHERE programs.id = program_exercises.program_id
      AND programs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete exercises from their programs"
  ON public.program_exercises FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.programs
      WHERE programs.id = program_exercises.program_id
      AND programs.user_id = auth.uid()
    )
  );

-- 트리거: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_goals
  BEFORE UPDATE ON public.goals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_workouts
  BEFORE UPDATE ON public.workouts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_programs
  BEFORE UPDATE ON public.programs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 함수: 신규 사용자 프로필 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');

  INSERT INTO public.goals (user_id, daily_workouts, daily_minutes, daily_calories)
  VALUES (NEW.id, 1, 30, 300);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거: 신규 사용자 생성 시 프로필 및 목표 자동 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
