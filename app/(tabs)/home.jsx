import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HomeScreen } from '../../components/HomeScreen'

export default function Home() {
  return (
    <View style={styles.container}>
        <HomeScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
