import GetLocation from 'react-native-get-location';
import {writeToLocalStorage} from './storage.util';

export const sendLocationNativeLibrary = async (
  isScreenOff: boolean,
  currentDate: String,
  filename: string,
) => {
  try {
    const {getCurrentPosition} = GetLocation;
    const location = await getCurrentPosition({
      timeout: 5000,
      enableHighAccuracy: true,
    });

    const filteredLocation = [
      'Lat: ' + location.latitude,
      'Lon: ' + location.longitude,
      'Time: ' + currentDate,
      'Screen Was: ' + (isScreenOff ? 'Off' : 'On'),
    ];
    writeToLocalStorage(filename, filteredLocation);
  } catch (error) {
    console.log('Error:', error);
  }
};

export const sendLocation = async () => {};
