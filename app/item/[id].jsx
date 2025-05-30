import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ItemDetailsScreen } from '../../components/MenuComponents';

export default function ItemDetails() {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);
  
  return <ItemDetailsScreen route={{ params: { item: parsedItem } }} />;
} 