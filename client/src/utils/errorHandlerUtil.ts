import {AxiosError} from 'axios';

const DEFAULT_MESSAGE =
  'Something went wrong, please try again in a few minutes or contact support';

const extractMessage = (error: any): string => {
  if (__DEV__) {
    console.error(error);
  }

  const message =
    error instanceof AxiosError ? error.response?.data.message : error.message;
  return message ?? DEFAULT_MESSAGE;
};

export default {
  extractMessage,
};
