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
        <Stack.Screen name="registertovote" options={{ title: "Register to Vote" }} />
        <Stack.Screen name="crossroads" options={{ title: "Crossroads" }} />
        <Stack.Screen name="gameboard" options={{ title: "Game Board" }} />
        <Stack.Screen name="notebook" options={{ title: "Notebook" }} />
        <Stack.Screen name="create-card" options={{ title: "Create Card" }} />
      </Stack>
    </GameProvider>
  );
}