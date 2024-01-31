import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export const writeToLocalStorage = async (data: any) => {
  try {
    const externalPath = RNFS.ExternalDirectoryPath;
    const folderPath = `${externalPath}/MyFolder`;
    await RNFS.mkdir(folderPath);

    const filePath = `${folderPath}/LocationData.txt`;

    // Stringify the JSON data before writing to the file
    const jsonData = JSON.stringify(data);

    await RNFS.writeFile(filePath, jsonData, 'utf8'); // Specify encoding as 'utf8'

    // Notify the user about the file path
    const message = 'Data written successfully in path: ' + filePath;
    Alert.alert(message);

    // Optionally, store the file path in AsyncStorage
    await AsyncStorage.setItem('dataFilePath', filePath);

    return message;
  } catch (error: any) {
    console.error('Error writing data:', error);
    Alert.alert('Error writing data: ' + error.message);
    return 'Error writing data.';
  }
};

// export const writeDataToJsonFile = async (data: any) => {
//   try {
//     const jsonData = JSON.stringify(data); // Convert data to JSON string
//     const filePath = `${FileSystem.documentDirectory}data.json`; // File path for storing data.json in the app's documents directory
//     await FileSystem.writeAsStringAsync(filePath, jsonData); // Write JSON data to file

//     Alert.alert("Success", `Data has been written to ${filePath}`);
//   } catch (error) {
//     console.error("Error writing data to file:", error);
//     Alert.alert("Error", "Failed to write data to file. Please try again.");
//   }
// };
