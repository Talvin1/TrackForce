import React, { useEffect, useState } from 'react';
import { Switch, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import getScreenStatus from './utils/screenState.util';
import { sendLocation, sendLocationNativeLibrary } from './utils/location.util';
import BackgroundTimer from 'react-native-background-timer';

const App: React.FC = (): React.ReactElement => {
  const [isUsingLibrary, setIsUsingLibrary] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCheckMark, setShowCheckMark] = useState<boolean>(false);
  const [showErrorMark, setShowErrorMark] = useState<boolean>(false);
  const [backgroundTask, setBackgroundTask] = useState<number | null>(null);
  const [isRequestInProgress, setIsRequestInProgress] = useState<boolean>(false);


  useEffect(() => {
    return () => {
      // Clear the BackgroundTimer interval when the component unmounts
      if (backgroundTask) {
        BackgroundTimer.clearInterval(backgroundTask);
      }
    };
  }, []);

  const startLocationInterval = async (): Promise<void> => {
    console.log('Starting location interval...');
    setShowErrorMark(false);
    setShowCheckMark(false);
  
    // Prevent starting a new interval if one is already running or if a request is in progress
    if (backgroundTask || isRequestInProgress) {
      console.log('Location interval or request is already running.');
      return;
    }
  
    try {
      setIsRequestInProgress(true); // Set flag to indicate that a request is in progress
      setIsLoading(true);
      const isScreenOff = getScreenStatus();
      const currentDate = new Date().toLocaleString();
      const currentTime = String(Date.now());
      const filenameForBackground = `locationData${currentTime}.json`;
      console.log('Sending location data...');
      await sendLocationNativeLibrary(isScreenOff, currentDate, filenameForBackground);
      console.log('Location data sent successfully.');
  
      // Start the BackgroundTimer interval
      const task = BackgroundTimer.setInterval(async () => {
        console.log('Sending location data periodically...');
        setIsLoading(true);
        await sendLocationNativeLibrary(isScreenOff, currentDate, filenameForBackground);
        console.log('Location data sent periodically.');
      }, 5000); // Run every 5 seconds
  
      setBackgroundTask(task);
  
      setTimeout(() => {
        setIsLoading(false);
        setShowCheckMark(true);
        setTimeout(() => {
          setShowCheckMark(false);
        }, 3000); // Show checkmark for 3 seconds
      }, 2000); // Wait 2 seconds before hiding loading indicator
    } catch (error: any) {
      // Check if the error is due to a cancellation
      if (error.message === 'Location cancelled by another request') {
        console.log('Location request cancelled.');
        setIsRequestInProgress(false); // Reset flag if request is cancelled
        return;
      }
  
      console.error('Error occurred while starting location interval:', error);
      setShowErrorMark(true);
      setIsLoading(false);
      setIsRequestInProgress(false); // Reset flag if request fails
      setTimeout(() => {
        setShowErrorMark(false);
      }, 3000); // Show error mark for 3 seconds
    }
  };
  
  const stopLocationInterval = (): void => {
    setIsLoading(false);
    setShowCheckMark(false);
    setShowErrorMark(false);
    if (backgroundTask) {
      BackgroundTimer.clearInterval(backgroundTask);
      setBackgroundTask(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Force</Text>
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
          <Text style={styles.buttonText}>Start Operation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopLocationInterval} style={styles.stopButton}>
          <Text style={styles.buttonText}>Stop Operation</Text>
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
    bottom: 100,
    zIndex: 1,
  },
  checkMark: {
    position: 'absolute',
    bottom: 100,
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    alignSelf: 'center',
    zIndex: 1,
  },
  errorMark: {
    position: 'absolute',
    bottom: 100,
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    alignSelf: 'center',
    zIndex: 1,
  },
});

export default App;
