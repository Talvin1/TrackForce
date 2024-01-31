import React, {useState} from 'react';
import {Button, Switch, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import {writeToLocalStorage} from './utils/storage.util';
import getScreenStatus from './utils/screenState.util';

function App(): React.JSX.Element {
  const [useNativeLibrary, setUseNativeLibrary] = useState(false);

  const saveLocation = async () => {
    const isScreenOff = getScreenStatus();
    try {
      const {getCurrentPosition} = GetLocation;
      const location = await getCurrentPosition({
        timeout: 50000,
        enableHighAccuracy: true,
      });

      const currentDate = new Date().toLocaleString();
      const filteredLocation = [
        'Lat: ' + location.latitude,
        'Lon: ' + location.longitude,
        'Time: ' + currentDate,
        'Screen Was: ' + (isScreenOff ? 'Off' : 'On'),
      ];
      writeToLocalStorage(filteredLocation);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View>
      <Switch
        value={useNativeLibrary}
        onValueChange={() => setUseNativeLibrary(!useNativeLibrary)}
      />
      <Button title="Send Location Data" onPress={saveLocation} />
    </View>
  );
}

export default App;
