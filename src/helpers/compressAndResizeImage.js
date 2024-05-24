// Compress and resize image
export const compressAndResizeImage = (file, targetWidth, quality) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const aspectRatio = img.width / img.height;
        const targetHeight = targetWidth / aspectRatio;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const compressedDataURL = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataURL);
      };
    };
  });
};
