import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

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
        <Text style={styles.icon}>📔</Text>
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
  icon: {
    fontSize: 30,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FF5252',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  }
});

export default NotebookIcon;