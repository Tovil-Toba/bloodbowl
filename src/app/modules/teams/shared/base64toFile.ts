export function base64toFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const ext = mime.split('/')[1];
  const data = atob(arr[1]);
  let n = data.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = data.charCodeAt(n);
  }

  return new File([u8arr], `${filename}.${ext}`, { type: mime });
}
