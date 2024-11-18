import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pricing"
        options={{
          title: 'Gói Pro',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'card' : 'card-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Thông báo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'man' : 'man-outline'} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Hồ sơ',
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="template"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="change_password"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="decks"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="learning"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="notification_detail"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
