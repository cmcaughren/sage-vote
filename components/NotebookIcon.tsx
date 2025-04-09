// components/ui/NotebookIcon.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from '../styles/components/NotebookIcon.styles';

interface NotebookIconProps {
  onPress: () => void;
  count?: number; // Optional entry count to display
}

const NotebookIcon: React.FC<NotebookIconProps> = ({ onPress, count = 0 }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Text style={styles.icon}>📓</Text>
        </View>
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotebookIcon;