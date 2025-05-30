import React from "react";
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Entry() {
  return (
    <SafeAreaView >
        <StatusBar
          animated={true}
          backgroundColor="#6b6b6b"

        />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/main.jpg")}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Foodio</Text>
          <Text style={styles.subText}>Let us help you discover the best food</Text>
          <View style={{
            marginBottom: '40%'
          }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>               
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000", // Fallback background
  },
  imageContainer: {

    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    opacity: 0.9,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  overlayText: {
    fontFamily: 'outfit-bold',
    fontSize: 50,
    color: "#ff9429",
    textAlign: "center",
    textShadowColor: "rgba(209, 76, 20, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subText: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonText: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    fontWeight: "semi-d",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    backgroundColor: "rgba(237, 106, 12, 0.8)", // Using rgba instead of opacity
    padding: 12,
    paddingInline: 25,
    borderRadius: 99,
    marginTop: "15%",
  },
});