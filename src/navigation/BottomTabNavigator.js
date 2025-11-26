import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tabs/HomeScreen';
import LibraryScreen from '../screens/tabs/LibraryScreen';
import ProgramScreen from '../screens/tabs/ProgramScreen';
import WorkoutScreen from '../screens/tabs/WorkoutScreen';
import ChatScreen from '../screens/tabs/ChatScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import { colors } from '../constants/theme';
import { HomeIcon, DumbbellIcon, ProgramIcon, CalendarIcon, ChatIcon, UserIcon } from '../components/Icons';

const Tab = createBottomTabNavigator();

const TabIcon = ({ IconComponent, color }) => {
  const isActive = color === colors.primary;
  return (
    <View style={{
      opacity: isActive ? 1 : 0.6,
      transform: [{ scale: isActive ? 1.1 : 1 }],
    }}>
      <IconComponent size={24} color={color} />
    </View>
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
            <TabIcon IconComponent={HomeIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: '운동',
          tabBarIcon: ({ color }) => (
            <TabIcon IconComponent={DumbbellIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Program"
        component={ProgramScreen}
        options={{
          tabBarLabel: '프로그램',
          tabBarIcon: ({ color }) => (
            <TabIcon IconComponent={ProgramIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          tabBarLabel: '기록',
          tabBarIcon: ({ color }) => (
            <TabIcon IconComponent={CalendarIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'AI 챗',
          tabBarIcon: ({ color }) => (
            <TabIcon IconComponent={ChatIcon} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({ color }) => (
            <TabIcon IconComponent={UserIcon} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
