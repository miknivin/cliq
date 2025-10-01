export const formatDateForInput = (isoString: string): string => {
  if (!isoString || isNaN(new Date(isoString).getTime())) {
    return ''; // Return empty string for invalid or missing dates
  }
  return isoString.split('T')[0]; // Extract YYYY-MM-DD from ISO string
};

// Utility function to convert YYYY-MM-DD to ISO string for Redux state
export const toISOString = (dateString: string): string => {
  if (!dateString) {
    return ''; // Handle empty input
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return ''; // Handle invalid date
    }
    return date.toISOString(); // Convert to ISO string
  } catch {
    return ''; // Fallback for invalid dates
  }
};