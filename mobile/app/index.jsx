import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Animated, Easing } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

import { useEffect, useRef } from "react";


export default function WelcomeScreen() {
    //Adding animations to the title and logo
    const logoAnim = useRef(new Animated.Value(0)).current;
    const contentAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
          Animated.timing(logoAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
            easing: Easing.out(Easing.exp),
          }),
          Animated.timing(contentAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
        ]).start();
      }, []);






  return (
    <LinearGradient
      colors={['#BF40BF','#6a0dad', '#000']}
      style={styles.container}
    >
     <Animated.Image
        source={require('../assets/images/logo.png')}
        style={[
          styles.logo,
          {
            opacity: logoAnim,
            transform: [{
              translateY: logoAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            }],
          },
        ]}
        resizeMode="contain"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-in')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>


    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 100,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: 250,
    height: 250,
  }
});
