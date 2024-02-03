import React, { useState } from 'react';
import { Switch, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import getScreenStatus from './utils/screenState.util';
import { sendLocation, sendLocationNativeLibrary } from './utils/location.utils';

const App: React.FC = (): React.ReactElement => {
  const [isUsingLibrary, setIsUsingLibrary] = useState<boolean>(false);
  const [locationInterval, setLocationInterval] = useState<NodeJS.Timeout | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckMark, setShowCheckMark] = useState<boolean>(false);
  const [showErrorMark, setShowErrorMark] = useState<boolean>(false);

  const saveLocation = async (useLibraryForLocation: boolean): Promise<void> => {
    setIsLoading(true);
    setShowErrorMark(false);
  
    try {
      const isScreenOff = getScreenStatus();
      const currentDate = new Date().toLocaleString();
      if(useLibraryForLocation) {
        await sendLocationNativeLibrary(isScreenOff, currentDate, filename);
      } else {
        await sendLocation();
      }
      setShowCheckMark(true);
      setTimeout(() => {
        setShowCheckMark(false);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error occurred while saving location:", error);
      setShowErrorMark(true);
      setIsLoading(false);
      setTimeout(() => setShowErrorMark(false), 3000);
    }
  };
  

  const startLocationInterval = (): void => {
    const currentTime = String(Date.now());
    setFilename(`locationData${currentTime}.json`);

    if (locationInterval !== null) {
      clearInterval(locationInterval);
    }

    setIsLoading(true);
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
    setShowCheckMark(false);
    setShowErrorMark(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Force</Text>
      <Text></Text>
      <Text style={styles.description}>Turn Switch On (Right) To Use Location Library</Text>
      <Switch
        style={styles.switch}
        value={isUsingLibrary}
        onValueChange={() => setIsUsingLibrary(!isUsingLibrary)}
        trackColor={{ false: "#767577", true: "lightgray" }}
        thumbColor={isUsingLibrary ? "green" : "#f4f3f4"}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={startLocationInterval} style={styles.startButton}>
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopLocationInterval} style={styles.stopButton}>
          <Text style={styles.buttonText}>Stop Tracking</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="black" />}
      {showCheckMark && <Text style={styles.checkMark}>✓</Text>}
      {showErrorMark && <Text style={styles.errorMark}>✗</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  header: {
    paddingBottom: 100,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    paddingBottom: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  switch: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  startButton: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 40, 
    marginBottom: 20,
  },
  checkMark: {
    position: 'absolute',
    bottom: 0,
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  errorMark: {
    position: 'absolute',
    bottom: 0,
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
});


export default App;