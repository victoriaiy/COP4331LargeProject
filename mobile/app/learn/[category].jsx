import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function FlashcardLearnScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      const id = JSON.parse(await AsyncStorage.getItem("userId"));
      if (!id) return Alert.alert("Please log in first.");

      setUserId(id);

      const res = await axios.post("https://backup-backend-j6zv.onrender.com/api/userwords", {
        userId: id,
      });

      const allLists = res.data.vocabLists || [];
      const learned = res.data.learnedWords || [];

      let combinedWords = [];

      if (category?.toLowerCase() === "all") {
        combinedWords = allLists.flatMap((list) => list.Words || []);
      } else {
        const list = allLists.find((l) => l.Category.toLowerCase() === category?.toLowerCase());
        combinedWords = list ? list.Words : [];
      }

      const notLearned = combinedWords.filter(
        (word) => !learned.some((lw) => lw.WordId === word.WordId)
      );

      setWords(shuffle(notLearned));
    };

    fetchWords();
  }, [category]);

  const shuffle = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const currentWord = words[currentIndex];

  const markAsLearned = async () => {
    if (!currentWord) return;

    try {
      await axios.post("https://backup-backend-j6zv.onrender.com/api/addlearnedword", {
        userId,
        word: currentWord,
      });
      Alert.alert("Marked as Learned");
      nextCard();
    } catch (err) {
      Alert.alert("Error", "Could not mark word as learned.");
    }
  };

  const nextCard = () => {
    setShowTranslation(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <View style={styles.container}>
      {currentWord ? (
        <>
          <TouchableOpacity
            style={styles.card}
            onPress={() => setShowTranslation(true)}
          >
            <Text style={styles.wordText}>{currentWord.Spanish}</Text>
            {showTranslation && (
              <Text style={styles.translationText}>{currentWord.English}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={nextCard}>
            <Text style={styles.btnText}>Next Word</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.learnedBtn} onPress={markAsLearned}>
            <Text style={styles.btnText}>Mark as Learned</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.wordText2}>All words in this category are learned!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  wordText: {
    fontSize: 32,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
  wordText2: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  translationText: {
    fontSize: 24,
    color: "#6B7280", // Tailwind gray-500
    fontStyle: "italic",
  },
  btn: {
    backgroundColor: "#6D28D9",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  learnedBtn: {
    backgroundColor: "#059669",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
