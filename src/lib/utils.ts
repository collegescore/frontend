/* Utility functions for the frontend */

/** Scrolls the window to the top smoothly */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // Use 'auto' for an instant jump
  });
};

/** Scrolls the window to a specific element smoothly */
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const stickyOffset = 80;
  const elementTop = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(elementTop - stickyOffset, 0),
    left: 0,
    behavior: "smooth", // Use 'auto' for an instant jump
  });
};

/**
 * Generic function to fetch data from an API and handle success/error outcomes.
 * @param apiCall - The API call function that returns a promise.
 * @param errorMessage - The fallback error message returned if the API call fails.
 * @returns An object containing either the fetched data or an error message.
 */
const loadData = async <T>(
  apiCall: () => Promise<T>,
  errorMessage: string,
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const data = await apiCall();
    return { data, error: null };
  } catch {
    return { data: null, error: errorMessage };
  }
};

export { scrollToTop, scrollToElement, loadData };
