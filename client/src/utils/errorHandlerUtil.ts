import {AxiosError} from 'axios';

const DEFAULT_MESSAGE = 'Something went wrong';

const extractMessage = (error: any): string => {
  const message =
    error instanceof AxiosError ? error.response?.data.message : error.message;
  return message ?? DEFAULT_MESSAGE;
};

export default {
  extractMessage,
};
