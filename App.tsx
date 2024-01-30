import React, {useState} from 'react';
import {Button, Switch, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import {writeToLocalStorage} from './utils/storage.utils';

function App(): React.JSX.Element {
  const [useNativeLibrary, setUseNativeLibrary] = useState(false);

  const sendLocationNativeLibrary = async () => {
    try {
      const {getCurrentPosition} = GetLocation;
      const location = await getCurrentPosition({
        timeout: 50000,
        enableHighAccuracy: true,
      });
      const currentDate = new Date().toLocaleString();
      console.log(currentDate);

      const filteredLocation = [
        'Lat: ' + location.latitude,
        'Lon: ' + location.longitude,
        'Time: ' + currentDate,
      ];
      writeToLocalStorage(filteredLocation);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const sendLocation = async () => {};

  return (
    <View>
      <Switch
        value={useNativeLibrary}
        onValueChange={() => setUseNativeLibrary(!useNativeLibrary)}></Switch>
      <Button
        title="Send Location Data"
        onPress={
          useNativeLibrary ? sendLocationNativeLibrary : sendLocation
        }></Button>
    </View>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
