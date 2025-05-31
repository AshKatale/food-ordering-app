import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { ItemDetailsScreen } from '../../components/MenuComponents';

export default function ItemDetails() {
  const { item } = useLocalSearchParams();
  const router = useRouter();
  const [parsedItem, setParsedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (!item) {
        throw new Error('No item data provided');
      }
      
      const itemData = typeof item === 'string' ? JSON.parse(item) : item;
      setParsedItem(itemData);
    } catch (error) {
      console.error('Error parsing item data:', error);
      Alert.alert('Error', 'Failed to load item details');
      router.back();
    } finally {
      setLoading(false);
    }
  }, [item]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (!parsedItem) {
    return null;
  }

  return <ItemDetailsScreen route={{ params: { item: parsedItem } }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
}); 