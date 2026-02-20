/* Utility functions for the frontend */

/** Scrolls the window to the top smoothly */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // Use 'auto' for an instant jump
  });
};

export { scrollToTop };
