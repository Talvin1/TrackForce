export const sendLocationNativeLibrary = async () => {
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

const sendLocation = async () => {};
