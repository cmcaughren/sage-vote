// app/notebook.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  SectionList
} from 'react-native';
import { useRouter } from 'expo-router';
import { getNotebookEntries, clearNotebook } from '../utilities/asyncStorage';
import { useGameContext } from '../context/GameContext';
import { styles } from '../styles/screens/Notebook.styles';
import { COLORS } from '../styles/theme/colors';

// Interface for notebook entries
interface NotebookEntry {
  id: string;
  url: string;
  description: string;
  timestamp: string;
  category: string; // Added category
}

// Interface for section data
interface SectionData {
  title: string;
  data: NotebookEntry[];
  expanded: boolean;
}

export default function NotebookScreen() {
  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { devMode } = useGameContext();

  useEffect(() => {
    loadEntries();
  }, []);

  // Load entries from AsyncStorage and organize into sections
  const loadEntries = async () => {
    setLoading(true);
    const notebookEntries = await getNotebookEntries();

    // Sort by most recent first
    const sortedEntries = notebookEntries.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setEntries(sortedEntries);

    // Group entries by category
    const entriesByCategory: { [key: string]: NotebookEntry[] } = {};

    sortedEntries.forEach(entry => {
      const category = entry.category || 'Uncategorized';
      if (!entriesByCategory[category]) {
        entriesByCategory[category] = [];
      }
      entriesByCategory[category].push(entry);
    });

    // Create sections for each category
    const sectionData: SectionData[] = Object.keys(entriesByCategory)
      .sort()
      .map(category => ({
        title: category,
        data: entriesByCategory[category],
        expanded: true // Start expanded
      }));

    setSections(sectionData);
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

  // Toggle section expansion
  const toggleSection = (sectionTitle: string) => {
    setSections(currentSections =>
      currentSections.map(section =>
        section.title === sectionTitle
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
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
            setSections([]);
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
        <Text style={styles.linkText}>Visit to learn more</Text>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render a section header
  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={() => toggleSection(section.title)}
    >
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionToggle}>
        {section.expanded ? '▼' : '►'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notebook</Text>
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
        <SectionList
          sections={sections}
          renderItem={({ item, section }) =>
            section.expanded ? renderItem({ item }) : null
          }
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
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