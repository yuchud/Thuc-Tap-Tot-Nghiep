import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RegisterLayout() {
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
        name="reset_password"
        options={{
          title: 'Quên mật khẩu',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'key' : 'key-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
