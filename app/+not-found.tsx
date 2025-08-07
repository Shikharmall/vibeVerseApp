import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';

interface NoFoundScreenProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  onRefresh?: () => void;
  onAddNew?: () => void;
  onResetFilters?: () => void;
  type?: 'search' | 'filter' | 'empty';
}

export default function NoFoundScreen({
  searchQuery = '',
  onClearSearch,
  onRefresh,
  onAddNew,
  onResetFilters,
  type = 'search'
}: NoFoundScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Bounce animation for the icon
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    bounceAnimation.start();

    return () => bounceAnimation.stop();
  }, [fadeAnim, scaleAnim, bounceAnim]);

  const getContent = () => {
    switch (type) {
      case 'search':
        return {
          // icon: Search,
          title: 'No Results Found',
          subtitle: searchQuery
            ? `No profiles match "${searchQuery}"`
            : 'Try searching for something else',
          description: 'We couldn\'t find any profiles matching your search criteria. Try adjusting your search terms or browse all profiles.',
        };
      case 'filter':
        return {
          // icon: Filter,
          title: 'No Matches',
          subtitle: 'No profiles match your filters',
          description: 'Try adjusting your filters or reset them to see all available profiles.',
        };
      case 'empty':
      default:
        return {
          // icon: Users,
          title: 'No Profiles Yet',
          subtitle: 'Be the first to create a profile',
          description: 'There are no profiles to display right now. Start by creating your own profile or invite others to join.',
        };
    }
  };

  const content = getContent();
  // const IconComponent = content.icon;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ translateY: bounceAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[Colors.from, Colors.to]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            {/* <IconComponent size={48} color="white" /> */}
          </LinearGradient>
        </Animated.View>

        <View style={styles.illustration}>
          <Image
            source={{ uri: '/placeholder.svg?height=120&width=120&text=🔍' }}
            style={styles.illustrationImage}
          />
        </View>

        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>
        <Text style={styles.description}>{content.description}</Text>

        {searchQuery && (
          <View style={styles.searchInfo}>
            {/* <AlertCircle size={16} color="#ed8936" /> */}
            <MaterialIcons name="add-alert" size={16} color="#ed8936" />
            <Text style={styles.searchText}>
              Searched for: <Text style={styles.searchQuery}>"{searchQuery}"</Text>
            </Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          {type === 'search' && onClearSearch && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onClearSearch}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#48bb78', '#38a169']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                {/* <Search size={20} color="white" style={styles.buttonIcon} /> */}
                <MaterialIcons name="search" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Clear Search</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {type === 'filter' && onResetFilters && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onResetFilters}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ed8936', '#dd6b20']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                {/* <Filter size={20} color="white" style={styles.buttonIcon} /> */}
                <MaterialIcons name="filter" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Reset Filters</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {onRefresh && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onRefresh}
              activeOpacity={0.8}
            >
              {/* <RefreshCw size={20} color="" style={styles.buttonIcon} /> */}
              <MaterialIcons name="refresh" size={20} color="#667eea" />
              <Text style={styles.secondaryButtonText}>Refresh</Text>
            </TouchableOpacity>
          )}

          {onAddNew && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onAddNew}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#9f7aea', '#805ad5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                {/* <Plus size={20} color="white" style={styles.buttonIcon} /> */}
                <MaterialIcons name="1k-plus" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Add New Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.suggestions}>
          <Text style={styles.suggestionsTitle}>Suggestions:</Text>
          <View style={styles.suggestionsList}>
            <View style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>• Try different keywords</Text>
            </View>
            <View style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>• Check your spelling</Text>
            </View>
            <View style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>• Use more general terms</Text>
            </View>
            <View style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>• Browse all profiles</Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  iconContainer: {
    marginBottom: 20,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    marginBottom: 24,
  },
  illustrationImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  searchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef5e7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  searchText: {
    fontSize: 14,
    color: '#9c4221',
    marginLeft: 8,
  },
  searchQuery: {
    fontWeight: '600',
    color: '#c05621',
  },
  actionButtons: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  suggestions: {
    width: '100%',
    backgroundColor: '#f7fafc',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 12,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
});
