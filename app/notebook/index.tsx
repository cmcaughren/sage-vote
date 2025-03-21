import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Linking, 
  SafeAreaView,
  ActivityIndicator,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { getNotebookEntries, clearNotebook } from '../../utilities/asyncStorage';
import { useGameContext } from '../../context/GameContext'; // Fixed the import path

// Colors from the logo
const COLORS = {
  primary: '#52b9a9',   // Teal (previously bus path color)
  secondary: '#ff9248', // Orange (unchanged)
  tertiary: '#c3e6df',  // Light Teal
  background: '#f5f7fa', // Light background
  white: '#ffffff',
  dark: '#333333',
  lightGray: '#e0e0e0',
};

// Interface for notebook entries
interface NotebookEntry {
  id: string;
  url: string;
  description: string;
  timestamp: string;
}

export default function NotebookScreen() {
  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { devMode } = useGameContext();

  useEffect(() => {
    loadEntries();
  }, []);

  // Load entries from AsyncStorage
  const loadEntries = async () => {
    setLoading(true);
    const notebookEntries = await getNotebookEntries();
    
    // Sort by most recent first
    const sortedEntries = notebookEntries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    setEntries(sortedEntries);
    setLoading(false);
  };

  // Handle opening a link
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(err => {
      Alert.alert('Error', `Could not open link: ${err.message}`);
    });
  };

  // Format the timestamp
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle clearing the notebook (dev feature)
  const handleClearNotebook = () => {
    Alert.alert(
      'Clear Notebook',
      'Are you sure you want to clear all notebook entries?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: async () => {
            await clearNotebook();
            setEntries([]);
          }
        }
      ]
    );
  };

  // Render each notebook entry
  const renderItem = ({ item }: { item: NotebookEntry }) => (
    <TouchableOpacity 
      style={styles.entryCard}
      onPress={() => handleOpenLink(item.url)}
      activeOpacity={0.7}
    >
      <View style={styles.entryHeader}>
        <Text style={styles.entryUrl} numberOfLines={1} ellipsizeMode="middle">
          {item.url}
        </Text>
        <Text style={styles.entryDate}>{formatDate(item.timestamp)}</Text>
      </View>
      <Text style={styles.entryDescription} numberOfLines={3}>
        {item.description}
      </Text>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Learn more about Canadian politics</Text>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Political Notebook</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your notebook...</Text>
        </View>
      ) : entries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📔</Text>
          <Text style={styles.emptyText}>Your notebook is empty</Text>
          <Text style={styles.emptySubtext}>
            Draw cards and tap "Learn More" to add educational links to your notebook
          </Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {devMode && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearNotebook}
        >
          <Text style={styles.clearButtonText}>Clear Notebook</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  entryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryUrl: {
    fontSize: 14,
    color: COLORS.primary,
    flex: 1,
    marginRight: 8,
  },
  entryDate: {
    fontSize: 12,
    color: COLORS.dark + '80', // Adding transparency
  },
  entryDescription: {
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 12,
    lineHeight: 22,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 10,
    marginTop: 5,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  arrowContainer: {
    backgroundColor: COLORS.tertiary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.dark + '80',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.dark,
  },
  emptySubtext: {
    fontSize: 16,
    color: COLORS.dark + '80',
    textAlign: 'center',
    lineHeight: 22,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});