import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // display: 'none'
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: 'Đăng nhập',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'log-in' : 'log-in-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
