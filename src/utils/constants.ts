/*
 * @Date: 2023-11-15 14:21:39
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-11-20 20:00:57
 * @FilePath: /chrome-extension/src/utils/constants.ts
 */
export const env = process.env.NODE_ENV;

export const isProd = env === 'production';

export const STORAGE_PREFIX = 'CUT_';
