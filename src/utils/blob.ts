/*
 * @Date: 2024-01-02 15:54:40
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2024-01-02 15:58:17
 * @FilePath: /chrome-extension/src/utils/blob.ts
 */
export const blobUrlToBase64 = async (url: string): Promise<string> => {
  return await new Promise((resolve) => {
    fetch(url)
      .then(async (response) => await response.blob())
      .then((blob) => {
        // Convert Blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.readAsDataURL(blob);
      });
  });
};
