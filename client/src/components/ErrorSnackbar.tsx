import React from 'react';
import {Snackbar} from 'react-native-paper';

const DEFAULT_DURATION_IN_MILLIS = 3 * 1000;

type Props = {
  isVisible: boolean;
  duration?: number;
  message: string;
  onDismiss: () => void;
};

const ErrorSnackbar = ({isVisible, duration, message, onDismiss}: Props) => {
  return isVisible ? (
    <Snackbar
      visible={isVisible}
      duration={duration ?? DEFAULT_DURATION_IN_MILLIS}
      onDismiss={onDismiss}>
      {message}
    </Snackbar>
  ) : null;
};

export default ErrorSnackbar;
