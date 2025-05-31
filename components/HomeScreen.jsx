import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const router = useRouter();

  const featuredItems = [
    {
      id: 1,
      name: 'Spicy Noodles',
      price: 150,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
      rating: 4.5,
      reviews: 89
    },
    {
      id: 2,
      name: 'Paneer Butter Masalq',
      price: 180,
      image: 'https://images.pexels.com/photos/30858402/pexels-photo-30858402/free-photo-of-delicious-paneer-tikka-masala-dish-close-up.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 3,
      name: 'Vegetable Curry',
      price: 120,
      image: 'https://img.freepik.com/premium-photo/mix-vegetable-curry-indian-main-course-recipe-contains-carrots-cauliflower-green-peas-beans-baby-corn-capsicum-paneer-cottage-cheese-with-traditional-masala-curry_466689-35413.jpg',
      rating: 4.3,
      reviews: 67
    }
  ];

  const categories = [
    { id: 1, name: 'Meals', icon: 'restaurant' },
    { id: 2, name: 'Sides', icon: 'fast-food' },
    { id: 3, name: 'Snacks', icon: 'pizza' },
    { id: 4, name: 'Drinks', icon: 'cafe' }
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

  const navigateToCategory = (category) => {
    router.push({
      pathname: '/menu',
      params: { category }
    });
  };

  const renderCategoryCard = (category, image, count) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => navigateToCategory(category)}
    >
      <Image source={{ uri: image }} style={styles.categoryImage} />
      <View style={styles.categoryOverlay}>
        <Text style={styles.categoryName}>{category}</Text>
        <Text style={styles.categoryCount}>{count} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Foodio</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => router.push('/(tabs)/cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {renderCategoryCard('Meals', 'https://media.cntraveler.com/photos/66668a4b352fb7400e650b24/16:9/w_1920,c_limit/Belly%20of%20the%20beast%20menu%20August%202023%20-%20Claire%20Gunn%20Photo.jpg', 12)}
            {renderCategoryCard('Sides', 'https://foodess.com/wp-content/uploads/2023/02/Butter-Naan-3.jpg', 2)}
            {renderCategoryCard('Snacks', 'https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/baki0qdsmcneqypomauv', 4)}
            {renderCategoryCard('Drinks', 'https://images.immediate.co.uk/production/volatile/sites/30/2023/10/GF01115BackPagePSOCocktailspreview-829355e.jpg?quality=90&resize=556,505', 6)}
          </View>
        </View>

        {/* Featured Items */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredHeader}>
            <Text style={styles.sectionTitle}>Featured Items</Text>
            <TouchableOpacity onPress={() => router.push('/menu')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            {featuredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.featuredItem}
                onPress={() => router.push({
                  pathname: '/item/[id]',
                  params: { item: JSON.stringify(item) }
                })}
              >
                <Image source={{ uri: item.image }} style={styles.featuredImage} />
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{item.name}</Text>
                  <View style={styles.featuredRating}>
                    <View style={styles.starsContainer}>
                      {renderStars(item.rating)}
                    </View>
                    <Text style={styles.reviewText}>({item.reviews})</Text>
                  </View>
                  <Text style={styles.featuredPrice}>{formatPrice(item.price)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Special Offers */}
        <View style={styles.offersContainer}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Get 20% Off</Text>
              <Text style={styles.offerDescription}>On your first order</Text>
              <TouchableOpacity style={styles.offerButton}>
                <Text style={styles.offerButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300' }}
              style={styles.offerImage}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
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
    fontSize: 24,
    fontFamily: 'outfit-bold',
    color: '#FF6B35',
  },
  cartButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  categoriesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  categoryCount: {
    fontSize: 12,
    color: '#fff',
  },
  featuredContainer: {
    padding: 16,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
  },
  featuredScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  featuredItem: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featuredRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  reviewText: {
    fontSize: 12,
    color: '#666',
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  offersContainer: {
    padding: 16,
  },
  offerCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F2',
    borderRadius: 12,
    overflow: 'hidden',
  },
  offerContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  offerButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  offerImage: {
    width: width * 0.3,
    height: '100%',
  },
});