export const showNotification = (message, type = 'info') => {
  // In a real app, this would dispatch to a notification context
  console.log(`[${type.toUpperCase()}] ${message}`);
};

export const showError = (message) => {
  showNotification(message, 'error');
};

export const showSuccess = (message) => {
  showNotification(message, 'success');
};