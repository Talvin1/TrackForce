import React, {useState} from 'react';
import {Button, Switch, Text, View} from 'react-native';
import getScreenStatus from './utils/screenState.util';
import {sendLocation, sendLocationNativeLibrary} from './utils/location.utils';

function App(): React.JSX.Element {
  const [isUsingLibrary, setIsUseLibrary] = useState(false);
  const [locationInterval, setLocationInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [filename, setFilename] = useState<string>('');
  const saveLocation = async (useLibraryForLocation: Boolean) => {
    const isScreenOff = getScreenStatus();
    if (useLibraryForLocation) {
      const currentDate = new Date().toLocaleString();
      sendLocationNativeLibrary(isScreenOff, currentDate, filename);
    } else {
      sendLocation();
    }
  };

  const startLocationInterval = () => {
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


  const stopLocationInterval = () => {
    if (locationInterval) {      
      clearInterval(locationInterval); 
    }
    setLocationInterval(null); 
    setFilename(''); 
  };
  

  return (
    <View>
      <Text>Turn on Switch to use react-native-get-location</Text>
      <Switch
        value={isUsingLibrary}
        onValueChange={() => setIsUseLibrary(!isUsingLibrary)}
      />
      <Button title="Start Operation" onPress={startLocationInterval} />
      <Button title="Stop Operation" onPress={stopLocationInterval} />
    </View>
  );
}

export default App;
