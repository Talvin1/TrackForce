import React, { useState } from 'react';
import { Button, Switch, Text, View, StyleSheet } from 'react-native';
import getScreenStatus from './utils/screenState.util';
import { sendLocation, sendLocationNativeLibrary } from './utils/location.utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App: React.FC = (): React.ReactElement => {
  const [isUsingLibrary, setIsUsingLibrary] = useState<boolean>(false);
  const [locationInterval, setLocationInterval] = useState<NodeJS.Timeout | null>(null);
  const [filename, setFilename] = useState<string>('');

  const saveLocation = async (useLibraryForLocation: boolean): Promise<void> => {
    const isScreenOff = getScreenStatus();
    if (useLibraryForLocation) {
      const currentDate = new Date().toLocaleString();
      sendLocationNativeLibrary(isScreenOff, currentDate, filename);
    } else {
      sendLocation();
    }
  };

  const startLocationInterval = (): void => {
    const currentTime = String(Date.now());
    setFilename(`locationData${currentTime}.txt`);

    if (locationInterval !== null) {
      clearInterval(locationInterval);
    }
    const intervalId = setInterval(async () => {
      await saveLocation(isUsingLibrary);
    }, 5000);

    setLocationInterval(intervalId);
  };

  const stopLocationInterval = (): void => {
    if (locationInterval) {
      clearInterval(locationInterval);
    }
    setLocationInterval(null);
    setFilename('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Turn on Switch to use react-native-get-location</Text>
      <Switch
        style={styles.switch}
        value={isUsingLibrary}
        onValueChange={() => setIsUsingLibrary(!isUsingLibrary)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Start Operation" onPress={startLocationInterval} />
        <Button title="Stop Operation" onPress={stopLocationInterval} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
  switch: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
});

export default App;
