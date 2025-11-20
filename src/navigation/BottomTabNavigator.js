import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tabs/HomeScreen';
import LibraryScreen from '../screens/tabs/LibraryScreen';
import ProgramScreen from '../screens/tabs/ProgramScreen';
import WorkoutScreen from '../screens/tabs/WorkoutScreen';
import ChatScreen from '../screens/tabs/ChatScreen';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, color }) => {
  const isActive = color === colors.primary;
  return (
    <div style={{
      fontSize: 24,
      opacity: isActive ? 1 : 0.5,
      transform: isActive ? 'scale(1.1)' : 'scale(1)',
      transition: 'all 0.2s ease',
    }}>
      {icon}
    </div>
  );
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="🏠" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: '운동',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="💪" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Program"
        component={ProgramScreen}
        options={{
          tabBarLabel: '프로그램',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="📋" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          tabBarLabel: '기록',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="📅" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'AI 챗',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="💬" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
