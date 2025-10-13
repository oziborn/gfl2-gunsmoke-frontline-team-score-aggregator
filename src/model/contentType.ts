export const isImage = (contentType: string | null): boolean => {
  if (!contentType) {
    return false;
  }
  return ['image/jpeg', 'image/png'].includes(contentType);
};
