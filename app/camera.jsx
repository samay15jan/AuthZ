import { CameraView } from 'expo-camera';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function Camera() {
  const [toggleTorch, setToggleTorch] = useState(false)
  const [scanned, setScanned] = useState(false)

  const handleBarCodeScanned = async ({ data: url }) => {
    setScanned(true)
    router.push(`/?uri=${encodeURIComponent(url)}`);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        enableTorch={toggleTorch}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setToggleTorch(!toggleTorch)}>
            <MaterialCommunityIcons name={toggleTorch ? "flashlight" : "flashlight-off"} size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});