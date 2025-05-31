import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuListScreen } from '../../components/MenuComponents';

export default function Menu() {
  const { category } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <MenuListScreen initialCategory={category} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
