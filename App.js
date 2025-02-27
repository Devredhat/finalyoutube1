import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";

export default function App() {
  const [videoUrl, setVideoUrl] = useState("");

  const backendURL = "https://youtube1-fz0d.onrender.com/download";


  const handleDownload = async () => {
    if (!videoUrl) {
      Alert.alert("Error", "Please enter a valid YouTube URL.");
      return;
    }

    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
          format: "720p", // Modify this if needed
        }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (data.message) {
        Alert.alert("Success", "Download started successfully!");
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to communicate with server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YouTube Video Downloader</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />
      <Button title="Download" onPress={handleDownload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
