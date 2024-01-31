import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export const writeToLocalStorage = async (data: any) => {
  try {
    const externalPath = RNFS.ExternalDirectoryPath;
    const folderPath = `${externalPath}/MyFolder`;
    await RNFS.mkdir(folderPath);
    const currentDate = Date.now();

    const filePath = `${folderPath}/LocationData_${currentDate}.txt`;

    const jsonData = JSON.stringify(data);

    await RNFS.writeFile(filePath, jsonData, 'utf8');

    const message = 'Data written successfully in path: ' + filePath;
    Alert.alert(message);

    await AsyncStorage.setItem('dataFilePath', filePath);

    return message;
  } catch (error: any) {
    console.error('Error writing data:', error);
    Alert.alert('Error writing data: ' + error.message);
    return 'Error writing data.';
  }
};
