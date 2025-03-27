import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic here
    console.log("Email:", email);
    console.log("Password:", password);
    router.push('/home'); // just route to home for now
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Register circular icon in top right */}
        <TouchableOpacity style={styles.registerBtn} onPress={() => router.push('/register')}>
          <Ionicons name="person-add-outline" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Sign In</Text>

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

        <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
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
  signInBtn: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  signInText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 100,
  },
});
