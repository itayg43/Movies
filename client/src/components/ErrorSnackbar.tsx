import React from 'react';
import {Snackbar} from 'react-native-paper';

const DEFAULT_DURATION_IN_MILLIS = 3 * 1000;

type Props = {
  isVisible: boolean;
  message: string;
  onDismiss: () => void;
};

const ErrorSnackbar = ({isVisible, message, onDismiss}: Props) => {
  return isVisible ? (
    <Snackbar
      visible={isVisible}
      duration={DEFAULT_DURATION_IN_MILLIS}
      onDismiss={onDismiss}>
      {message}
    </Snackbar>
  ) : null;
};

export default ErrorSnackbar;
