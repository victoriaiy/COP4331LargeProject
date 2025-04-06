import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Linking,
  } from "react-native";
  import { useRouter } from "expo-router";
  import { LinearGradient } from "expo-linear-gradient";
  import { Ionicons } from '@expo/vector-icons'; // Add this import

  
  const { width } = Dimensions.get("window");
  
  const modes = [
    {
      title: "Learn Mode",
      description: "Study and practice vocabulary",
      onPress: (router) => router.push("/learn/learnMenu"),
      color: ["#6a0dad", "#4b0082"],
      image: require("../assets/images/hablaLearnMode.png"),
    },
    {
      title: "Game Mode",
      description: "Jump into fun learning games!",
      onPress: () => Linking.openURL("https://www.hablaplusgame.com/"),
      color: ["#1f1c2c", "#928dab"],
      image: require("../assets/images/theGamewController.png"),
    },
  ];
  
  export default function HomeScreen() {
    const router = useRouter();
  
    return (
      <LinearGradient colors={["#2c003e", "#222", "#000"]} style={styles.container}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {modes.map((mode, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardWrapper}
              onPress={() => mode.onPress(router)}
              activeOpacity={0.9}
            >
              <LinearGradient colors={mode.color} style={styles.card}>
                <Text style={styles.title}>{mode.title}</Text>
                <Text style={styles.description}>{mode.description}</Text>
                {mode.image && (
                  <Image source={mode.image} style={styles.image} resizeMode="contain" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
        {/* Settings and Profile buttons */}
        <View style={styles.iconButtons}>
            <TouchableOpacity onPress={() => router.push("/settings")} style={styles.iconButton}>
                <Ionicons name="settings-outline" size={30} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/profile")} style={styles.iconButton}>
                <Ionicons name="person-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardWrapper: {
      width: width,
      padding: 20,
    },
    card: {
      flex: 1,
      backgroundColor: "#333",
      borderRadius: 20,
      padding: 24,
      justifyContent: "center",
      alignItems: "center",
      height: 400,
    },
    title: {
      fontSize: 28,
      color: "#fff",
      fontWeight: "bold",
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      color: "#ccc",
      marginBottom: 20,
      textAlign: "center",
    },
    image: {
      width: 180,
      height: 180,
      marginTop: 20,
    },
    iconButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#444',
    },
    iconButton: {
        backgroundColor: '#6a0dad',
        padding: 12,
        borderRadius: 50,
    },
    
  });
  