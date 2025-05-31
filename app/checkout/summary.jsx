import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderSummaryScreen from '../../components/OrderSummaryScreen';

export default function Summary() {
  return (
    <View style={styles.container}>
      <OrderSummaryScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  }
}); 