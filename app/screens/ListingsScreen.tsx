import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet, Alert } from "react-native";

// Sample Data
const initialListings = [
  { id: 1, title: "Wheat Straw", description: "100 kg of wheat straw available for sale." },
  { id: 2, title: "Corn Husk", description: "50 kg of corn husk suitable for composting." },
  { id: 3, title: "Rice Husk", description: "120 kg of rice husk for biofuel production." },
];

const ListingsScreen: React.FC = () => {
  const [listings, setListings] = useState(initialListings);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null); // Track which item is being edited

  // 🔹 CREATE: Add a new listing
  const addListing = () => {
    if (!title || !description) {
      Alert.alert("Error", "Please enter both title and description");
      return;
    }
    const newListing = { id: Date.now(), title, description };
    setListings([...listings, newListing]);
    setTitle("");
    setDescription("");
  };

  // 🔹 UPDATE: Edit an existing listing
  const updateListing = () => {
    if (!title || !description) {
      Alert.alert("Error", "Please enter both title and description");
      return;
    }
    setListings(listings.map(item => (item.id === editId ? { ...item, title, description } : item)));
    setEditId(null);
    setTitle("");
    setDescription("");
  };

  // 🔹 DELETE: Remove a listing
  const deleteListing = (id: number) => {
    setListings(listings.filter(item => item.id !== id));
  };

  // 🔹 Handle Edit Button Click
  const startEdit = (id: number, title: string, description: string) => {
    setEditId(id);
    setTitle(title);
    setDescription(description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{editId ? "Edit Listing" : "Add a New Listing"}</Text>

      {/* 🔹 Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* 🔹 Add / Update Button */}
      {editId ? (
        <Button title="Update Listing" onPress={updateListing} color="orange" />
      ) : (
        <Button title="Add Listing" onPress={addListing} color="green" />
      )}

      {/* 🔹 Display Listings */}
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>

            {/* 🔹 Edit & Delete Buttons */}
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => startEdit(item.id, item.title, item.description)} color="blue" />
              <Button title="Delete" onPress={() => deleteListing(item.id)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
});

export default ListingsScreen;
