import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Button } from "@rneui/themed";
import { CameraView, useCameraPermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QRLogo } from "../assets/QRLogo";
import { useData } from "./DataProvider";
import { supabase } from "../lib/supabase";
import { ValidatedLogo } from "../assets/ValidatedLogo";
import { ErrorLogo } from "../assets/ErrorLogo";

const privilegedRoles = ["validator", "admin", "organizer", "owner"];

export function QRScanner() {
  const { user, setUser } = useData();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = async ({data}: {data: string}) => {
    setScanned(true);
    setScannedData(data);
    setIsCameraActive(false);
    setLoading(true);
    await validateTicket(data);
    setLoading(false);
  };

  const validateTicket = async (id: string) => {
    try {
      const { data: ticket } = await supabase
      .from("tickets")
      .select("*, event:events(*, group:groups(*, members:group_members(user_id, role)))")
      .eq("ticket_number", id)
      .throwOnError();

    const members = ticket && ticket[0]?.event?.group?.members;
    const loggedInMember = members?.find((member: { user_id: string | undefined; }) => member.user_id === user?.id);
    const userRole = loggedInMember?.role;
    const canValidate = privilegedRoles.includes(userRole);
    console.log(ticket)

    if (loggedInMember && canValidate) {
      if (ticket && ticket[0].validated) {
        setValidation("error");
        return;
      }

      setValidation("ok");
      const { error } = await supabase
        .from("tickets")
        .update({validated: true})
        .eq("ticket_number", id);

      return;
    }

    setValidation("");
    Alert.alert("You don't have permission to validate this ticket.");
    } catch (error) {
      console.log(error)
    }
  };

  const toggleCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    if (permission?.granted) {
      setIsCameraActive(!isCameraActive);
      setScanned(false);
    }
    setValidation("");
  };

  const handleSignOut = async () => {
    setUser(null);
    await AsyncStorage.setItem("supabase.session", "");
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRightButton}>
        <Button
          onPress={handleSignOut}
          radius={30}
          color="#6200E8"
        >
          <Text style={styles.topRightButtonText}>Sign out</Text>
        </Button>
      </View>

      <View style={styles.logoContainer}>
        {isCameraActive ? (
          <CameraView
            style={styles.cameraWindow}
            facing="back"
            zoom={0.2}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          />
        ) : (
          loading ? (
            <ActivityIndicator style={{ transform: [{ translateY: 80 }] }} color="#6200E8" size="large" />
          ) : (
            <View style={styles.logoBox}>
              {validation ? (validation === "ok" ? <ValidatedLogo /> : <ErrorLogo />) : <QRLogo />}
            </View>
          )
        )}
      </View>

      <Button
        style={styles.button}
        onPress={toggleCamera}
        radius={30}
        color="#6200E8"
        size="lg"
      >
        <Text style={styles.buttonText}>
          {isCameraActive ? "Scanning..." : "Scan QR Code"}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  topRightButton: {
    position: "absolute",
    top: 40,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
  },
  topRightButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  logoContainer: {
    width: 200,
    height: 200,
    marginBottom: 200,
  },
  logoBox: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraWindow: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#6a1b9a",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scanResult: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
});
