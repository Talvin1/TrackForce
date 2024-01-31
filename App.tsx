import React, {useState} from 'react';
import {Button, Switch, Text, View} from 'react-native';
import getScreenStatus from './utils/screenState.util';
import {sendLocation, sendLocationNativeLibrary} from './utils/location.utils';

function App(): React.JSX.Element {
  const [isUsingLibrary, setIsUseLibrary] = useState(false);
  const [locationInterval, setLocationInterval] =
    useState<NodeJS.Timeout | null>(null);

  const saveLocation = async (useLibraryForLocation: Boolean) => {
    const isScreenOff = getScreenStatus();
    const currentDate = new Date().toLocaleString();

    if (useLibraryForLocation) {
      sendLocationNativeLibrary(isScreenOff, currentDate);
    } else {
      sendLocation();
    }
  };

  const startLocationInterval = () => {
    const intervalId = setInterval(() => saveLocation(isUsingLibrary), 5000);
    setLocationInterval(intervalId);
  };

  const stopLocationInterval = () => {
    if (locationInterval) {
      clearInterval(locationInterval);
      setLocationInterval(null);
    }
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
