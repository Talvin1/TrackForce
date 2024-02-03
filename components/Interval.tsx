import React, {useState} from 'react';
import {View, Button} from 'react-native';

const IntervalButton = (intervalFunc: Function, intervalId: number) => {
  const startInterval = () => {
    startInterval();
  };

  const stopInterval = () => {
    clearInterval(intervalId ?? 0);
    setIntervalId(0);
  };

  return (
    <View>
      <Button title="Start Interval" onPress={startInterval} />
      <Button title="Stop Interval" onPress={stopInterval} />
    </View>
  );
};

export default IntervalButton;
