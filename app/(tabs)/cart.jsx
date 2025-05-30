import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CartScreen from '../../components/CartScreen';

export default function Cart() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <CartScreen navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    }
});
