import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  { title: "Greetings", colors: ["#34D399", "#059669"] }, // from-green-400 to-emerald-600
  { title: "Food", colors: ["#FBBF24", "#F59E0B"] },
  { title: "Travel", colors: ["#60A5FA", "#4F46E5"] },
  { title: "All Words", colors: ["#A78BFA", "#D946EF"] },
  { title: "+ Add Vocab List", colors: ["#FFFFFF", "#E5E7EB"], textColor: "#000" },
];

export default function learnMenu() {
  const router = useRouter();

  const handlePress = (category) => {
    if (category === "+ Add Vocab List") {
      router.push("/add-vocab");
    } else {
      const route = category === "All Words" ? "/learn/all" : `/learn/${category.toLowerCase()}`;
      router.push(route);
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.title)} style={styles.cardWrapper}>
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={[styles.cardText, item.textColor ? { color: item.textColor } : {}]}>
          {item.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn Mode</Text>
      <FlatList
        data={categories}
        renderItem={renderCard}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111827", // Tailwind's gray-900
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 20,
    },
    cardWrapper: {
      marginBottom: 20,
    },
    card: {
      height: 120,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    cardText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
    },
  });
  