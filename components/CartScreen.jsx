import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const CartScreen = ({ navigation }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Jollof Rice',
      price: 1200,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=150'
    },
    {
      id: 2,
      name: 'Mixed salad',
      price: 1200,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=150'
    },
    {
      id: 3,
      name: 'Spicy noodles',
      price: 1500,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=150'
    }
  ]);

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item.price, item.quantity), 0);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (itemId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from cart?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive",
          onPress: () => {
            setCartItems(cartItems.filter(item => item.id !== itemId));
          }
        }
      ]
    );
  };

  const handleAddItems = () => {
    // Navigate back to menu or home screen
    navigation.goBack();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart before checkout.");
      return;
    }
    
    // Navigate to address screen
    router.push('/checkout/address');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Order</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.cartContainer} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              
              <View style={styles.itemFooter}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.quantityDisplay}>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.itemPrice}>
                  {formatPrice(calculateItemTotal(item.price, item.quantity))}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeItem(item.id)}
            >
              <Ionicons name="close" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total price</Text>
          <Text style={styles.totalPrice}>{formatPrice(calculateTotalPrice())}</Text>
          <Text style={styles.deliveryNote}>(Delivery fee not included)</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addItemsButton}
            onPress={handleAddItems}
          >
            <Text style={styles.addItemsText}>Add Items</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  helpButton: {
    padding: 4,
  },
  cartContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  quantityText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  bottomSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  deliveryNote: {
    fontSize: 12,
    color: '#999',
  },
  buttonContainer: {
    gap: 12,
  },
  addItemsButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addItemsText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;