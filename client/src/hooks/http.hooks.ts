import { useState } from 'react';

export const useHttp = (): {
  loading: boolean;
  error: boolean | string;
  request: Function;
  clearError: Function;
} => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const request = async <T>(
    url: RequestInfo,
    options: RequestInit
  ): Promise<T> => {
    try {
      setLoading(true);
      if (options.body) {
        options.body = JSON.stringify(options.body);
        options.headers = {
          ...options.headers,
          'Content-Type': 'application/json',
        };
      }
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const clearError = (): void => setError(false);

  return { loading, error, request, clearError };
};
