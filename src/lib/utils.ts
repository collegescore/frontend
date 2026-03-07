/* Utility functions for the frontend */

import { error } from "console";

/** Scrolls the window to the top smoothly */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // Use 'auto' for an instant jump
  });
};

/** Generic function to fetch data from an API and handle loading and error states.
 * @param apiCall - The API call function that returns a promise.
 * @param setSetter - The state setter function to update the data.
 * @param setError - The state setter function to update the error message.
 * @param setLoading - The state setter function to update the loading state.
 * @param errorMessage - The error message to set if the API call fails.
 */
const loadData = (
  apiCall: () => Promise<any>,
  setSetter: (data: any) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean) => void,
  errorMessage: string,
) => {
  return async () => {
    setLoading(true);
    try {
      const data = await apiCall();
      setSetter(data);
    } catch (error) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
};

export { scrollToTop, loadData };
