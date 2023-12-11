/*
 * @Date: 2023-11-15 14:21:39
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-05 15:27:56
 * @FilePath: /chrome-extension/src/utils/constants.ts
 */
export const env = process.env.NODE_ENV;

export const isProd = env === 'production';

export const STORAGE_PREFIX = 'CUT_';

export const OPEN_WINDOW_MESSAGE = `${STORAGE_PREFIX}open`;

export const INTERCEPT_FILE = `${STORAGE_PREFIX}intercept_file`;
