import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
const { width } = Dimensions.get('window');

// Sample data
const menuData = {
  Meals: [
    {
      id: 1,
      name: 'Spicy Noodles',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
      description: 'Rich and incredibly tasty rice dish, made with reduced tomatoes, bell peppers, chilli peppers, onions, herbs and seasoning.',
      rating: 4.5,
      reviews: 89,
      calories: 248
    },
    {
      id: 2,
      name: 'Shrimp Pasta',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300',
      description: 'Fresh shrimp pasta with creamy sauce and herbs',
      rating: 4.7,
      reviews: 156,
      calories: 380
    },
    {
      id: 3,
      name: 'Vegetable Curry',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
      description: 'Aromatic vegetable curry with rice',
      rating: 4.3,
      reviews: 67,
      calories: 350
    },
    {
      id: 4,
      name: 'Mixed Salad',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300',
      description: 'Fresh mixed salad with seasonal vegetables',
      rating: 4.2,
      reviews: 45,
      calories: 180
    },
    {
      id: 5,
      name: 'Chicken Pasta Salad',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1565299585323-38174c13a9db?w=300',
      description: 'Grilled chicken with pasta and fresh vegetables',
      rating: 4.6,
      reviews: 98,
      calories: 450
    },
    {
      id: 6,
      name: 'Beef Salad',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=300',
      description: 'Tender beef strips with mixed greens',
      rating: 4.4,
      reviews: 73,
      calories: 320
    },
    {
        id: 7,
        name: 'Beef Salad',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=300',
        description: 'Tender beef strips with mixed greens',
        rating: 4.4,
        reviews: 73,
        calories: 320
      },
      {
        id: 8,
        name: 'Beef Salad',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=300',
        description: 'Tender beef strips with mixed greens',
        rating: 4.4,
        reviews: 73,
        calories: 320
      }
  ],
  Sides: [
    {
      id: 7,
      name: 'Fried Plantain',
      price: 300,
      image: 'https://images.unsplash.com/photo-1586985289906-406988974504?w=300'
    },
    {
      id: 8,
      name: 'Coleslaw',
      price: 800,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300'
    },
    {
      id: 9,
      name: 'Fried Chicken',
      price: 900,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
    }
  ],
  Snacks: [
    {
      id: 10,
      name: 'Spring Rolls',
      price: 600,
      image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=300'
    }
  ]
};

// Menu List Component
export const MenuListScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Meals');
  const [favorites, setFavorites] = useState(new Set());
  const [cartCount, setCartCount] = useState(2);

  const categories = ['Meals', 'Sides', 'Snacks'];

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const navigateToDetails = (item) => {
    router.push({
      pathname: '/item/[id]',
      params: { item: JSON.stringify(item) }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Our Menu</Text>
        </View>
        <View style={styles.cartIcon}>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="#000" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.tab,
                selectedCategory === category && styles.activeTab,
                index === 0 && styles.firstTab
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.tabText,
                selectedCategory === category && styles.activeTabText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items Grid */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuData[selectedCategory].map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigateToDetails(item)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Ionicons
                    name={favorites.has(item.id) ? "heart" : "heart-outline"}
                    size={20}
                    color={favorites.has(item.id) ? "#FF6B6B" : "#999"}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#999" />
          <Text style={styles.navText}>Live Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#FF6B35" />
          <Text style={[styles.navText, { color: '#FF6B35' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="restaurant-outline" size={24} color="#999" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#999" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

// Item Details Component
export const ItemDetailsScreen = ({ route }) => {
  const router = useRouter();
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  const recommendedSides = [
    { id: 7, name: 'Fried plantain', price: 300, image: 'https://images.unsplash.com/photo-1586985289906-406988974504?w=150' },
    { id: 8, name: 'Coleslaw', price: 800, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=150' },
    { id: 9, name: 'Fried Chicken', price: 900, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150' }
  ];

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < Math.floor(rating) ? "star" : "star-outline"}
        size={12}
        color="#FFD700"
        style={{ marginRight: 2 }}
      />
    ));
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const addToCart = () => {
    // Add to cart logic here
    setCartCount(prev => prev + quantity);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.cartIcon}>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="#000" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
        {/* Item Image */}
        <View style={styles.detailImageContainer}>
          <Image source={{ uri: item.image }} style={styles.detailImage} />
          <TouchableOpacity
            style={styles.detailFavoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#FF6B6B" : "#999"}
            />
          </TouchableOpacity>
        </View>

        {/* Item Info */}
        <View style={styles.detailInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.detailTitle}>Jollof Rice</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.starsContainer}>
              {renderStars(item.rating)}
            </View>
            <Text style={styles.reviewText}>({item.reviews} ratings)</Text>
          </View>

          <Text style={styles.detailPrice}>{formatPrice(item.price)}</Text>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {item.description}
              <Text style={styles.caloriesText}> (Each serving contains {item.calories} calories)</Text>
            </Text>
          </View>

          {/* Recommended Sides */}
          <View style={styles.recommendedSection}>
            <Text style={styles.sectionTitle}>Recommended sides</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sidesContainer}>
              {recommendedSides.map((side) => (
                <View key={side.id} style={styles.sideItem}>
                  <Image source={{ uri: side.image }} style={styles.sideImage} />
                  <Text style={styles.sideName}>{side.name}</Text>
                  <Text style={styles.sidePrice}>{formatPrice(side.price)}</Text>
                  <TouchableOpacity style={styles.sideAddButton}>
                    <Ionicons name="add" size={16} color="#FF6B35" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Ratings & Reviews */}
          <TouchableOpacity style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
            <Text style={styles.seeAllText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.totalText}>Total: {formatPrice(item.price * quantity)}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Ionicons name="cart" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000',
  },
  cartIcon: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabScroll: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF6B35',
  },
  firstTab: {
    marginLeft: 0,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  // Details Screen Styles
  detailsContainer: {
    flex: 1,
  },
  detailImageContainer: {
    position: 'relative',
    height: 250,
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  detailFavoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailInfo: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
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
  quantityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewText: {
    fontSize: 12,
    color: '#999',
  },
  detailPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  caloriesText: {
    color: '#FF6B35',
  },
  recommendedSection: {
    marginBottom: 24,
  },
  sidesContainer: {
    marginTop: 12,
  },
  sideItem: {
    width: 100,
    marginRight: 16,
    alignItems: 'center',
  },
  sideImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  sideName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  sidePrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sideAddButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 15,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  seeAllText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});