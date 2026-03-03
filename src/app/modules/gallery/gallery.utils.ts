const supportedMimeTypes = ['image/png', 'image/jpeg']; // Removed 'image/jpg'

export const imageValidator = (size: number, mime: string): string | null => {
  if (bytesToMB(size) > 500) {
    return 'Image size should be less than 2MB';
  }

  if (!supportedMimeTypes.includes(mime)) {
    return 'Image type not supported! Please upload a png or jpeg image';
  }

  return null;
};

export const bytesToMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};
