import { Stack } from "expo-router";
import { GameProvider } from '../context/GameContext';
import React from 'react';

const Layout = () => {
  return (
      <GameProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
      </GameProvider>
  );
};

export default Layout;