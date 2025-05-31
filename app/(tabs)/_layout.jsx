import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function _layout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen 
        options={{
          tabBarLabel: "Our Menu",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name="restaurant-menu" 
              size={focused ? 26 : 24} 
              color={color} 
            />
          )
        }}
        name='menu'
      />
      <Tabs.Screen 
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={focused ? 26 : 24} 
              color={color} 
            />
          )
        }} 
        name='home'
      />
      <Tabs.Screen 
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 
              name="cart-shopping" 
              size={focused ? 26 : 24} 
              color={color} 
            />
          ),
 // Shows cart count badge
        }} 
        name='cart'
      />
    </Tabs>
  );
}