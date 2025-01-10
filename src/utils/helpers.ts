import { AxiosError } from 'axios';

/**
 * Utility function to add a delay
 * @param ms - Delay time in milliseconds (default: 500ms)
 * @returns Promise<void>
 */
export const delay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatErrorMessage = (error: AxiosError<Error>) =>
  error?.response?.data?.message ||
  'An error occurred. Please try again later.';
