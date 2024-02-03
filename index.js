/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Define your headless task configuration
const taskConfig = {
  taskName: 'sendLocation', // Adjust the task name as needed
  taskTimeout: 5000,
  preventAppCrashInForeground: true, // Prevent app crash if in foreground
};

// Register the headless task with its configuration
AppRegistry.registerHeadlessTask('sendLocation', () => require('./App'), () => taskConfig);
// Register the main component of your application
AppRegistry.registerComponent(appName, () => App);
