/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

//this handler will listen to background events:
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  //log out notification data
  console.log('type ', type);
  console.log('notification data ', detail);

  //Check if the user has pressed the notification
  if (type === EventType.PRESS && pressAction.id === 'default') {
    // Do some processing..
    console.log('the default button was pressed');
    // Remove the notification after the event was registered.
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
