import { router, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { View, Image } from "react-native";
import { PaperProvider, useTheme, FAB, Text, Button, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import Item from '../components/item'
import { useCameraPermissions } from 'expo-camera';

export default function Index() {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: theme.colors.onSurface, flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 50, marginVertical: 150, borderRadius: 28 };
  const { uri } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions()

  const handleNavigation = () => {
    if (!permission) {
      return <View />
    }
    if (!permission.granted) {
      requestPermission()
    }

    router.navigate(`/camera`)
  }
  return (
    <PaperProvider>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: theme.colors.onBackground
      }}>
        <View style={{ flex:1, flexDirection: 'row', justifyContent: "space-between", }}>
          <Text variant="titleLarge" style={{ margin: 16, color: theme.colors.secondaryContainer }}>AuthZ</Text>
          <Button icon="cog" style={{ marginVertical: 16 }} onPress={showModal} />
        </View>
        <View
          style={{
            padding: 2,
            backgroundColor: theme.colors.onBackground
          }}
        >
          {uri ? <Item uri={uri} />
            : <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.onBackground
              }}>
              <Image source={require('../assets/images/empty_illustration.png')} />
              <Text variant="titleSmall">It's lonely in here</Text>
            </View>
          }
          <FAB
            icon="plus"
            style={{
              position: 'absolute',
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={handleNavigation}
          />
        </View>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Button icon="database">Database</Button>
            <Button icon="cloud-sync-outline">Sync</Button>
            <Button icon="theme-light-dark">Theme</Button>
            <Button icon="information-outline">About</Button>
            <Button icon="logout">Logout</Button>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
}
