import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// Colors from the logo
const COLORS = {
  primary: '#52b9a9',   // Teal (previously bus path color)
  secondary: '#ff9248', // Orange (unchanged)
  accent: '#c3e6df',    // Light Teal
  white: '#ffffff',
  dark: '#333333'
};

interface NotebookIconProps {
  onPress: () => void;
  count?: number; // Optional entry count to display
}

const NotebookIcon = ({ onPress, count = 0 }: NotebookIconProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Text style={styles.icon}>📔</Text>
        </View>
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
          </View>
        )}
      </View>
      <Text style={styles.label}>Notebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  iconContainer: {
    position: 'relative',
  },
  iconBackground: {
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: '500',
  }
});

export default NotebookIcon;