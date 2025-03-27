import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Handle register logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    router.push('/home'); // Navigate to home after registration
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Sign In circular icon in top right */}
        <TouchableOpacity style={styles.switchBtn} onPress={() => router.push('/sign-in')}>
          <Ionicons name="person-outline" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444', // gray background
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '85%',
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
  },
  registerBtn: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  registerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 100,
  },
});
