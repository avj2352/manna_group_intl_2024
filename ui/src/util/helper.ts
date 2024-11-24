// Modern browsers with requestAnimationFrame for smoother scrolling
export function scrollToOffset(offset: number) {
  if (window.requestAnimationFrame) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop; // Get current scroll position
    const targetPosition = scrollTop + offset; // Calculate target position based on offset
    const start = performance.now();

    function step() {
      const progress = (performance.now() - start) / 500; // Animation duration in milliseconds
      window.scrollBy({ top: targetPosition, behavior: "smooth" });
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);

    // Legacy approach for older browsers
  } else {
    window.scrollBy({ top: 0, behavior: "smooth" });
  }
}

// Copy to clipboard function
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

// Function to represent floating numbers in string format
export function addDecimalIfNotPresent(num: Number) : string {
  if (Number.isInteger(num)) {
    return num + '.0';
  }
  return num.toString();
}
