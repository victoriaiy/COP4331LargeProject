import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [vocabLists, setVocabLists] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    // If you have a badge system, unlock it here
    // unlockBadge("openedSettings");

    const fetchUserWords = async () => {
      try {
        const id = JSON.parse(await AsyncStorage.getItem("userId"));
        setUserId(id);

        const res = await axios.post(
          "https://backup-backend-j6zv.onrender.com/api/userwords",
          { userId: id }
        );

        setLearnedWords(res.data.learnedWords || []);
        setVocabLists(res.data.vocabLists || []);
      } catch (err) {
        console.error("Failed to fetch user words:", err);
        Alert.alert("Error", "Failed to load your data.");
      }
    };

    fetchUserWords();
  }, []);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await axios.delete(
                "https://backup-backend-j6zv.onrender.com/api/delete",
                { data: { userId } }
              );

              if (res.status === 200) {
                await AsyncStorage.removeItem("userId");
                Alert.alert("Success", "Account deleted.");
                router.push("/");
              } else {
                Alert.alert("Error", "Something went wrong.");
              }
            } catch (error) {
              console.error("Delete error:", error);
              Alert.alert("Error", "Failed to delete account.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Return Home Button */}
      <TouchableOpacity style={styles.homeBtn} onPress={() => router.push("/home")}>
        <Ionicons name="home" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Vocab Lists */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocab Lists</Text>
        {vocabLists.length > 0 ? (
          vocabLists.map((list, i) => (
            <View key={list.VocabListId || i} style={styles.subSection}>
              <Text style={styles.category}>{list.Category}</Text>
              {list.Words.map((word, idx) => (
                <Text key={word.WordId || idx} style={styles.word}>
                  <Text style={styles.bold}>{word.English}</Text> – <Text style={styles.italic}>{word.Spanish}</Text>
                </Text>
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>You don't have any vocab lists yet.</Text>
        )}
      </View>

      {/* Learned Words */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learned Words</Text>
        {learnedWords.length > 0 ? (
          learnedWords.map((word, i) => (
            <Text key={word.WordId || i} style={styles.word}>
              <Text style={styles.bold}>{word.English}</Text> – <Text style={styles.italic}>{word.Spanish}</Text> ({word.Topic})
            </Text>
          ))
        ) : (
          <Text style={styles.emptyText}>You haven't learned any words yet.</Text>
        )}
      </View>

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 60,
      backgroundColor: "#eee",
      alignItems: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#6a0dad",
      marginBottom: 20,
    },
    homeBtn: {
      position: "absolute",
      top: 20,
      left: 20,
      backgroundColor: "#6a0dad",
      padding: 10,
      borderRadius: 50,
    },
    section: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#000",
    },
    subSection: {
      marginBottom: 10,
    },
    category: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 8,
      marginBottom: 4,
      color: "#333",
    },
    word: {
      color: "#444",
      marginLeft: 10,
    },
    bold: {
      fontWeight: "bold",
    },
    italic: {
      fontStyle: "italic",
    },
    emptyText: {
      color: "#666",
      fontStyle: "italic",
    },
    deleteBtn: {
      backgroundColor: "red",
      padding: 14,
      borderRadius: 12,
      width: "100%",
      marginTop: 10,
    },
    deleteText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  
