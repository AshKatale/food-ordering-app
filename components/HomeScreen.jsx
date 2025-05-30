import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
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

export default function HomeScreen() {
  const router = useRouter();

  const featuredItems = [
    {
      id: 1,
      name: 'Spicy Noodles',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
      rating: 4.5,
      reviews: 89
    },
    {
      id: 2,
      name: 'Shrimp Pasta',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 3,
      name: 'Vegetable Curry',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300',
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Foodio</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => router.push('/menu')}
              >
                <View style={styles.categoryIcon}>
                  <Ionicons name={category.icon} size={24} color="#FF6B35" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
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
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
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
  categoriesContainer: {
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
  categoryItem: {
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
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
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