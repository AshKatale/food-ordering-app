import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddressScreen from '../../components/AddressScreen';

export default function Address() {
  return (
    <View style={styles.container}>
      <AddressScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
}); 