import React from 'react';
import {Snackbar} from 'react-native-paper';

const DEFAULT_DURATION_IN_MILLIS = 5 * 1000;

type Props = {
  isVisible: boolean;
  message: string;
  onDismiss: () => void;
};

const ErrorSnackbar = ({isVisible, message, onDismiss}: Props) => {
  return (
    <Snackbar
      visible={isVisible}
      duration={DEFAULT_DURATION_IN_MILLIS}
      onDismiss={onDismiss}>
      {message}
    </Snackbar>
  );
};

export default ErrorSnackbar;
