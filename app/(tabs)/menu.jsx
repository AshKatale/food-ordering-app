import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuListScreen } from '../../components/MenuComponents';

export default function Menu() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
        <MenuListScreen navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
