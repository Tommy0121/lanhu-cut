/*
 * @Date: 2023-11-14 17:26:06
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-20 20:00:54
 * @FilePath: /chrome-extension/src/utils/index.ts
 */
import { STORAGE_PREFIX } from './constants';

export const getStorageKey = (key: string) => {
  return `${STORAGE_PREFIX}${key}`;
};
