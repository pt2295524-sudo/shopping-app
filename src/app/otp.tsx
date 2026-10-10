import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OtpScreen() {
  const router = useRouter();
  const { username, email } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message || "OTP Verified");

        router.replace("/Dashboard/admin");
      } else {
        Alert.alert("Error", data.detail || "Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
 
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      >
        <View
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: 25,
            padding: 25,
            borderWidth: 1,
            borderColor: "rgb(255, 255, 255)",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#060606",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Verify OTP
          </Text>

          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Enter the OTP sent to your email
          </Text>

          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor="rgb(7, 1, 1)"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            style={{
              color: "#060606",
              backgroundColor: "rgb(254, 254, 254)",
              borderWidth: 1,
              borderColor: "rgb(5, 4, 4)",
              borderRadius: 15,
              padding: 15,
              marginBottom: 20,
              textAlign: "center",
              fontSize: 15,
              letterSpacing: 8,
            }}
          />

        <TouchableOpacity
  onPress={handleVerifyOtp}
  disabled={loading}
  style={{
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    opacity: loading ? 0.6 : 1,
  }}
>
  <Text
    style={{
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    }}
  >
    {loading ? "Verifying..." : "Verify OTP"}
  </Text>
</TouchableOpacity>
        </View>
      </View>
  );
}