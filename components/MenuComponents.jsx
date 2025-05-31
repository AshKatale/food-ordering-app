import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../configs/FirebaseConfig'; // Adjust path as needed
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

// Menu List Component
export const MenuListScreen = ({ initialCategory }) => {
  const router = useRouter();
  const { cartCount, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Meals');
  const [favorites, setFavorites] = useState(new Set());
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['Meals', 'Sides', 'Snacks', 'Drinks']);

  const fetchMenuData = async () => {
    try {
      console.log('Starting to fetch menu data...');
      setLoading(true);
      
      // Fetch all menu items
      const menuItemsRef = collection(db, 'menu-items');
      console.log('Fetching menu items from collection...');
      const menuSnapshot = await getDocs(menuItemsRef);
      
      console.log('Menu items fetched:', menuSnapshot.size, 'items found');
      
      // Group items by category
      const groupedData = {};
      
      // Initialize default categories if none exist
      const defaultCategories = ['Meals', 'Sides', 'Snacks', 'Drinks'];
      
      menuSnapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        // console.log('Processing item:', item);
        
        // Assign a default category if none exists
        let category = item.category || 'Meals';
        
        // Ensure the category exists in groupedData
        if (!groupedData[category]) {
          groupedData[category] = [];
        }
        groupedData[category].push(item);
      });

      // console.log('Grouped data:', groupedData);

      // Get unique categories from the data
      const availableCategories = Object.keys(groupedData).sort();
      // console.log('Available categories:', availableCategories);

      // Use available categories from data, fallback to defaults if none found
      const categoryNames = availableCategories.length > 0 ? availableCategories : defaultCategories;

      // console.log('Final category names:', categoryNames);
      // console.log('Final grouped data:', groupedData);

      setMenuData(groupedData);
      setCategories(categoryNames);
      
      // Set first category as selected if available
      if (categoryNames.length > 0) {
        setSelectedCategory(categoryNames[0]);
      }
      
    } catch (error) {
      console.error('Error fetching menu data:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      Alert.alert('Error', 'Failed to load menu items. Please try again.');
    } finally {
      setLoading(false);
      console.log('Fetch operation completed. Loading state:', false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  // Update selected category when initialCategory changes
  useEffect(() => {
    if (initialCategory && categories.includes(initialCategory)) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, categories]);

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
    return `₹${price.toLocaleString()}`;
  };

  const navigateToDetails = (item) => {
    try {
      // Ensure we're passing a clean item object without circular references
      const cleanItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        calories: item.calories,
        rating: item.rating,
        reviews: item.reviews
      };
      
      router.push({
        pathname: '/item/[id]',
        params: { item: JSON.stringify(cleanItem) }
      });
    } catch (error) {
      console.error('Error navigating to details:', error);
      Alert.alert('Error', 'Could not open item details');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Our Menu</Text>
        </View>
        <CartIcon />
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
          {menuData[selectedCategory] && menuData[selectedCategory].length > 0 ? (
            menuData[selectedCategory].map((item) => (
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
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items available in this category</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Item Details Component
export const ItemDetailsScreen = ({ route }) => {
  const router = useRouter();
  const { addToCart: addItemToCart } = useCart();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recommendedSides, setRecommendedSides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItemData = () => {
      try {
        if (route?.params?.item) {
          const itemData = typeof route.params.item === 'string' 
            ? JSON.parse(route.params.item)
            : route.params.item;
            
          // console.log('Loading item data:', itemData);
          setItem(itemData);
          fetchRecommendedSides();
        } else {
          console.error('No item data provided');
          Alert.alert('Error', 'Item data not found');
          router.back();
        }
      } catch (error) {
        console.error('Error loading item data:', error);
        Alert.alert('Error', 'Failed to load item details');
        router.back();
      }
    };

    loadItemData();
  }, [route?.params?.item]);

  const fetchRecommendedSides = async () => {
    try {
      const sidesRef = collection(db, 'menuItems');
      const sidesQuery = query(sidesRef, where('category', '==', 'Sides'));
      const sidesSnapshot = await getDocs(sidesQuery);
      
      const sides = [];
      sidesSnapshot.forEach((doc) => {
        sides.push({ id: doc.id, ...doc.data() });
      });
      
      // Take first 3 sides as recommended
      setRecommendedSides(sides.slice(0, 3));
    } catch (error) {
      console.error('Error fetching recommended sides:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleAddToCart = () => {
    addItemToCart(item, quantity);
    Alert.alert('Success', `${item.name} added to cart!`);
    router.back();
  };

  if (loading || !item) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading item details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <CartIcon />
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
            <Text style={styles.detailTitle}>{item.name}</Text>
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

          {item.rating && (
            <View style={styles.ratingRow}>
              <View style={styles.starsContainer}>
                {renderStars(item.rating)}
              </View>
              <Text style={styles.reviewText}>({item.reviews || 0} ratings)</Text>
            </View>
          )}

          <Text style={styles.detailPrice}>{formatPrice(item.price)}</Text>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {item.description}
              {item.calories && (
                <Text style={styles.caloriesText}> (Each serving contains {item.calories} calories)</Text>
              )}
            </Text>
          </View>

          {/* Recommended Sides */}
          {recommendedSides.length > 0 && (
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
          )}

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
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Update the header cart icon to use the cart context
const CartIcon = () => {
  const { cartCount } = useCart();
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/cart')}>
      <Ionicons name="cart-outline" size={24} color="#000" />
      {cartCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Update the header to use the CartIcon component
const Header = ({ title, showBack = true }) => {
  const router = useRouter();
  
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <CartIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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