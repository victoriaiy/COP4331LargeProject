import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddVocabScreen() {
  const [category, setCategory] = useState("");
  const [words, setWords] = useState([{ English: "", Spanish: "" }]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...words];
    updated[index][field] = value;
    setWords(updated);
  };

  const autoTranslate = async (index) => {
    const word = words[index].English.trim();
    if (!word) return;

    try {
      const res = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=000d3f03-8825-4457-84d6-3cdf8b8ac550`
      );
      const guess = res.data?.[0]?.shortdef?.[0] || "N/A";
      const updated = [...words];
      updated[index].Spanish = guess;
      setWords(updated);
    } catch (err) {
      console.error("Translation error:", err);
    }
  };

  const addWord = () => {
    setWords([...words, { English: "", Spanish: "" }]);
  };

  const removeWord = (index) => {
    const updated = [...words];
    updated.splice(index, 1);
    setWords(updated);
  };

  const handleSubmit = async () => {
    setMessage("");

    if (!category.trim()) {
      Alert.alert("Error", "You must name the vocab list.");
      return;
    }

    const filtered = words.filter(
      (w) => w.English.trim() && w.Spanish.trim()
    );

    if (filtered.length === 0) {
      Alert.alert("Error", "Please enter at least one valid word.");
      return;
    }

    const formattedWords = filtered.map((w) => ({
      English: w.English,
      Spanish: w.Spanish,
      Topic: category,
    }));

    const userId = JSON.parse(await AsyncStorage.getItem("userId"));

    try {
      await axios.post("https://backup-backend-j6zv.onrender.com/api/addvocablist", {
        userId,
        category,
        words: formattedWords,
      });

      Alert.alert("Success", "✅ Vocab list created!");
      setCategory("");
      setWords([{ English: "", Spanish: "" }]);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Your Vocab List</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter list name (e.g., Greetings)"
          value={category}
          onChangeText={setCategory}
        />

        {words.map((word, index) => (
          <View key={index} style={styles.wordRow}>
            <TextInput
              placeholder="English"
              style={styles.wordInput}
              value={word.English}
              onChangeText={(text) => handleChange(index, "English", text)}
              onBlur={() => autoTranslate(index)}
            />
            <TextInput
              placeholder="Spanish"
              style={styles.wordInput}
              value={word.Spanish}
              onChangeText={(text) => handleChange(index, "Spanish", text)}
            />
            <TouchableOpacity onPress={() => removeWord(index)}>
              <Text style={styles.removeBtn}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={addWord}>
          <Text style={styles.btnText}>+ Add Word</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Save Vocab List</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: "#1f2937",
      padding: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 20,
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: 10,
      width: "100%",
      padding: 12,
      marginBottom: 20,
    },
    wordRow: {
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
      width: "100%",
    },
    wordInput: {
      backgroundColor: "#e5e7eb",
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      color: "#000",
    },
    removeBtn: {
      color: "#dc2626",
      fontWeight: "bold",
      textAlign: "right",
    },
    addBtn: {
      backgroundColor: "#3b82f6",
      padding: 14,
      borderRadius: 10,
      marginTop: 10,
      width: "100%",
    },
    submitBtn: {
      backgroundColor: "#10b981",
      padding: 14,
      borderRadius: 10,
      marginTop: 20,
      width: "100%",
    },
    btnText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  