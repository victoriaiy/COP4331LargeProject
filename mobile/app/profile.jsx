import {
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "...",
    profilePicture: null,
    aboutMe: "Loading...",
    level: "...",
    loginStreak: "...",
  });

  const [badges, setBadges] = useState([]);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = JSON.parse(await AsyncStorage.getItem("userId"));
        const response = await axios.post("https://backup-backend-j6zv.onrender.com/api/profile", {
          userId: id,
        }); 
        

        setUser(response.data);
        setBio(response.data.aboutMe);
        setBadges(response.data.badges || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
        Alert.alert("Error", "Unable to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("userId");
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture */}
        <Image
              source={
                user.profilePicture
                  ? { uri: `https://backup-backend-j6zv.onrender.com${user.profilePicture.startsWith('/') ? '' : '/'}${user.profilePicture}` }
                  : require('../assets/images/placeholder-profile.png')
              }
              style={styles.profileImage}
              resizeMode="cover"
            />

        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.meta}>Level: {user.level}</Text>
        <Text style={styles.meta}>Login Streak: {user.loginStreak}</Text>

        {/* About Me / Bio */}
        <Text style={styles.sectionTitle}>About Me</Text>
        <TextInput
          style={styles.bioInput}
          multiline
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
        />

        {/* Badges */}
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgeContainer}>
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <View style={styles.badge} key={index}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))
          ) : (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Explore to earn more badges</Text>
            </View>
          )}
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
    borderWidth: 1,
    borderColor: '#fff',  
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
    flexDirection: 'collumn',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 12,
    marginBottom: 30,
  },
  badge: {
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: '#245',
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
  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meta: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 2,
  },
});
