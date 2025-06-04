# Food Ordering App

A comprehensive food ordering mobile application built with React Native(Expo) and Firebase, featuring a modern UI/UX design and real-time data management.

[Download APK](https://expo.dev/accounts/ashitosh1409/projects/food-app/builds/829542d3-f593-4c1d-8128-8cf065ef805c)

## Features

### Core Functionality
- User-Friendly Interface: Clean, modern design with intuitive navigation
- Menu Display: Categorized food items with images, descriptions, and prices
- Real-time Data: Firebase Firestore integration for live menu updates
- Shopping Cart: Add, remove, and modify item quantities
- Order Management: Complete order flow from cart to confirmation
- Address Management: Delivery address input and validation
- Order Summary: Detailed breakdown with pricing and delivery information

### Key Screens
- Home Screen: Featured items, categories, and search functionality
- Menu Screen: Categorized food items with filtering options
- Item Details: Detailed view with recommendations and reviews
- Cart Screen: Order management with quantity controls
- Delivery Address: Address input with profile auto-fill option
- Order Summary: Final review before order placement
- Order Confirmation: Success modal with delivery estimates

### Categories Supported
- Meals: Main dishes including Indian and international cuisine
- Sides: Complementary dishes and appetizers
- Snacks: Light bites and finger foods
- Drinks: Beverages and refreshments

## Technology Stack

### Frontend
- React Native: Cross-platform mobile development
- Expo Router: File-based routing system
- React Hooks: State management (useState, useEffect)
- Expo Vector Icons: Icon library for UI elements

### Backend
- Firebase Firestore: NoSQL database for real-time data

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/AshKatale/food-ordering-app.git
cd food-ordering-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure Firebase
- Create a Firebase project at Firebase Console
- Enable Firestore Database
- Download configuration file

4. Set up Firestore Collections
Create the following collection in your Firestore database:
- menu-items

5. Start the development server
```bash
npx expo start
```

6. Run on device/simulator
- Scan QR code with Expo Go app (mobile)
- Press 'a' for Android emulator
- Press 'i' for iOS simulator

## Firebase Data Structure

### MenuItems Collection
```javascript
{
  id: "auto-generated",
  name: "Spicy Noodles",
  price: 150,
  image: "image-url",
  description: "Rich and tasty noodles...",
  category: "Meals",
  rating: 4.5,
  reviews: 89,
  calories: 248,
}
```

## UI/UX Design

### Color Palette
- Primary Orange: #FF6B35 - Main accent color
- Background: #F8F8F8 - Light gray background
- Card Background: #FFFFFF - Pure white for cards
- Text Primary: #333333 - Dark gray for main text
- Text Secondary: #666666 - Medium gray for secondary text
- Text Muted: #999999 - Light gray for muted text

### Typography
- Headers: Bold, 18-24px
- Body Text: Regular, 14-16px
- Captions: Regular, 12px
- Font Weight: 400 (regular), 500 (medium), 600 (semibold), bold (700)

### Components
- Cards: Rounded corners (12px), subtle shadows
- Buttons: Rounded (25px), consistent padding
- Icons: 24px for navigation, 20px for actions, 16px for small elements

## Features in Detail

### Home Screen
- Welcome message with personalized greeting
- Search functionality with voice input
- Category filtering tabs
- Featured/special offers section
- Popular items grid layout
- Cart badge with item count

### Menu Screen
- Category-based navigation
- Grid layout for optimal space usage
- Favorite/wishlist functionality
- Real-time price display
- High-quality food images
- Quick add to cart options

### Item Details
- Large hero image with favorite toggle
- Quantity selector with +/- controls
- Star ratings and review counts
- Detailed descriptions with calorie information
- Recommended sides suggestions
- Add to cart with running total

### Cart Management
- Item list with images and details
- Quantity modification controls
- Remove items with confirmation
- Real-time total calculation
- Delivery fee transparency
- Continue shopping option

### Order Flow
- Address input with validation
- Profile details auto-fill option
- Payment method selection
- Order summary with breakdown
- Confirmation modal with success animation
- Automatic navigation to home

## Platform Support

- Android: API level 21 (Android 5.0) and above
- Expo Go: For development and testing

## Development

### Available Scripts
```bash
# Start development server
npm start

# Start with clear cache
npm start --clear

# Build for production
expo build:android
expo build:ios

# Run tests
npm test

# Lint code
npm run lint
```

### Environment Variables
Create a .env file in the root directory:
```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

### Coding Standards
- Use ESLint for code formatting
- Follow React Native best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test on both iOS and Android

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- Ashitosh Katale - Initial work - @AshKatale

## Acknowledgments

- Design inspiration from modern food delivery apps
- Firebase for backend infrastructure
- Expo team for excellent development tools
- Unsplash for high-quality food images
- React Native community for continuous support

## Support

For support, reach out at LinkedIn https://www.linkedin.com/in/ashitoshkatale


Made with ❤️ by Ashitosh

Happy Coding! 🚀
