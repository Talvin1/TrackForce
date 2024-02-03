import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export const writeToLocalStorage = async (filename: string, data: any) => {
  try {
    const externalPath = RNFS.ExternalDirectoryPath;
    const folderPath = `${externalPath}/MyFolder`;
    await RNFS.mkdir(folderPath);

    const filePath = `${folderPath}/${filename}`;

    const jsonData = JSON.stringify(data);

    await RNFS.appendFile(filePath, jsonData, 'utf8');

    const message = 'Data written successfully in path: ' + filePath;
    console.log(message);

    await AsyncStorage.setItem('dataFilePath', filePath);

    return message;
  } catch (error: any) {
    console.error('Error writing data:', error);
    Alert.alert('Error writing data: ' + error.message);
    return 'Error writing data.';
  }
};
