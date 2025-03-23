import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen: React.FC = () => {
  const user = {
    name: "RAJA ALI ABASS",
    email: "70131476@student.uol.edu.pk",
    phone: "03174824640",
    location: "Punjab, Pakistan",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Location: {user.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});

export default ProfileScreen;
