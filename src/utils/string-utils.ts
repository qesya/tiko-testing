export const extractErrorMessage = (data: any) => {
  if (typeof data === 'string') return data;
  if (typeof data === 'object' && data !== null) {
    const errorMessages = Object.values(data).flat();
    return errorMessages.join('\n');
  }
  return 'An unknown error occurred';
}