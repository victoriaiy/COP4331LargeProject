import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export default function ProfileScreen() {
  const router = useRouter();
  const [bio, setBio] = useState("This is your bio...");

  const handleSignOut = () => {
    // Add real sign-out logic here
    console.log("Signed out");
    router.push('/');
  };

  return (
    <View style={styles.container}>
      {/* Sign Out button */}
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Profile Picture */}
        <Image
          source={require('../assets/images/placeholder-profile.png')} // Replace with real user image eventually
          style={styles.profileImage}
        />

        {/* Editable Bio */}
        <Text style={styles.sectionTitle}>Your Bio</Text>
        <TextInput
          style={styles.bioInput}
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
        />

        {/* Badges Section */}
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}><Text style={styles.badgeText}>🏅</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>🔥</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>💯</Text></View>
        </View>

        {/* Return Home */}
        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/home')}>
          <Text style={styles.homeButtonText}>Return Home</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  signOutBtn: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 30,
    zIndex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  bioInput: {
    backgroundColor: '#222',
    color: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 12,
    marginBottom: 40,
  },
  badge: {
    backgroundColor: '#444',
    padding: 16,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 24,
  },
  homeButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
