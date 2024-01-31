import React, {useState} from 'react';
import {Button, Switch, View} from 'react-native';
import getScreenStatus from './utils/screenState.util';
import {sendLocation, sendLocationNativeLibrary} from './utils/location.utils';

function App(): React.JSX.Element {
  const [isUsingLibrary, setIsUseLibrary] = useState(false);

  const saveLocation = async (useLibraryForLocation: Boolean) => {
    const isScreenOff = getScreenStatus();
    const currentDate = new Date().toLocaleString();

    if (useLibraryForLocation) {
      sendLocationNativeLibrary(isScreenOff, currentDate);
    } else {
      sendLocation();
    }
  };

  return (
    <View>
      <Switch
        value={isUsingLibrary}
        onValueChange={() => setIsUseLibrary(!isUsingLibrary)}
      />
      <Button
        title="Send Location Data"
        onPress={() => saveLocation(isUsingLibrary)}
      />
    </View>
  );
}

export default App;
