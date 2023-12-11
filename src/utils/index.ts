/*
 * @Date: 2023-11-14 17:26:06
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-04 10:30:55
 * @FilePath: /chrome-extension/src/utils/index.ts
 */
import { STORAGE_PREFIX } from './constants';

export const getStorageKey = (key: string): string => `${STORAGE_PREFIX}${key}`;
