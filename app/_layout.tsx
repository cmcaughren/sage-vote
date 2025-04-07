// app/_layout.tsx
import { Stack } from "expo-router";
import { GameProvider } from '../context/GameContext';
import React from 'react';

export default function Layout() {
  console.log('Layout component rendering');
  return (
    <GameProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="registertovote" options={{ headerShown: false }} />
        <Stack.Screen name="crossroads" options={{ headerShown: false }} />
        <Stack.Screen name="gameboard" options={{ headerShown: false }} />
        <Stack.Screen name="notebook" options={{ headerShown: false }} />
        <Stack.Screen name="create-card" options={{ headerShown: false }} />
      </Stack>
    </GameProvider>
  );
}