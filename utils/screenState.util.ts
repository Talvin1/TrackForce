import {AppState} from 'react-native';

const getScreenStatus = (): boolean => {
  const appState = AppState.currentState;
  return appState !== 'active';
};

export default getScreenStatus;
