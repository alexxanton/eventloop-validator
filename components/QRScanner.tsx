import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    setIsCameraActive(false);
  };

  const toggleCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    if (permission?.granted) {
      setIsCameraActive(!isCameraActive);
      setScanned(false);
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {isCameraActive ? (
          <CameraView
            style={styles.cameraWindow}
            facing="back"
            zoom={0.2}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          />
        ) : (
          <View style={styles.logoBox}>
            {scanned && <Text style={styles.scanResult}>{scannedData}</Text>}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={toggleCamera}
        disabled={isCameraActive}
      >
        <Text style={styles.buttonText}>
          {isCameraActive ? 'Scanning...' : 'Scan QR Code'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  logoBox: {
    flex: 1,
    backgroundColor: '#6a1b9a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraWindow: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scanResult: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});