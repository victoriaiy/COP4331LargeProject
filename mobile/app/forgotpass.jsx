import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email.includes("@")) {
      return Alert.alert("Invalid Email", "Please enter a valid email address.");
    }

    try {
      await axios.post("https://habla-plus.xyz/api/resetpasswordemail", {
        email,
      });

      Alert.alert("Email Sent", "Check your email to reset your password.");
      router.push("/"); // Go back to sign in
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong.";
      Alert.alert("Reset Failed", errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Back Icon */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#6a0dad",
    padding: 10,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 24,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    marginBottom: 16,
  },
  resetBtn: {
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  resetText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
